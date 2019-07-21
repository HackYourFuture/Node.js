const fs = require('fs');
function read(id) {
  const data = fs.readFileSync('todos.json', 'utf8');
  const parsedData = JSON.parse(data);
  if (parsedData[0]) {
    if (parsedData.length < id) {
      return new Error('no such id');
    }
    if (id) {
      const todo = `{${parsedData[id - 1].text}}`;
      return todo;
    }
    const todos = parsedData.map(todo => todo.text);
    return todos;
  } else {
    return new Error('list is empty');
  }
}

module.exports = { read };
