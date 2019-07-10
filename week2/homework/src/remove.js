const fs = require('fs');
const desc = 'REMOVE: removes list item with 1-based index';
const toDos = fs.readFileSync('toDoList.txt', 'utf8');
function remove(index) {
  if (Number.isInteger(Number(index)) && index > 0) {
    const toDosArr = toDos.split('\n');
    const spliced = toDosArr.splice(index - 1, 1);
    const toDosJoined = toDosArr.join('\n');
    fs.writeFile('toDoList.txt', toDosJoined, err => {
      if (err) {
        console.log(err);
      } else {
        console.log(`${index}. item ( ${spliced} ) removed from toDoList`);
      }
    });
  } else {
    console.log('WARN: the parameter of remove command must be an integer and greater than 0!');
  }
}
module.exports = { remove, desc };
