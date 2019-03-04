'use strict';

const commandList = require('./commandsList');
const methods = require('./methods.js');

if (!commandList[0]) {
  methods.displayHelp();
}
 else {
  switch (commandList[0]) {
    case 'add':
      methods.add(commandList[1]);
      break;

    case 'delete':
      methods.delete(commandList[1]);
      break;

    case 'update':
      methods.update(commandList[1], commandList[2]);
      break;

    case 'list':
      methods.readList();
      break;

    case 'reset':
      methods.reset();
      break;

    case 'help':
      methods.displayHelp();
      break;

    default:
      console.log(`This command doesn't exit...
      kindly read the help manuel!
      type: node . help`);
  }
}
