#!/usr/bin/env node

'use strict';

const fs = require('fs');
const helpMenu = require('./help');
const list = require('./list');
const addItem = require('./add');
const removeLine = require('./removeItem');
const reset = require('./reset');
const update = require('./update');

const command = process.argv[2];
const firstOption = process.argv[3];
const secondOption = process.argv[4];

switch (command) {
  case 'add':
    addItem(firstOption);
    break;
  case 'update':
    update(firstOption, secondOption);
  case 'list':
    list();
    break;
  case 'remove':
    removeLine(firstOption);
    break;
  case 'reset':
    reset();
    break;
  case 'help':
  default:
    helpMenu();
}
