'use strict';
const yargs = require('yargs');
const todo = require('./todo.js');

yargs.command({
  command: 'add',
  describe: `In order to add a new to-do please type e.g

   node . add --title hereIsYourTo-do
   node index.js add --title hereIsYourTo-do
   `,
  builder: {
    title: {
      describe: 'Type to-do',
      demandOption: true,
      type: 'string',
    },
    order: {
      describe: 'Type to-do',
      type: 'number',
    },
  },

  handler(argv) {
    todo.addToDo(argv.title, argv.order);
  },
});

yargs.command({
  command: 'remove',
  describe: `In order to remove to-do by order please type e.g

  node . --order hereIsYourTo-doNumber
  node index.js --order hereIsYourTo-doNumber
  
  If You are not sure about the number first list your to-dos
  `,
  builder: {
    order: {
      describe: 'Type to-do number to remove',
      demandOption: true,
      type: 'number',
    },
  },
  handler(argv) {
    todo.removeToDo(argv.order);
  },
});

yargs.command({
  command: 'list',
  describe: `In order to list to-dos please type e.g

  node . list
  node index.js list
  `,
  builder: {
    title: {
      describe: 'Type to-do',
      type: 'string',
    },
    order: {
      describe: 'Type to-do',
      type: 'number',
    },
  },

  handler() {
    todo.listToDo();
  },
});

yargs.command({
  command: 'reset',
  describe: `In order to remove all to-do list please type e.g
  
   node . reset
   node index.js reset
   `,
  handler() {
    todo.resetToDos();
  },
});

yargs.parse();
