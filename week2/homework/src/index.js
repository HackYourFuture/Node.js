'use strict';

const Methods = require('./Methods');

const method = process.argv[2];
const filePath = process.argv[3];
const args = process.argv.slice(4);

const run = new Methods(filePath, args);

switch (method) {
  case 'list':
    run.list();
    break;

  case 'add':
    run.add();
    break;

  case 'remove':
    run.remove();
    break;

  case 'reset':
    run.reset();
    break;

  case 'update':
    run.update();
    break;

  default:
    run.help();
    break;
}
