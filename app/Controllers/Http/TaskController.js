'use strict'

const Task = use('App/Models/Task')

class TaskController {
    async getAll({response}) {
        let tasks = await Task.all()

        return response.json(tasks)
    }

    async create ({request, response}) {
        const task_info = request.only(['title','description','is_done'])

        const task = new Task()
        task.title = task_info.title
        task.description = task_info.description
        task.is_done = task_info.is_done

        await task.save()

        return response.status(201).json(task)
    }
            
    async update({params, request, response}) {
        const task_info = request.only(['title','description','is_done'])

        const task = await Task.find(params.id)
        if(!task){
            return response.code(404).json({data: 'Data not found'})
        }

        task.title = task_info.title
        task.description = task_info.description
        task.is_done = task_info.is_done

        await task.save() 

        return response.status(200).json(task)
    }

    async delete({params, response}){
        const task = await Task.find(params.id)
        if(!task){
            return response.code(404).json({data: 'Data not found'})
        }

        await task.delete()

        return response.status(204).json({data: 'Task deleted successfully'})
    }
}

module.exports = TaskController
