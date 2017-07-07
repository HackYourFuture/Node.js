const Todo = require('../models/todo')

module.exports = function create(request, response) {

  Todo.reset(error => {
    
      response.status(204)
      response.end()
    
  })

}