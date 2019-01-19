'use strict';

const fs = require('fs');
let listOfTodos = fs.readFileSync('todos.json', 'utf8');
let listItem = JSON.parse(listOfTodos);

let list = () => {
  for (let i = 0; i < listItem.length; i++) {
    console.log(i + 1 + '- ' + listItem[i].text);
  }
};

let add = () => {
  listItem.push({ text: process.argv[3] });
  let newListItem = JSON.stringify(listItem);
  fs.writeFileSync('todos.json', newListItem, 'utf8');
  list();
};

let remove = () => {
  listItem.index = process.argv[3];
  console.log(listItem.index + ' was removed. \n');
  listItem.splice(process.argv[3] - 1, 1);
  let newArray = JSON.stringify(listItem);
  fs.writeFileSync('todos.json', newArray, 'utf8');
  list();
};

let reset = () => {
  let resetList = fs.writeFileSync('todos.json', '');
  return resetList;
};

let command = process.argv[2];
if (command === 'help') {
  console.log('\n Help: \n' + '\n You can use 4 commands:\n');
  console.log('list: To show current to-dos. \n');
  console.log('add: Adds a to-do item. \n');
  console.log('remove: Removes a to-do item. \n');
  console.log('reset: Removes all to-do items from the list. \n');
} else if (command === 'list') {
  list();
} else if (command === 'add') {
  add();
} else if (command === 'remove') {
  remove();
} else if (command === 'reset') {
  reset();
} else {
  console.log('NOTHING FOUND!');
}
