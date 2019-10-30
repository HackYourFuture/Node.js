


function validTodo(request) {
    const { todo } = request.body;
    if (todo == null) {
        throw new Error('There is no todo yet.');
    }
    if (description != null) {
        todo.description = todo.description.trim();
    }
    if (todo.description == null || todo.description.length === 0) {
        throw  new Error('There is no Description.')
    }
    return todo;
}

module.exports = validTodo;