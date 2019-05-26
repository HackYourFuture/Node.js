'use strict';
let fs = require('fs');

let args = process.argv.slice(2);
let command = args[0]; // add ,help, reset, remove, ...
let todoItem = args[1]; // number or string
let description = args[2]; // string
let path = './todoList.txt';

switch (command) {
  case 'help':
    help();
    break;
  case 'list':
    list(todoItem);
    break;
  case 'add':
    add(todoItem);
    break;
  case 'remove':
    remove(todoItem);
    break;
  case 'reset':
    reset();
    break;
  case 'update':
    update(todoItem, description);
    break;
  default:
    help();
}

function help() {
  console.log(`To manage your data you can
    1- Type [add + 'data'] to add new todo
    2- Type [list] to see all todo
    3- Type [remove + number of the line] to remove the todo
    4 - Type[reset] to clear all your todo
    `);
}

function list() {
  fs.readFile(path, 'utf8', (error, todoList) => {
    if (error) {
      if (error.code === 'ENOENT') {
        console.log('no data found');
      }
      else {
        console.error(error);
      }
    }
    else {
      console.log(todoList);
    }
  });
}

function add(todoItem) {
  fs.appendFile(path, todoItem + '\n', error => {
    if (!todoItem) {
      console.log('please write the item you want to add');
    }
    else {
      console.error(error);
    }
  });
}

function remove() {
  fs.readFile(path, 'utf8', (error, todoList) => {
    if (error) {
      console.error(error);
    }
    else {
      let splitList = todoList.split('\n');
      // .filter((todo, index) => index !== todoItem - 1)
      // .join('\n');
      console.log(splitList);
      splitList.splice(todoItem - 1, 1);
      const newList = splitList.join('\n');

      fs.writeFile(path, newList, 'utf8', () => {
        console.log('ok!');
      });
    }
  });
}

function reset() {
  fs.writeFile(path, '', error => {
    if (error) {
      console.error(error);
    }
    else {
      console.log('Reset is done!');
    }
  });
}
// It needs works, I'm still trying to find the problem.
function update() {
  fs.readFile(path, 'utf8', (error, todoList) => {
    if (error) {
      console.error(error);
    }
    else {
      // eslint-disable-next-line no-undef
      let splitList = todoList.split('\n');
      splitList.splice(3 - 1, 1, 'Brush teeth');
      const newList = splitList.join('\n');
      fs.writeFile(path, newList, 'utf8', () => {
        console.log('update is done!');
      });
    }
  });
}
