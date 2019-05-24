'use strict';

let fs = require('fs');
let { add, list, remove, help, reset, update } = require('./actions');
let commander = require('commander');

if (!fs.existsSync('./todoList.json')) {
  fs.writeFileSync('./todoList.json', JSON.stringify([]), 'utf8');
}

commander
  .option('a add <item>', 'add todo item', add)
  .option('h help', 'help menu', help)
  .option('l list', 'todo items', list)
  .option('rm remove [integer]', 'index of item', remove)
  .option('r reset', 'reset todo items', reset);

commander.command('update [index] <newItem>').action((index, newItem) => update(index, newItem));

commander.parse(process.argv);
