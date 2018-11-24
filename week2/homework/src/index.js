'use strict';

let fs = require('fs');
const toDoItem = process.argv[3];
const writeData = require('./functions/write');
const help = require('./functions/help');
const list = require('./functions/list');
const reset = require('./functions/reset');
const remove = require('./functions/remove');
const update = require('./functions/update');
const cmd = process.argv[2];
let toDoList = fs.readFileSync("./toDoList.json", "utf-8");
toDoList = JSON.parse(toDoList);


switch (cmd) {
  case 'help':
    help();
    break;
  case 'list':
    list();
    break;
  case 'add':
    toDoList.push(toDoItem);
    writeData(toDoList);
    break;
  case 'remove':
    remove();
    break;
  case 'reset':
    reset();
    break;
  case 'update':
    update();
    break;
  default:
    console.log('Unknown command, Please refer to the help menu')
    help();
}

