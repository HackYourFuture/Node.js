const fs = require('fs');
function read(id) {
  const data = fs.readFileSync('todos.json', 'utf8');
  const parsedData = JSON.parse(data);
  const todo = `{${parsedData[id - 1].text}}`;
  return todo;
}

module.exports = { read };
