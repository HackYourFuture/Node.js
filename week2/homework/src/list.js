const fs = require('fs');
const desc = 'LIST: shows the toDoList';
function list() {
  const toDos = fs.readFileSync('toDoList.txt', 'utf8');
  if (toDos === '') {
    console.log('your list is empty.!');
  } else {
    console.log(toDos);
  }
}
module.exports = { list, desc };
