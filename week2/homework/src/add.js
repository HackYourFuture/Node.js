/* eslint-disable indent */
const fs = require('fs');

function add(toDoList) {
  if (toDoList === undefined) {
    console.log('please enter a valid value after the command add');
  }
 else {
    fs.appendFile('./todoList.txt', toDoList + '\n', error => {
      if (error) {
        console.log('there was an error');
      }
 else {
        return console.log('item was added successfully');
      }
    });
  }
}

module.exports = add;
