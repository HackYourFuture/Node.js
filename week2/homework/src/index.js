#!/usr/bin/env node

'use strict';

const helpMenu = require('./helpMenu');
const list = require('./list');
const add = require('./add');
const removeLine = require('./removeLine');
const removeAll = require('./removeAll');
const update = require('./update');
const args = require('./arguments');

switch (args.arguments[0]) {
  case 'add':
    add.add(args.arguments[1]);
    break;
  case 'update':
    update.update();
  case 'list':
    list();
    break;
  case 'remove':
    removeLine.remove(args.arguments[1]);
    break;
  case 'reset':
    removeAll.reset();
    break;
  case 'help':
  default:
    helpMenu();
}
