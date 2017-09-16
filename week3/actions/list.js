const Todo = require('../models/todo')

module.exports = {
  marksAsDone: function list(request, response) {

    // Load todos asynchronously (with a callback)
    Todo.load((error, todos) => {
      if (error) {
        response.status(500)
        response.json({ error: 'Internal error' })
      } else {
        response.json({ todos })
        response.end()
      }
    })

  },
  markAsNotDone: function list(request, response) {

    // Load todos asynchronously (with a callback)
    Todo.load((error, todos) => {
      if (error) {
        response.status(500)
        response.json({ error: 'Internal error' })
      } else {
        response.json({ todos })
        response.end()
      }
    })

  }
}