'use strict';

const printHelp = require('./printHelp');
const listToDos = require('./listToDos');
const addToDos = require('./addToDos');
const removeToDo = require('./removeToDo');
const removeAllToDos = require('./removeAllToDos');
const updateToDo = require('./updateToDo');

const command = process.argv[2];
const args = process.argv.slice(3);
const callCommand = (action, callback) => {
  action
    .then(callback)
    .then(() => listToDos.listToDos())
    .then(data => console.log(`\nTo-Dos:\n${data}`))
    .catch(console.error);
};

switch (command) {
  case 'list':
    callCommand(listToDos.listToDos(), data => JSON.stringify(data, null, 2));
    break;
  case 'add':
    callCommand(addToDos.addToDos(...args), () => console.log('To-do is added to the file.'));
    break;
  case 'remove':
    callCommand(removeToDo.removeToDo(...args), () =>
      console.log('To-do is removed from the file.')
    );
    break;
  case 'reset':
    callCommand(removeAllToDos.removeAllToDos(), () =>
      console.log('All the to-dos are removed from the file.')
    );
    break;
  case 'update':
    callCommand(updateToDo.updateToDo(...args), () => console.log('To-do is updated.'));
    break;
  case 'help':
  default:
    printHelp.printHelp();
    break;
}
