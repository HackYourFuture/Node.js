'use strict';

const data = require('./data');
const removeData = require('./remove');
const updateData = require('./update');
const convertData = require('./convert');

const fs = require('fs');
const process = require('process');

data.stringTo_dos;

let commands = {
  add: " to add to-do item to the list.",
  remove: "to remove item from the list using the item index",
  help: "all commands with short description",
  list: "Shows current to-dos",
  reset: "Removes all to-do items from the list",
  update: "to update an existing item using his index"
};

switch (process.argv[2]) {
  case "add":
    data.to_dos.push(process.argv[3]);
    data.writeData(data.to_dos);
    break;
  case "help":
    console.log(commands);
    break;
  case "reset":
    let x = [];
    data.writeData(x);
    console.log("you made your to-dos list empty!");
    break;
  case "remove":
    removeData(process.argv[3]);
    break;
  case "list":
    to_dos.length > 0 ? console.log(data.to_dos) : console.log("there is no items in your list!");
    break;
  case "update":
    updateData(process.argv[3], process.argv[4]);
    break;
  default:
    console.log(commands);
}

convertData(data.to_dos);





