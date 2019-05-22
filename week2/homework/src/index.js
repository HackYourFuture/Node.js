'use strict';

// TODO: Write the homework code in this file
let fs = require('fs');
let args = process.argv.slice(2);
let command = args[0];
let todoItem = args[1];
let commandDescription = args[2];

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
}

// Shows current to-dos
function list() {
  fs.readFile('./todoList.txt', 'utf8', (error, todoList) => {
    if (error) {
      if (error.code === 'ENOENT') {
        console.log('no data found');
      } else {
        console.error(error);
      }
    } else {
      const newTodoList = todoList.split('\n');
      if (newTodoList.length === 1) {
        console.log('There is nothing in todo list!');
      } else {
        console.log(todoList);
      }
    }
  });
}

//Adds a to-do item
function add(todoItem) {
  if (!commandDescription) {
    console.log('Please write a short description about command');
  } else if (commandDescription) {
    fs.appendFile('./todoList.txt', todoItem + '\n', error => {
      console.error(error);
    });
    fs.appendFile('./helpList.txt', `${todoItem} - ${commandDescription}` + '\n', error => {
      console.error(error);
    });
  }
}

//Removes one to-do item from todoList and helpList
function remove(todoItem) {
  fs.readFile('./todoList.txt', 'utf8', (error, todoList) => {
    if (error) {
      console.error(error);
    } else {
      let newTodoList = todoList.split('\n');
      if (todoItem < 0 || todoItem > newTodoList.length - 1) {
        console.log('The number must be positive and smaller than total command count.');
      } else if (0 < todoItem < newTodoList.length) {
        //to remove from todoList.txt
        newTodoList.splice(todoItem - 1, 1);
        fs.writeFile('./todoList.txt', newTodoList.join('\n'), error => {
          if (error) {
            console.error(error);
          }
        });
        //to remove from helpList.txt
        fs.readFile('./helpList.txt', 'utf8', (error, helpList) => {
          if (error) {
            console.error(error);
          } else {
            let newHelpList = helpList.split('\n');
            newHelpList.splice(todoItem - 1, 1);
            fs.writeFile('./helpList.txt', newHelpList.join('\n'), error => {
              if (error) {
                console.error(error);
              }
            });
          }
        });
      }
    }
  });
}

//resets todoList and helpList
function reset() {
  fs.writeFile('./todoList.txt', '', error => {
    if (error) {
      console.error(error);
    }
  });
  fs.writeFile('./helpList.txt', '', error => {
    if (error) {
      console.error(error);
    }
  });
}

//shows help section
function help(commandDescription) {
  fs.readFile('./helpList.txt', 'utf8', (error, helpList) => {
    if (error) {
      console.error(error);
    } else {
      const newList = helpList.split('\n');
      if (newList.length === 1) {
        console.log('There is nothing in command list!');
      } else {
        console.log(helpList);
      }
    }
  });
}
