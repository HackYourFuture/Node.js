const fs = require('fs');

function markAsDone(id) {
  fs.readFile('./todos.json', 'utf8', (error, data) => {
    if (error) throw error;
    const todos = JSON.parse(data);
    const markedTodo = todos.find(todo => todo.id === id);
    markedTodo.done = true;
    const dataStringified = JSON.stringify(todos);

    fs.writeFile('./todos.json', dataStringified, error => {
      if (error) throw error;
    });
  });
}

module.exports = markAsDone;
