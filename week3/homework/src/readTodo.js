const fs = require('fs');

function readTodo(id) {
  fs.readFile('./todos.json', 'utf8', (error, data) => {
    if (error) throw error;
    const todos = JSON.parse(data);
    const todo = todos.find(todo => todo.id === id);
    return todo;
  });
}

module.exports = readTodo;
