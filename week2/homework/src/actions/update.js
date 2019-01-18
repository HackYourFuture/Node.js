'use strict';

const fs = require('fs');

let update = () => {
  let todosList = fs.readFileSync('todos.txt', 'utf8');
  let todosArray = todosList.split('\n');
  let lineNumber = parseInt(process.argv[3]);
  const todo = process.argv[4]
  let updatedToDo = {
    todo
  };

  if (!todosList) {
    console.log('The TODO list file is empty');
  } else if (lineNumber > todosArray.length) {
    console.log(`the requested line number ${lineNumber} is empty`);
  } else {
    todosArray.forEach((_elm, index) => {
      if (lineNumber === index) {
        todosArray.splice(index - 1, 1, JSON.stringify(updatedToDo)).join('\n');
        const restItems = todosArray.join('\n');
        fs.writeFileSync('todos.txt', restItems);
        console.log(`the updated todo list is :\n ${restItems}`);
      }
    });
  }
};

module.exports = update;