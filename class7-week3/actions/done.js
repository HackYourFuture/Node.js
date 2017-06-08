const Todo = require('../models/todo')

module.exports = function done(request, response) {

  const id = request.params.id

  Todo.done(id, error => {
    if (error) {
      console.error(error)
      response.status(404)
      response.json({error: `Id's not found` })
    } else {
      response.status(202)
      response.json({ok: 'The task marked as done'})
      response.end()
    }
  })

}