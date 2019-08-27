const fs = require('fs');
let toDoList = [];
function generateToDosList(toDo) {
  try {
    toDoList = JSON.parse(fs.readFileSync('toDoList.json'));
  } catch (error) {
    console.log(`${error}`);
  }
  const index = toDoList.findIndex(item => item.list === toDo);
  if (index === -1) {
    const lists = { list: `${toDo}` };
    toDoList.push(lists);
    fs.writeFileSync('./toDoList.json', JSON.stringify(toDoList));
  }
}

module.exports = {
  generateToDosList: generateToDosList,
};
