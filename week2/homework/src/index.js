'use strict';
const fs = require('fs');
const args = process.argv.slice(2); // start from the value of the argument
const command = args[0]; // help, add, reset, update,...
const todoItem = args[1];
const description = args[2];
const path = './todoList.json';

switch (command) {
  case 'help':
    help();
    break;
  case 'list':
    list();
    break;
  case 'add':
    add();
    break;
  case 'reset':
    reset();
    break;
  case 'remove':
    remove();
    break;
  case 'update':
    update();
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
  fs.readFile(path, 'utf8', (error, todos) => {
    if (error) {
      if (error.code === 'ENOENT') {
        console.log('file not found!');
      }
      else {
        console.error(error);
      }
    }
    else {
      console.log(JSON.parse(todos));
    }
  });
}

function add() {
  fs.readFile(path, 'utf8', (error, todos) => {
    if (error) {
      if (error.code === 'ENOENT') {
        console.log('file not found');
      }
      else {
        console.error(error);
      }
    }
    else {
      const todoList = JSON.parse(todos);
      if (!todoItem) {
        console.log('please write the item you want to add');
      }
      else {
        todoList.push(todoItem);
        const newList = JSON.stringify(todoList);
        fs.writeFile(path, newList, 'utf8', () => {
          console.log(todoList);
          console.log('todo added!');
        });
      }
    }
  });
}

function remove() {
  fs.readFile(path, 'utf8', (error, todos) => {
    if (error) {
      console.error(error);
    }
    else {
      let todoList = JSON.parse(todos);
      // .filter((todo, index) => index !== todoItem - 1)
      // .join('\n');
      todoList.splice(todoItem - 1, 1);
      console.log(todoList);
      const newList = JSON.stringify(todoList);

      fs.writeFile(path, newList, 'utf8', () => {
        console.log('ok!');
      });
    }
  });
}

function reset() {
  fs.writeFile(path, [], error => {
    if (error) {
      console.error(error);
    }
    else {
      console.log('Reset is done!');
    }
  });
}

function update() {
  fs.readFile(path, 'utf8', (error, todos) => {
    if (error) {
      console.error(error);
    }
    else {
      let todoList = JSON.parse(todos);
      todoList.splice(todoItem - 1, 1, description);
      const newList = JSON.stringify(todoList);
      fs.writeFile(path, newList, 'utf8', () => {
        console.log('update is done!');
      });
    }
  });
}
