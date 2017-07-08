const Todo = require('../models/todo')
const deserializeTodo = require('../util/deserializeTodo')

module.exports = function markAsDone(request, response) {
	const id = request.params.id

	Todo.markAsDone(id, (error, todo) => {
	if (error) {
		console.error(error)
		response.status(500)
		response.json({
		error: 'Internal error'
		})
	} else {
		response.status(201)
		response.json({todo})
	}
	})

}
