'use strict';
let fs = require('fs');

let args = process.argv.slice(2);
// console.log(args);
let command = args[0];
let todoItem = args[1];

if (command === 'add') {
  add(todoItem);
}
else if (command === 'list') {
  list(todoItem);
}
else if (command === 'remove') {
  remove(todoItem);
}

function list() {
  fs.readFile('./todoList.txt', 'utf8', (error, todoList) => {
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
  fs.appendFile('./todoList.txt', todoItem + '\n', error => {
    console.error(error);
  });
}

function remove(todoItem) {
  fs.readFile('./todoList.txt', 'utf8', (error, todoList) => {
    let splitedList = todoList.split('\n');
    console.log(splitedList);
    if ()
  });
}
