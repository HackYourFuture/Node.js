'use strict';

/** ---------------------------------------
     Base
 ----------------------------------------- */
const program = require('commander');
const help = require('./intro.js');
const add = require('./add.js');
const update = require('./update.js');
const list = require('./list.js');
const remove = require('./remove.js');
const reset = require('./reset.js');

/** ---------------------------------------
     Commands
 ---------------------------------------- */
program.command('help').action(() => {
  help.execute();
});

program.command('add').action(newToDo => {
  add.execute(newToDo);
});

program.command('update').action((toDoNumber, updatedToDo) => {
  update.execute(toDoNumber, updatedToDo);
});

program.command('list').action(() => {
  list.execute();
});

program.command('remove').action(toDoNumber => {
  remove.execute(toDoNumber);
});

program.command('reset').action(() => {
  reset.execute();
});

program.parse(process.argv);
