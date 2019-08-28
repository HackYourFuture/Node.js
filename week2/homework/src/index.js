'use strict';

// TODO: Write the homework code in this file
{
  const fs = require('fs');
  // const showHelp = require('./help.txt');
  const add = require('./add');
  const remove = require('./remove');

  const command = process.argv[2];
  const todoTask = process.argv[3];

  if (command === undefined || command === 'help') {
    const somehelp = fs.readFileSync('./help.txt', 'utf8');
    console.log(somehelp);
  }

  if (command === 'list') {
    const showList = fs.readFileSync('./data.txt', 'utf8');
    console.log(showList);
  }

  if (command === 'add') {
    add(todoTask);
  }

  if (command === 'remove') {
    remove.remove(todoTask);
  }

  if (command === 'reset') {
    remove.reset('./data.txt');
  }
}
