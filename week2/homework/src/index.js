'use strict';
const writeToFile = require('./writeToFile');
const readAndAppend = require('./readAndAppend');
const displayList = require('./displayList');
const remove = require('./remove');
const update = require('./update');
const reset = require('./reset');
const command = process.argv[2];
const args = process.argv.slice(3);
switch (command) {
  case 'help':
  default:
    console.log(
      '\ncommands :\n\n' +
        '\tadd\t: to add item to TODO list Eg: node . add buy groceries\n\n' +
        '\tlist\t: to see items in the TODO list Eg: node . list\n\n' +
        '\tremove\t: to remove the nth item from the TODO list \n \tEg: node . remove 2 (removes 2nd item from the list)\n\n' +
        '\treset\t: remove all items from the TODO list Eg: node . reset\n\n' +
        '\tupdate\t: update an item in the TODO list Eg: node . update TODO# New TODO\n\n' +
        '\treset\t: remove all items from the TODO list Eg: node . reset\n\n',
    );
    break;
  case 'add':
    readAndAppend(args)
      .then(data => writeToFile(data).then(displayList()))
      .catch(console.error);
    break;
  case 'update':
    update(args)
      .then(data => writeToFile(data))
      .catch(console.error);
    break;
  case 'remove':
    remove(...args)
      .then(data => writeToFile(data).then(displayList()))
      .catch(console.error);
    break;
  case 'list':
    displayList().catch(console.error);
    break;
  case 'reset':
    reset()
      .then(data => writeToFile(data).then(displayList()))
      .catch(console.error);
    break;
}
