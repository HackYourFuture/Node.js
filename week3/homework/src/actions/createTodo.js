const uuid = require('uuid/v4');
const { readTodos, saveTodos } = require('./index');

function createTodo(req, res) {
  return new Promise((resolve, reject) => {
    const { todo } = req.body;
    if (todo === null) {
      reject(new Error('No todo set!'));
    }
    else {
      if (todo.description !== null) {
        todo.id = uuid();
        todo.done = 'false';
        todo.description = todo.description.trim();
        readTodos()
          .then(todos => {
            todos.push(todo);
            return todos;
          })
          .then(todos => {
            saveTodos(todos);
            resolve();
          })
          .catch(error => reject(error));
      }
      else {
        reject(new Error('No description set!'));
      }
    }
  });
}

module.exports = createTodo;
