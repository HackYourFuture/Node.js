const fs = require('fs');
const desc = 'LIST: shows the toDoList';
const toDos = fs.readFileSync('toDoList.txt', 'utf8');
function list() {
  console.log(toDos);
}
module.exports = { list, desc };
