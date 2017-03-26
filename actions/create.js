const Todo = require('../models/todo')
const deserializeTodo = require('../util/deserializeTodo')

module.exports = function create(request, response) {

  const todo = deserializeTodo(request, response)
  if (todo == null) { return }

  Todo.create(todo.description, (error, todo) => {
    if (error) {
      console.error(error)
      response.status(500)
      response.json({error: 'Internal error'})
    } else {
      response.status(201)
      response.json({todo})
    }
  })

}