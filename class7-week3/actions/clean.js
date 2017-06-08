const Todo = require('../models/todo')

module.exports = function clean(request, response) {

  //const id = request.params.id

  Todo.clean( error => {
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
