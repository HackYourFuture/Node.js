const fs = require('fs');

function update(id, text) {
  fs.readFile('./todos.json', 'utf8', (error, data) => {
    if (error) throw error;
    const todos = JSON.parse(data);
    const updatedTodo = todos.find(item => item.id === id);
    updatedTodo.text = text;
    const dataStringified = JSON.stringify(todos);

    fs.writeFile('./todos.json', dataStringified, error => {
      if (error) throw error;
    });
  });
}

module.exports = update;
