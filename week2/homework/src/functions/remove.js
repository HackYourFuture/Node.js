const fs = require('fs');
const writeData = require('./write');


const remove = function () {
  let removed = []
  const toDoItem = parseInt(process.argv[3]);
  let toDoList = fs.readFileSync("./toDoList.json", "utf-8");
  toDoList = JSON.parse(toDoList);
  if (toDoItem === 1 || toDoItem === toDoList.length) {
    let removed = []
    removed = toDoList.splice((toDoItem - 1), 1);
    writeData(toDoList);
  } else { console.log('Requested task does not exist') }


}

module.exports = remove;


