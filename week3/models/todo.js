const FS = require('fs')
const Path = require('path')
const uuid = require('uuid/v4')

const filename = Path.resolve(__dirname, '../data/todos.json')

class Todo {

  load(callback) {
    FS.readFile(filename, 'utf-8', (error, data) => {
      if (error) {
        callback(error)
      } else {
        callback(null, JSON.parse(data))
      }
    })
  }

  save(todos, callback) {
    FS.writeFile(filename, JSON.stringify(todos), callback)
  }

  create(description, callback) {
    this.load((error, todos) => {
      if (error) { callback(error); return }

      const todo = {
        id: uuid(),
        description,
        done: false
      }
      todos.push(todo)

      this.save(todos, error => {
        if (error) { callback(error); return }

        callback(null, todo)
      })
    })
  }

  update(id, description, state, callback) {
    this.load((error, todos) => {
      if (error) { callback(error); return }

      const todo = todos.find(t => t.id === id)
      if (todo == null) {
        const error = new Error(`Todo with ID ${id} does not exist`)
        error.name = 'NotFound'

        callback(error)
        return
      }

      if (description) {todo.description = description}      

      //add functionality to update the "state" of "todo" item
      if (state !== null) { todo.done = state }
      ////////////////////////////////////////////////
      
      this.save(todos, error => {
        if (error) { callback(error); return }

        callback(null, todo)
      })
    })
  }

  remove(id, callback) {
    this.load((error, todos) => {
      if (error) { callback(error); return }
      
      //add check to CLEAR todo list if "id" present
      if (id){
        todos = todos.filter(t => t.id !== id)
      } else {
        todos.splice(0, todos.length)
      }
      ////////////////////////////////////////////////
      this.save(todos, error => {
        if (error) { callback(error); return }
        callback()
      })
    })
  }
}

module.exports = new Todo()