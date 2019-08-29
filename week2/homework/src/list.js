const list = require('./todo-list.json');
const fs = require('fs');
module.exports = () => {
  if (list.ToDos == 0) {
    console.log(`No ToDos on the list `);
    return;
  }
  console.log(`current ToDos on the list: \n`)
  list.ToDos.forEach(element => {
    console.log(`${element.id}. ${element.todo}`);
  });
}