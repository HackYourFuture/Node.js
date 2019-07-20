const fs = require('fs');

function list() {
  fs.readFile('./todos.json', 'utf8', (error, data) => {
    if (error) throw error;
    const todos = JSON.parse(data);
    return todos;
  });
}

module.exports = list;
