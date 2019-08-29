'use strict';

// TODO: Write the homework code in this file
const com = require('commander');
const list = require('./list.js');
const add = require('./add.js');
const remove = require('./remove.js');
const reset = require('./reset.js');

const update = require('./update.js');

com.command('list')
  .description(`show all ToDo's list`)
  .action(function () {
    list();
  });

com.command('add <>')
  .description(`add the new todo to the list`)
  .action(function (newToDo) {
    add(newToDo);
  })

com.command('remove <>')
  .description(`remove the todo with given id from the list`)
  .action(function (id) {
    remove(id);
  })

com.command('reset')
  .description(`remove all`)
  .action(function () {
    reset();
  })

com.command('update <> <>')
  .description(`update todo item`)
  .action(function (id, value) {
    update(id, value);
  })

com.command('help')
  .description(`show the short description about the commands`)
  .action(function () {

    com.help();
  })


com.parse(process.argv);
if (com.args.length === 0) {
  com.help()
};