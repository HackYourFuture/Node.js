'use strict';

// TODO: Write the homework code in this file
const http = require('http');
const command = process.argv[2];
const functions = require('./functions');

switch (command) {
  case undefined:
  case 'help':
    functions.help();
    break;
  case 'list':
    functions.list();
    break;
  case 'add':
    functions.add();
    break;
  case 'remove':
    functions.remove();
    break;
  case 'reset':
    functions.reset();
    break;
  case 'update':
    functions.update();
    break;
  default:
    console.log('There is no such a command!');
}
