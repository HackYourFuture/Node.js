const fs = require('fs');
const colors = require('colors');
function removeList(index) {
  try {
    if (index <= 0 || index > toDosArray.length) {
      console.log(`You've got ${toDosArray.length} list/s`);
    }
    const toDosArray = JSON.parse(fs.readFileSync('toDoList.json'));
    const item = toDosArray[index - 1];
    const lists = toDosArray.filter(list => list !== item);
    fs.writeFileSync('./toDoList.json', JSON.stringify(lists));
  } catch (error) {
    console.log(colors.yellow(`${error}`));
  }
}

module.exports = {
  removeList: removeList,
};
