'use strict';

// TODO: Write the homework code in this file
const { appendFile, readFile, writeFile } = require('fs');
const { promisify } = require('util');
const readFileWithPromise = promisify(readFile);
const writeFileWithPromise = promisify(writeFile);
const args = process.argv.slice(2);
const cmd = args[0];
const TODO_PATH = 'todo.json';


switch (cmd) {
  case 'add':
    break;
  case 'reset':
    break;
  case 'remove':
    state--;
    handleRequest(state);
    break;
  case '/reset': ;
    break;
  default:
}
