'use strict';

// TODO: Write the homework code in this file
const showList = require('./actions/showList');
const showHelp = require('./actions/showHelp');
const addToList = require('./actions/addToList');
const removeFromList = require('./actions/removeFromList');
const updateList = require('./actions/updateList');
const writeF = require('./actions/writeF');

const commands = [process.argv[2], process.argv[3], process.argv[4]];
const itemIndex = parseInt(commands[1]) - 1;

switch (commands[0]) {
  case 'help':
    showHelp();
    break;
  case 'list':
    showList();
    break;
  case 'add':
    addToList(commands[1]);
    break;
  case 'remove':
    removeFromList(itemIndex);
    break;
  case 'reset':
    writeF('');
    break;
  case 'update':
    updateList(itemIndex, commands[2]);
    break;
  default:
    showHelp();
}
