'use strict';

const fs = require('fs');

const DEFAULT_ENCODING = 'utf8';
const STORE_FILE_NAME  = 'store.txt';

function printHelp() {
  console.log(`Usage: node index.js [options]

HackYourFuture Node.js Week 2 - HomeWork To-Do App

Options:

  list                     show all to-dos
  add    [to-do]           add to-do
  remove [number of to-do] remove to-do
  reset                    remove all to-dos
  help                     show this help text
  `);
}

const [,, cmd, ...args] = process.argv;

switch (cmd) {
  case 'add':
    const todo = args.join(' ');
    
    fs.appendFile(STORE_FILE_NAME, `${todo}\n`, (err) => {
    console.error(err);    
    });
    
    console.log(`"${todo}" to-do added`);
  break;

  case 'remove':
    fs.readFile(STORE_FILE_NAME, DEFAULT_ENCODING, (err, data) => {
      if (err) {
        console.error(err);
      }
      const removeTodoNumber = Number(args.toString());
      if (isNaN(removeTodoNumber)) {
        console.error(`to remove type to-do's number`);
      }
      else {
        const todoList = data.split('\n');
        todoList.pop();
        const removeTodoIndex = removeTodoNumber - 1;
        todoList.splice(removeTodoIndex, 1);
        
        fs.unlink(STORE_FILE_NAME, (err) => {
          if (err) {
            console.error(err);
          }
        });
        
        todoList.forEach(todo => {
          fs.appendFile(STORE_FILE_NAME, `${todo}\n`, (err) => {
            console.error(err);
          });
        });
      }
    });
  break;

  case 'reset':
      fs.unlink(STORE_FILE_NAME, (err) => {
          if (err) {
            console.error(err);
          }
        });
    console.log(`to-do list was reset`);
  break;

  case 'list':
    fs.readFile(STORE_FILE_NAME, DEFAULT_ENCODING, (err, data) => {
      if (err) {
        console.error(err);
      }
    const todoList = data.split('\n');
    todoList.pop();
    
    console.log(`to-do list is:`);
    todoList.forEach(todo => {
      console.log(todo);
    });
    });
  break;

  case 'help':
    printHelp();
  break;

  default:
    console.error(`
    there is no such a command
    to show commands type help 
    `);
}