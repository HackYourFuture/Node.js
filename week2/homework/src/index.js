'use strict';

// TODO: Write the homework code in this file
const fs = require('fs');

const update = require('./update');
const reset = require('./reset');
const remove = require('./remove');
const add = require('./add');
const list = require('./list');
const help = require('./help');

const command = process.argv[2];
const object = process.argv[3];
const newValue = process.argv[4];

switch (command) {
  case 'list':
    list();
    break;
  case 'add':
    add(object);
    break;
  case 'remove':
    remove(object);
    break;
  case 'reset':
    reset();
    break;
  case 'help':
    help();
    break;
  case 'update':
    update(object, newValue);
    break;
  default:
    console.log("No command or command doesn't match see the help for more information");
    help();
    break;
}
