const fs = require('fs');
const desc = 'UPDATE: updates the list item with 1-based index (update 3 new-item)';
const toDos = fs.readFileSync('toDoList.txt', 'utf8');
function update(index, newToDo) {
  if (Number.isInteger(Number(index)) && index > 0) {
    const toDosArr = toDos.split('\n');
    if (index > toDosArr.length) {
      console.log(`your list is shorter than ${index} items`);
    } else {
      const oldToDo = toDosArr[index - 1];
      toDosArr[index - 1] = newToDo;
      const toDosJoined = toDosArr.join('\n');
      fs.writeFile('toDoList.txt', toDosJoined + '\n', err => {
        if (err) {
          console.log(err);
        } else {
          console.log(`${index}. item ( ${oldToDo} ) updated to "${newToDo}"`);
        }
      });
    }
  } else {
    console.log('WARN: first parameter of update command must be an integer and greater than 0!');
  }
}
module.exports = { update, desc };
