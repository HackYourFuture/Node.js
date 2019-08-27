const fs = require('fs');
function resetList() {
  try {
    fs.writeFileSync('./toDoList.json', JSON.stringify([]));
  } catch (error) {
    console.log(colors.yellow(`${error}`));
  }
}

module.exports = {
  resetList: resetList,
};
