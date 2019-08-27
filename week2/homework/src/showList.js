const fs = require('fs');
const colors = require('colors');
function showToDosList() {
  try {
    const toDosArray = JSON.parse(fs.readFileSync('toDoList.json'));
    const toDosList = toDosArray.map((item, index, arr) => `${index + 1}- ${item.list}`).join('\n');
    console.log(colors.green(toDosList));
  } catch (error) {
    console.log(colors.yellow(`${error}`));
  }
}

module.exports = {
  showToDosList: showToDosList,
};
