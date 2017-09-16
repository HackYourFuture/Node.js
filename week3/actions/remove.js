const Todo = require('../models/todo')

module.exports = function create(request, response) {

  const id = request.params.id

  Todo.remove(id, error => {
    if (error) {
      console.error(error)
      response.status(500)
      response.json({error: 'Internal error'})
    } else {
      response.status(204)
      response.end()
    }
  })

}