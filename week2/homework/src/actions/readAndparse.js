const fs = require('fs');

const readAndParseTodos = () => {
  const todosList = fs.readFileSync('todos.json', 'utf8');
  return JSON.parse(todosList);
}
module.exports = readAndParseTodos