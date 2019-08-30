const fs = require('fs');
const colors = require('colors');
function removeToDo(index) {
  try {
    const toDosArray = JSON.parse(fs.readFileSync('toDoList.json'));
    if (index <= 0 || index > toDosArray.length) {
      console.log(`You've got ${toDosArray.length} task/s in the list!`);
      return;
    }
    const item = toDosArray[index - 1];
    const lists = toDosArray.filter(list => list !== item);
    fs.writeFileSync('./toDoList.json', JSON.stringify(lists));
  }
 catch (error) {
    console.log(colors.yellow(`${error}`));
  }
}

module.exports = {
  removeToDo
};
