'use strict';

const command = require('commander');

const help = require('./help');
const add = require('./add');
const list = require('./list');
const remove = require('./remove');
const reset = require('./reset');
const update = require('./update');

command.command('help').action(() => {
  help();
});

command.command('add <newToDo>').action(newToDo => {
  add(newToDo);
});

command.command('list').action(() => {
  list();
});

command.command('remove <toDoNumber>').action(toDoNumber => {
  remove(toDoNumber);
});

command.command('reset').action(() => {
  reset();
});

command.command('update <existingToDoNumber> <updatedToDo>').action((toDoNumber, newToDo) => {
  update(toDoNumber, newToDo);
});

command.parse(process.argv);
