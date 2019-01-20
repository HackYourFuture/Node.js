'use strict';
// TODO: Write the homework code in this file
let fs = require('fs');
let command = process.argv[2];
let value = process.argv[3];
let index = parseInt(value);
let updateTask = process.argv[4];

const functionality = require('./functionality');

switch (command) {
  case 'list':
    functionality.todoList();
    break;
  case 'add':
    functionality.add(value);
    break;
  case 'remove':
    functionality.remove(index);
    break;
  case 'reset':
    functionality.reset();
    break;
  case 'update':
    functionality.update(index, updateTask);
    break;
  case 'help':
  default:
    fs.readFile('help.txt', 'utf8', function(error, data) {
      if (error) {
        console.log(error);
      } else {
        console.log(data);
      }
    });
}
