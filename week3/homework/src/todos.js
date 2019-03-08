const Todo = require('../../lecture/src/todo');

Todo.prototype.markAs = async function(id, done, method) {
  const todos = await this.read();
  const todo = todos.find(todo => todo.id === id);

  if (todo == null) {
    const error = new Error(`To-do with ID ${id} does not exist`);
    error.code = 404;
    throw error;
  }

  if ((method === 'POST' && done === 'false') || (method === 'DELETE' && done === 'true')) {
    const error = new Error(`Conflict with ${method} method and done parameter ${done}`);
    error.code = 409;
    throw error;
  }

  todo.done = done;

  await this._save(todos);
  return todo;
};

Todo.prototype.clearAll = async function() {
  return this._save([]);
};

module.exports = Todo;
