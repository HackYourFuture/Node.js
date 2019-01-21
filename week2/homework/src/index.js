#!/usr/bin/env node

'use strict';

require('fs');
const program = require('commander');

const add = require('./actions/add.js');
const list = require('./actions/list');
const reset = require('./actions/reset');
const remove = require('./actions/remove');
const update = require('./actions/update');
const help = require('./actions/help.js');

program
  .version('0.0.1')
  .option('-a, --add <todo>', 'Add todos to the list ', add)
  .option('-l, --list ', 'list todos ', list)
  .option('-r, --remove <index>', 'remove an indexed todo ', remove)
  .option('-R, --reset ', 'removes todos list', reset)
  .option('-h, --help ', 'usage of the commands', help)
  .option('-u, --update <index> ', 'updates a todo item', update)
  .parse(process.argv);
