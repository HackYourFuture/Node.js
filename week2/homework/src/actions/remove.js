'use strict';

const fs = require('fs');

let remove = () => {
  let todosList = fs.readFileSync('todos.txt', 'utf8');
  let todosArray = todosList.split('\}');
  let commandArg = parseInt(process.argv[3]);

  if (!todosList) {
    console.log('The TODO list file is empty');
  } else if (commandArg > todosArray.length) {
    console.log(`the requested line number ${commandArg} is empty`);
  } else {
    todosArray.forEach((_elm, index) => {
      if (commandArg === index) {
        let removedItem = todosArray.splice(index - 1, 1).join('\n');
        const restItems = todosArray.join('\n');
        fs.writeFileSync('todos.txt', restItems);
        console.log(`the removed todo item is : \n - ${removedItem}`);
      }
    });
  }
};

module.exports = remove;