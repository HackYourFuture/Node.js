'use strict';

const add = require('./add');
const list = require('./list');
const help = require('./help');
const remove = require('./remove');
const reset = require('./reset');
const update = require('./update');

const command = process.argv[2];
const todoText = process.argv[3];
const index = process.argv[3];
const updatedText = process.argv[4];

switch (command) {
  case 'help':
    help();
    break;

  case 'add':
    add(todoText);
    break;

  case 'list':
    list();
    break;

  case 'remove':
    remove(index);
    break;

  case 'reset':
    reset();
    break;

  case 'update':
    update(index, updatedText);
    break;

  default:
    console.log(`${command} is not a valid command`);
    break;
}
