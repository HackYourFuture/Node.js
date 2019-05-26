'use strict';

// TODO: Write the homework code in this file
const fs = require('fs');
const args = process.argv.slice(2);
const command = args[0];
const todoItem = args[1];

if (command === 'add') {
  add(todoItem);
} else if (command === 'help' || !command) {
  help();
} else if (command === 'list') {
  list(todoItem);
} else if (command === 'remove') {
  remove(todoItem);
} else if (command === 'reset') {
  reset();
} else {
  console.error('Please use help command to see the appropriate commands');
}

// Shows current to-dos
function list() {
  fs.readFile('./todoList.txt', 'utf8', (error, todoList) => {
    if (error) {
      if (error.code === 'ENOENT') {
        console.log('no data found');
      } else {
        console.log(error);
      }
    } else {
      const arrayOfTodoList = todoList.split('\n').filter(todo => todo.trim());
      if (arrayOfTodoList.length === 0) {
        console.log('There is nothing in todo list!');
      } else {
        console.log(todoList);
      }
    }
  });
}

//Adds a to-do item
function add(todoItem) {
  fs.appendFile('./todoList.txt', todoItem + '\n', error => {
    console.error(error);
  });
}

//Removes one to-do item from todoList
function remove(todoItem) {
  fs.readFile('./todoList.txt', 'utf8', (error, todoList) => {
    if (error) {
      console.error(error);
    } else {
      const arrayOfTodoList = todoList.split('\n');
      if (todoItem < 1 || todoItem > arrayOfTodoList.length) {
        console.log('The number should be between zero and the total number of commands');
      } else if (0 < todoItem < arrayOfTodoList.length + 1) {
        arrayOfTodoList.splice(todoItem - 1, 1);
        fs.writeFile('./todoList.txt', arrayOfTodoList.join('\n'), error => {
          if (error) {
            console.error(error);
          }
        });
      }
    }
  });
}

//resets todoList
function reset() {
  fs.writeFile('./todoList.txt', '', error => {
    if (error) {
      console.error(error);
    }
  });
}

//shows help section
function help() {
  fs.readFile('./helpList.txt', 'utf8', (error, helpList) => {
    if (error) {
      console.error(error);
    } else {
      console.log(helpList);
    }
  });
}
