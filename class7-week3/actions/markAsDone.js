const Todo = require('../models/todo')
const deserializeTodo = require('../util/deserializeTodo')

module.exports = function update(request, response) {
    
  const id = request.params.id
  console.log(request.params)
  const todo = deserializeTodo(request, response)
  if (todo == null) { return }

  Todo.markAsDone(id, todo.done, (error, todo) => {
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