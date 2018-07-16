'use strict';

// TODO: Write the homework code in this file

const { readFile, writeFile } = require('fs');
const { promisify } = require('util');
const readFileWithPromise = promisify(readFile);
const writeFileWithPromise = promisify(writeFile);

const args = process.argv.slice(2);

const cmd = args[0];

const TODO_PATH = 'todo.json';

function readTodos() {
  return readFileWithPromise(TODO_PATH, 'utf8')
    .then(JSON.parse)
    .catch(() => ([]));
}

function writeTodos(todos) {
  return writeFileWithPromise(TODO_PATH, JSON.stringify(todos, null, 2));
}

function myHelper() {
  console.log('Get help from these commands :\n 1- node . add = "Add a todo". \n 2- node . remove [type index to be removed]  = remove item from the list. \n 3- node . update = [type index to be updated]"type new todo here".\n 4- node . list  = List all items. \n 5- node . reset  = Reset the list.');
}

switch (cmd) {
  case 'add':
    const text = args[1];
    readTodos()
      .then(todos => {
        todos.push({ todo: text });
        return todos;
      })
      .then(writeTodos)
      .then(readTodos)
      .then(console.log);
    break;

  case 'remove':
    let item = args[1];
    readTodos()
      .then(todos => {
        if (item > 0) {
          todos.splice(item, 1);
        }
        else {
          console.log('Wrong input please try again');
        }
        return todos;
      }).then(writeTodos);
    break;

  case 'update':
    let updateItem = args[1];
    let newItem = args[2];
    readTodos()
      .then(todos => {
        if (updateItem >= 0 && typeof newItem === 'string') {
          todos.splice(updateItem, 1);
          todos[updateItem] = { todo: newItem };
        }
        else {
          console.log('Wrong input, please try again');
        }
        return todos;
      }).then(writeTodos);
    break;

  case 'list':
    readTodos().then(console.log);
    break;

  case 'reset':
    readTodos()
      .then(todos => {
        todos.splice([]);
        return todos;
      }).then(writeTodos);
    break;

  default:
    myHelper();
    break;
}
