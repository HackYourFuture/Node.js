'use strict';

const {
  prompt,
  addPrompt,
  removePrompt,
  completePrompt,
  resetPrompt,
  readPrompt,
  updatePrompt,
  updateQuestion,
  exportPrompt,
  searchPrompt
} = require('./prompt');

const chalk = require('chalk');
const yargs = require('yargs');
const listToDos = require('./listToDos');
const addToDo = require('./addToDo');
const removeToDo = require('./removeToDo');
const completeToDo = require('./completeToDo');
const resetToDos = require('./resetToDos');
const readToDo = require('./readToDo');
const updateToDo = require('./updateToDo');
const exportToDos = require('./exportToDos');
const searchToDos = require('./searchToDos');

yargs
  .command({
    command: 'list',
    describe: 'List to-dos',
    handler: function() {
      listToDos();
    }
  })
  .command({
    command: 'add',
    describe: 'Add a new to-do',
    builder: {
      complete: {
        describe: 'To-do complete',
        type: 'string',
        default: '➖'
      }
    },
    handler: async function(argv) {
      const answer = await prompt(addPrompt);
      answer.length >= 5 ? addToDo(answer, argv.complete) : this.handler(argv);
    }
  })
  .command({
    command: 'remove',
    describe: 'Remove a to-do',
    handler: async function() {
      const answer = await prompt(removePrompt);
      removeToDo(parseInt(answer));
    }
  })
  .command({
    command: 'complete',
    describe: 'Complete a to-do',
    handler: async function() {
      const answer = await prompt(completePrompt);
      completeToDo(parseInt(answer));
    }
  })
  .command({
    command: 'reset',
    describe: 'Remove all to-dos',
    handler: async function() {
      const answer = await prompt(resetPrompt);
      if (answer === 'yes') resetToDos();
      else if (!(answer === 'no')) this.handler();
    }
  })
  .command({
    command: 'read',
    describe: 'Read a specific to-do',
    handler: async function() {
      const answer = await prompt(readPrompt);
      readToDo(parseInt(answer));
    }
  })
  .command({
    command: 'update',
    describe: 'Update a specific to-do',
    handler: async function() {
      const order = await prompt(updatePrompt);
      const body = await prompt(updateQuestion);
      updateToDo(parseInt(order), body);
    }
  })
  .command({
    command: 'export',
    describe: 'Export as a .txt file',
    handler: async function() {
      const answer = await prompt(exportPrompt);
      exportToDos(answer);
    }
  })
  .command({
    command: 'search',
    describe: 'Search for a term in to-dos',
    handler: async function() {
      const answer = await prompt(searchPrompt);
      searchToDos(answer.toLowerCase());
    }
  })
  .strict()
  .demandCommand()
  .recommendCommands()
  .usage('Usage: $0 <command> [option]')
  .epilog(chalk.yellow('Copyright 2019 >> salih18.github.io'))
  .parse();
