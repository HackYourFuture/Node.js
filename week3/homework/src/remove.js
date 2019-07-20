const fs = require('fs');

function remove(id) {
  fs.readFile('./todos.json', 'utf8', (error, data) => {
    if (error) throw error;
    const todos = JSON.parse(data);
    const newData = todos.filter(todo => todo.id !== id);
    const dataStringified = JSON.stringify(newData);

    fs.writeFile('./todos.json', dataStringified, error => {
      if (error) throw error;
    });
  });
}

module.exports = remove;
