module.exports = function deserializeTodo(request, response) {

  const todo = request.body.todo
  if (todo == null) {
    setError('Specify a todo', response)
    return null
  }

  if (todo.description != null) {
    todo.description = todo.description.trim()
  }
  if (todo.description == null || todo.description.length === 0) {
    setError('Specify a description', response)
    return null
  }

  return todo

}

function setError(error, response) {
  response.status(400)
  response.json({error})
  response.end()
}