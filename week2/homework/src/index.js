'use strict';

// To use bonus To-Do App with commander and JSON,
// please use 'node src/index-bonus.js' in project folder
// or 'node index-bonus.js' in project/src folder.

const { help, add, list, remove, reset, update, handleError } = require('./actions');

const command = process.argv[2];
const parameter = process.argv[3];
const updateText = process.argv[4];

switch (command) {
  case 'list':
    list()
      .then(toDos => console.log(`Your to-do list:\n${toDos}`))
      .catch(error => handleError(error));
    break;
  case 'add':
    add(parameter)
      .then(result => console.log(result))
      .catch(error => handleError(error));
    break;
  case 'remove':
    remove(parameter)
      .then(result => console.log(result))
      .catch(error => handleError(error));
    break;
  case 'reset':
    reset()
      .then(result => console.log(result))
      .catch(error => handleError(error));
    break;
  case 'update':
    update(parameter, updateText)
      .then(result => console.log(result))
      .catch(error => handleError(error));
    break;
  case 'help':
  default:
    console.log(help());
    break;
}
