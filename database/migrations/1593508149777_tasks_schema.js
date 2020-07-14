'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TasksSchema extends Schema {
  up () {
    this.create('tasks', (table) => {
      table.increments()
      table.string('title', 40).notNullable()
      table.string('description',200).notNullable()
      table.bool('is_done').defaultTo(false)
      table.timestamps()
      table.integer('userId',10).notNullable()
    })
  }

  down () {
    this.drop('tasks')
  }
}

module.exports = TasksSchema
