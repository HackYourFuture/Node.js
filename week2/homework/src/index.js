'use strict';

let fs = require('fs');
let args = process.argv.slice(2);
// console.log(args);

let command = args[0];
let todoItem = args[1];

if (command === undefined || 'help') {
  help(todoItem);
} else if (command === 'add') {
  add(todoItem);
} else if (command === 'list') {
  list(todoItem);
} else if (command === 'remove') {
  remove(todoItem);
} else if (command === 'reset') {
  reset(todoItem);
} else {
  console.log(`${command} is not recognized as a command.
  Check the spelling of the name, or if a path was included,
  verify that the path is correct and try again.
  Or use help command`);
}

function list() {
  fs.readFile('./todoList.txt', 'utf8', (error, todoList) => {
    if (error) {
      if (error.code === 'ENOENT') {
        console.log('no data found');
      } else console.error(error);
    } else {
      console.log(todoList);
    }
  });
}

function add(todoItem) {
  fs.appendFile('./todoList.txt', todoItem + '\n', error => {
    console.error(error);
  });
}

function remove(index) {
  fs.readFile('./todoList.txt', 'utf8', (err, data) => {
    if (err) throw err;
    let newList = data.split('\n');
    newList.splice(index - 1, 1);
    fs.writeFile('./todoList.txt', newList.join('\n'), err => {
      if (err) throw err;
    });
  });
}

function reset(todoItem) {
  fs.writeFile('./todoList.txt', '', function(err) {
    if (err) throw err;
    console.log('Reset!');
  });
}

function help(todoItem) {
  fs.readFile('./help.txt', 'utf8', function(err, data) {
    if (err) throw err;
    console.log(data);
  });
}
