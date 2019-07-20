const fs = require('fs');

function add(id, text) {
  fs.readFile('./todos.json', (error, data) => {
    if (error) throw error;
    const todos = JSON.parse(data);
    const addedTodo = { id: id, done: false, text: text };
    todos.push(addedTodo);
    const dataStringified = JSON.stringify(todos);
    fs.writeFile('./todos.json', dataStringified, error => {
      if (error) throw error;
    });
  });
}

module.exports = add;
