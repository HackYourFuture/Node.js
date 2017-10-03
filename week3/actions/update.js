const Todo = require('../models/todo')
const deserializeTodo = require('../util/deserializeTodo')

module.exports = function update(request, response) {

  const id = request.params.id
  const todo = deserializeTodo(request, response)
  if (todo == null) { return }

  Todo.update(id, todo.description, (error, todo) => {
    if (error == null) {
      response.json({todo})
    } else if (error.name === 'NotFound') {
      response.status(404)
      response.json({error: error.message})
    } else {
      console.error(error)
      response.status(500)
      response.json({error: 'Internal error'})
    }
  })

}