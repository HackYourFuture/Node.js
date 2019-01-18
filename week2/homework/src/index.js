'use strict';

const fs = require('fs');
// add command
let add = () => {
  let todo = fs.readFileSync('todos.txt', 'utf8');
  let text = process.argv[3];
  fs.appendFileSync('todos.txt', `${text}\n`);
  return text;
};
// list command
let list = () => {
  let todosList = fs.readFileSync('todos.txt', 'utf8');
  if (!todosList) {
    console.log('The TODOs list file is empty');
  } else {
    console.log(todosList);
  }
};
// remove command
let remove = () => {
  let todosList = fs.readFileSync('todos.txt', 'utf8');
  let todosArray = todosList.split('\n');
  let commandArg = parseInt(process.argv[3]);

  if (!todosList) {
    console.log('The TODO list file is empty');
  } else if (commandArg > todosArray.length) {
    console.log(`the requested line number ${commandArg} is empty`);
  } else {
    todosArray.forEach((element, index) => {
      if (commandArg === index) {
        let removedItem = todosArray.splice(index - 1, 1);
        const restItems = todosArray.join('\n');
        fs.writeFileSync('todos.txt', restItems);
        console.log('the ff item is removed from the list:');
        console.log('-- ' + removedItem);
      }
    });
  }
};

// reset command
let reset = () => {
  fs.writeFileSync('todos.txt', '');
};

// help command
let help = () => {
  console.log(fs.readFileSync('help.txt', 'utf8'));
};

let command = process.argv[2];

switch (command) {
  case 'help':
    help();
    break;
  case 'add':
    add();
    break;
  case 'list':
    list();
    break;
  case 'reset':
    reset();
    break;
  case 'remove':
    remove();
    break;
  default:
    help();
    break;
}
