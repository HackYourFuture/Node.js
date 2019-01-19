'use strict';

// TODO: Write the homework code in this file
const showList = require('./actions/showList');
const showHelp = require('./actions/showHelp');
const addToList = require('./actions/addToList');
const removeFromList = require('./actions/removeFromList');
const updateList = require('./actions/updateList');
const resetList = require('./actions/resetList');

const command = process.argv[2];
const addition = process.argv[3];
const itemIndex = parseInt(addition) - 1;
const secondAddition = process.argv[4];

switch (command) {
  case 'help':
    showHelp();
    break;
  case 'list':
    showList();
    break;
  case 'add':
    addToList(addition);
    break;
  case 'remove':
    removeFromList(itemIndex);
    break;
  case 'reset':
    resetList();
    break;
  case 'update':
    updateList(itemIndex, secondAddition);
    break;
  default:
    showHelp();
}
