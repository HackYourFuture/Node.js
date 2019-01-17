'use strict';

// TODO: Write the homework code in this file
const fs = require('fs');
const command = process.argv[2];
const addition = process.argv[3];
const itemIndex = parseInt(addition) - 1;
const secondAddition = process.argv[4];

function showList() {
  const list = fs.readFileSync('./data.txt', 'utf8');
  if (!list) {
    console.log('There are no "to-do items" to be displayed.');
  } else {
    console.log(list);
  }
}
function showHelp() {
  console.log(fs.readFileSync('./help.txt', 'utf8'));
}

function addToList(item) {
  const previousString = fs.readFileSync('./data.txt', 'utf8');
  if (previousString) {
    fs.appendFileSync('./data.txt', '\n' + item);
  } else {
    fs.appendFileSync('./data.txt', item);
  }
}

function removeFromList(index) {
  const itemsArray = fs.readFileSync('./data.txt', 'utf8').split('\n');
  if (index >= 0 && index < itemsArray.length) {
    itemsArray.splice(index, 1);
    fs.writeFileSync('./data.txt', itemsArray.join('\n'));
  } else {
    console.log('The list has no corresponding "to-do element" to be removed.');
  }
}

function updateList(index, addedItem) {
  const itemsListArray = fs.readFileSync('./data.txt', 'utf8').split('\n');
  if (index >= 0 && index < itemsListArray.length) {
    itemsListArray.splice(index, 1, addedItem);
    fs.writeFileSync('./data.txt', itemsListArray.join('\n'));
  } else {
    console.log('The list has no corresponding "to-do element" to be updated.');
  }
}

function resetList() {
  fs.writeFileSync('./data.txt', '');
}

switch (command) {
  case 'help':
    showHelp();
    break;
  case 'list':
    showList();
    break;
  case 'add':
    addToList(addition);
    break;
  case 'remove':
    removeFromList(itemIndex);
    break;
  case 'reset':
    resetList();
    break;
  case 'update':
    updateList(itemIndex, secondAddition);
    break;
  default:
    showHelp();
}
