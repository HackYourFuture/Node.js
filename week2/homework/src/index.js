'use strict';

// TODO: Write the homework code in this file
const fs = require('fs');
const commandsArray = [process.argv[2], process.argv[3], process.argv[4]];
const itemIndex = parseInt(commandsArray[1]) - 1;

function readF(file) {
  return fs.readFileSync(file, 'utf8');
}

function writeF(string) {
  fs.writeFileSync('./data.txt', string);
}

function appendF(string) {
  fs.appendFileSync('./data.txt', string);
}

function showList() {
  const list = readF('./data.txt');
  if (!list) {
    console.log('There are no "to-do items" to be displayed.');
  } else {
    console.log(list);
  }
}

function showHelp() {
  console.log(readF('./help.txt'));
}

function addToList(item) {
  const previousString = readF('./data.txt');
  if (previousString) {
    appendF('\n' + item);
  } else {
    appendF(item);
  }
}

function removeFromList(index) {
  const itemsArray = readF('./data.txt').split('\n');
  if (index >= 0 && index < itemsArray.length) {
    itemsArray.splice(index, 1);
    writeF(itemsArray.join('\n'));
  } else {
    console.log('The list has no corresponding "to-do element" to be removed.');
  }
}

function updateList(index, addedItem) {
  const itemsArray = readF('./data.txt').split('\n');
  if (index >= 0 && index < itemsArray.length) {
    itemsArray.splice(index, 1, addedItem);
    writeF(itemsArray.join('\n'));
  } else {
    console.log('The list has no corresponding "to-do element" to be updated.');
  }
}

function resetList() {
  writeF('');
}

switch (commandsArray[0]) {
  case 'help':
    showHelp();
    break;
  case 'list':
    showList();
    break;
  case 'add':
    addToList(commandsArray[1]);
    break;
  case 'remove':
    removeFromList(itemIndex);
    break;
  case 'reset':
    resetList();
    break;
  case 'update':
    updateList(itemIndex, commandsArray[2]);
    break;
  default:
    showHelp();
}
