'use strict';

const fs = require('fs');
const storageFile = 'todolist.json';

function readFile() {
  fs.readFile(storageFile, 'utf8', (err, list) => {
    if (err) {
      throw err;
    }
    console.log(`\nTodo list:\n${list}`);
  });
}

function add() {
  fs.readFile(storageFile, 'utf8', (err, list) => {
    if (err) {
      throw err;
    }
    list = JSON.parse(list);
    list.push(todoObject);
    fs.writeFile(storageFile, JSON.stringify(list, null, 4), err => {
      if (err) throw err;
    });
    console.log(`'${todoObject}' has been added to the list.`);
  });
}

function remove(index) {
  fs.readFile(storageFile, 'utf8', (err, list) => {
    if (err) {
      throw err;
    }
    list = JSON.parse(list);
    if (index > 0 && index <= list.length) {
      list.splice(index - 1, 1);
      fs.writeFile(storageFile, JSON.stringify(list, null, 4), err => {
        if (err) throw err;
        console.log(`Item at index ${index} has been terminated >=3`);
      });
    } else {
      console.log('Please provide a valid index...');
    }
  });
}

function update(index, updatedObject) {
  fs.readFile(storageFile, 'utf8', (err, list) => {
    if (err) {
      throw err;
    }
    list = JSON.parse(list);
    if (index > 0 && index <= list.length) {
      list.splice(index - 1, 1, updatedObject);
      fs.writeFile(storageFile, JSON.stringify(list, null, 4), 'utf8', err => {
        if (err) throw err;
        console.log(`Item at index ${index} has been modified`);
      });
    } else {
      console.log('Please provide a valid index to modify.');
    }
  });
}

function reset() {
  fs.writeFile(storageFile, JSON.stringify([]), err => {
    if (err) throw err;
  });
  console.log(`The list has been reset...`);
}

function help() {
  console.log(`Hello there! Welcome to my basic to-do list application that uses the command line.

  Usage example: node index.js [options]

  Options:

  list                     :this will read then show you the list
  add ["to-do"]            :this will add a new to-do item to our list
  remove [index]           :this will remove the to-do item at the index you have provided
  update [index] ["to-do"] :this will update the to-do item at the index you have provided with the new to-do item you have entered
  reset                    :this will clear our list so you can start from scratch
  help                     :shows help... oh you are already here!
  
  `);
}

const args = process.argv.slice(2);
const cmd = process.argv[2];
const todoObject = args[1];
const updatedObject = args[2];

switch (cmd) {
  case 'list':
    readFile();
    break;

  case 'add':
    add(todoObject);
    break;

  case 'remove':
    remove(todoObject);
    break;

  case 'update':
    update(todoObject, updatedObject);
    break;

  case 'reset':
    reset();
    break;

  case 'help':
  default:
    help();
    break;
}
