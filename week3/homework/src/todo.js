'use strict'

const fs = require('fs')
const uuid = require('uuid/v4')

const DEFAULT_ENCODING = 'utf-8'

class Todo{
  constructor(fileName){
    this.fileName = fileName
  }

  async create(description){
    const todos = await this.read()

    const todo = {
      id: uuid(),
      done: false,
      description
    }

    todos.push(todo)

    await this._save(todos)
    return todo
  }

  read(){
    return new Promise(resolve =>{
      fs.readFile(this.fileName, DEFAULT_ENCODING, (error, data) =>{
        if(error)
          return resolve([])
        
        return resolve(JSON.parse(data))
      })
    })
  }

  async update(id, description){
    const todos = await this.read()

    const todo = todos.find(todo => todo.id === id)
    if(todo === null){
      const error = new Error(`To-do with ID ${id} does not exist`);
      error.code = 'not-found';
      throw error;
    }

    todo.description = description

    await this._save(todos)

    return todo
  }

  async done(id){
    const todos = await this.read()

    const todo = todos.find(todo => todo.id === id)

    if(todo === null){
      const error = new Error(`To-do with ID ${id} does not exist`);
      error.code = 'not-found';
      throw error;
    }

    todo.done = true

    await this._save(todos)
    return todo
  }

  async delete(id){
    const todos = await this.read()
    const filteredTodos = todos.filter(t => t.id !== id)
    return this._save(filteredTodos)
  }

  _save(todos){
    return new Promise((resolve, reject) => {
      fs.writeFile(
        this.fileName, 
        JSON.stringify(todos, null, 2), 
        error => error == null ? resolve : reject (error))
    })
  }

}

module.exports = Todo