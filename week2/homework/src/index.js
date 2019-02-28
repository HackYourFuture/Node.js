'use strict';

const commandList = require('./commandsList');
const theMethods = require('./methods.js');

switch (commandList[0]) {
  case 'add':
    theMethods.add(commandList[1]);
    break;

  case 'delete':
    theMethods.delete(commandList[1]);
    break;

  case 'update':
    theMethods.update(commandList[1], commandList[2]);
    break;

  case 'list':
    theMethods.readList();
    break;

  case 'reset':
    theMethods.reset();

  case 'help':
    theMethods.displayHelp();
    break;

  default:
    console.log(`This command doesn't exit...
    kindly read the help manuel!
    type: node . help`);
}
