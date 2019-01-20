'use strict';

const add = require('./actions/add');
const update = require('./actions/update');
const list = require('./actions/list');
const remove = require('./actions/remove');
const reset = require('./actions/reset');
const help = require('./actions/help');

let command = process.argv[2];

switch (command) {
  case 'help':
    help();
    break;
  case 'add':
    add(process.argv[3]);
    break;
  case 'update':
    update(process.argv[4]);
    break;
  case 'list':
    list();
    break;
  case 'reset':
    reset();
    break;
  case 'remove':
    remove();
    break;
  default:
    help();
    break;
}
