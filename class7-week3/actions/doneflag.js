const Todo = require('../models/todo')

module.exports = function doneflag(request, response) {
  const id = request.params.id
  Todo.doneflag(id, request.method, error => {
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
