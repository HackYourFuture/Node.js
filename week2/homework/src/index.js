#!/usr/bin/env node

'use strict';

const fs = require('fs');
const helpMenu = require('./helpMenu');
const list = require('./list');
const add = require('./add');
const removeLine = require('./removeLine');
const removeAll = require('./removeAll');
const update = require('./update');

const command = process.argv[2];
const value = process.argv[3];

switch (command) {
  case 'add':
    add(value);
    break;
  case 'update':
    update(value);
  case 'list':
    list();
    break;
  case 'remove':
    removeLine(value);
    break;
  case 'reset':
    removeAll();
    break;
  case 'help':
  default:
    helpMenu();
}
