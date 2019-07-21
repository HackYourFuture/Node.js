const fs = require('fs');
const desc = 'adds the text you type after command word to toDoList';
function add(todoText) {
  const data = fs.readFileSync('todos.json', 'utf8');
  const parsedData = JSON.parse(data);
  parsedData.push({ text: todoText });
  fs.writeFileSync('todos.json', JSON.stringify(parsedData));
  return todoText;
}
module.exports = { add, desc };
