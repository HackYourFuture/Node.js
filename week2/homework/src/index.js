'use strict';

// TODO: Write the homework code in this file
const fs = require('fs');
const commandsArray = [process.argv[2], process.argv[3], process.argv[4]];
const itemIndex = parseInt(commandsArray[1]) - 1;
const dataFilePath = './data.txt';

function readF(file) {
  return fs.readFileSync(file, 'utf8');
}

function writeF(string) {
  fs.writeFileSync(dataFilePath, string);
}

function appendF(string) {
  fs.appendFileSync(dataFilePath, string);
}

function showList() {
  const list = readF(dataFilePath);
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
  const previousString = readF(dataFilePath);
  if (previousString) {
    appendF('\n' + item);
  } else {
    appendF(item);
  }
}

function removeFromList(index) {
  const str = readF(dataFilePath);
  if (str === '') {
    console.log('The list has no corresponding "to-do element" to be removed.');
  } else {
    const itemsArray = str.split('\n');
    if (index >= 0 && index < itemsArray.length) {
      itemsArray.splice(index, 1);
      writeF(itemsArray.join('\n'));
    } else {
      console.log('The list has no corresponding "to-do element" to be removed.');
    }
  }
}

function updateList(index, addedItem) {
  const str = readF(dataFilePath);
  if (str === '') {
    console.log('The list has no corresponding "to-do element" to be updated.');
  } else {
    const itemsArray = str.split('\n');
    if (index >= 0 && index < itemsArray.length) {
      itemsArray.splice(index, 1, addedItem);
      writeF(itemsArray.join('\n'));
    } else {
      console.log('The list has no corresponding "to-do element" to be updated.');
    }
  }
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
    writeF('');
    break;
  case 'update':
    updateList(itemIndex, commandsArray[2]);
    break;
  default:
    showHelp();
}
