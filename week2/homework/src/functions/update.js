const fs = require('fs');
const writeData = require('./write');


const update = function () {
  let updated = []
  const toDoItem = parseInt(process.argv[3] - 1);
  let toDoList = fs.readFileSync("./toDoList.json", "utf-8");
  toDoList = JSON.parse(toDoList);
  if (toDoItem <= toDoList.length) {
    let removed = []
    removed = toDoList.splice((toDoItem, 1), 'updated');
    writeData(toDoList);
  } else { console.log('Requested task does not exist') }


}

module.exports = update;
