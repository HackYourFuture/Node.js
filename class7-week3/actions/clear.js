const Todo = require('../models/todo')

module.exports = function clear(request, response) {
	
	Todo.clear((err) => {
		if (err) {
      console.error(err)
      response.status(500)
      response.json({error: 'Internal error'})
	}
		response.status(205)
		response.json({ok: 'There is no tasks now'})
		response.end()
		})
	}