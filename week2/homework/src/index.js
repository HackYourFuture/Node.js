'use strict';

let fs = require('fs');
let { add, list, remove, help, reset, update } = require('./actions');
let commander = require('commander');

if (!fs.existsSync('./todoList.json')) {
  fs.writeFileSync('./todoList.json', JSON.stringify([]), 'utf8');
}

commander.command('add <item>').action(item => add(item));
commander.command('help').action(() => help());
commander.command('list').action(() => list());
commander.command('remove [integer]').action(integer => remove(integer));
commander.command('reset').action(() => reset());
commander.command('update [index] <newItem>').action((index, newItem) => update(index, newItem));
commander.parse(process.argv);
