'use strict'

const Task = use('App/Models/Task')

class TaskController {
    async getAll({params, response}) {
        let tasks = await Task.all()

        return response.json(tasks)
    }

    async create ({request, response}) {
        const task_info = request.only(['title','description','is_done','userId'])

        const task = new Task()
        task.title = task_info.title
        task.description = task_info.description
        task.is_done = task_info.is_done
        task.userId = task_info.userId

        await task.save()

        task.success = true
        return response.status(201).json(task)
    }
            
    async update({params, request, response}) {
        const task_info = request.only(['title','description','is_done'])

        const task = await Task.find(params.id)
        if(!task){
            return response.status(404).json({data: 'Data not found'})
        }

        task.title = task_info.title
        task.description = task_info.description
        task.is_done = task_info.is_done

        await task.save() 
        task.success = true

        return response.status(200).json(task)
    }

    async delete({params, response}){
        const task = await Task.find(params.id)
        if(!task){
            return response.status(404).json({data: 'Data not found'})
        }

        await task.delete()

        return response.status(200).json({data: 'Task deleted successfully', success: true})
    }

    async get({params, response}){
        const task = await Task.find(params.id)
        if(!task){
            return response.status(404).json({data: 'Data not found'})
        }
        task.success = true 
        return response.status(200).json(task)
    }
}

module.exports = TaskController
