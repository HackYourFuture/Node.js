/* eslint-disable max-len */
'use strict';

const chalk = require('chalk');
const yargs = require('yargs')
  .usage('Usage: $0 <command>')
  .epilog(chalk.yellow('Copyright 2019 >> salih18.github.io'));
const rl = require('readline').createInterface(process.stdin, process.stdout);
const listToDos = require('./listToDos');
const addToDo = require('./addToDo');
const removeToDo = require('./removeToDo');
const completeToDo = require('./completeToDo');
const resetToDos = require('./resetToDos');
const readToDo = require('./readToDo');
const updateToDo = require('./updateToDo');
const exportToDos = require('./exportToDos');
const searchToDos = require('./searchToDos');

// list command
yargs.command({
  command: 'list',
  describe: 'List to-dos',
  handler: function() {
    listToDos();
    rl.close();
  },
});

// add command
yargs.command({
  command: 'add',
  describe: 'Add a new to-do',
  builder: {
    complete: {
      describe: 'To-do complete',
      type: 'string',
      default: '➖',
    },
  },
  handler: function(argv) {
    rl.question(chalk.yellow(`Please, enter a new to-do:\n`), answer => {
      if (answer.length >= 5) {
        addToDo(answer, argv.complete);
        rl.close();
      } else {
        console.log(chalk.red('Please type at least 5 letters'));
        this.handler(argv);
      }
    });
  },
});

// remove command
yargs.command({
  command: 'remove',
  describe: 'Remove a to-do',
  handler: function() {
    rl.question(chalk.yellow(`Please, enter to-do order to remove:  `), answer => {
      removeToDo(parseInt(answer));
      rl.close();
    });
  },
});

// complete command
yargs.command({
  command: 'complete',
  describe: 'Complete a to-do',
  handler: function(argv) {
    rl.question(chalk.yellow(`Please, enter to-do order to complete it:  `), answer => {
      completeToDo(parseInt(answer));
      rl.close();
    });
  },
});

// reset command
yargs.command({
  command: 'reset',
  describe: 'Remove all to-dos',
  handler: function() {
    rl.question(
      `${chalk.red.inverse('This will remove all to-dos!!!')}\n
      Type ${chalk.green('yes')} to continue or ${chalk.red('no')} to cancel\n`,
      answer => {
        answer === 'yes' ? resetToDos() : rl.close();
        rl.close();
      },
    );
  },
});

// read command
yargs.command({
  command: 'read',
  describe: 'Read a specific to-do',
  handler: function() {
    rl.question(chalk.yellow(`Please, enter to-do order to read:  `), answer => {
      readToDo(parseInt(answer));
      rl.close();
    });
  },
});

// update command
yargs.command({
  command: 'update',
  describe: 'Update a specific to-do',
  handler: function() {
    rl.question(chalk.yellow(`Please, enter to-do order to update:  `), order => {
      rl.question(chalk.red(`Please, enter new to-do to replace it: `), body => {
        updateToDo(parseInt(order), body);
        rl.close();
      });
    });
  },
});

// export command
yargs.command({
  command: 'export',
  describe: 'Export as a .txt file',
  handler: function() {
    rl.question(chalk.yellow(`Please, enter filename:  `), answer => {
      exportToDos(answer);
      rl.close();
    });
  },
});

// search command
yargs.command({
  command: 'search',
  describe: 'Search for a term in to-dos',
  handler: function() {
    rl.question(chalk.yellow(`Please, enter a keyword :  `), answer => {
      searchToDos(answer.toLowerCase());
      rl.close();
    });
  },
});

yargs.parse();
