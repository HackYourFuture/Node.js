const fs = require('fs');

function markAsNotDone(id) {
  fs.readFile('./todos.json', 'utf8', (error, data) => {
    if (error) throw error;
    const todos = JSON.parse(data);
    const markedTodo = todos.find(todo => todo.id === id);
    markedTodo.done = false;
    const dataStringified = JSON.stringify(todos);

    fs.writeFile('./todos.json', dataStringified, error => {
      if (error) throw error;
    });
  });
}

module.exports = markAsNotDone;
