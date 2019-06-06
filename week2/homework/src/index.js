'use strict';

// DEFAULT definitions
const fs = require('fs');
const FILE = 'todos.txt';
const DEFAULT_ENCODING = 'utf8';

// Reads the txt file (from lecture folder)
function readFile() {
  return new Promise(resolve =>
    fs.readFile(FILE, DEFAULT_ENCODING, (err, data) => resolve(err ? '' : data)),
  );
}

// Appends new todo item to the txt file (from lecture folder)
function appendFile(...text) {
  return new Promise((resolve, reject) =>
    fs.appendFile(FILE, `${text.join(' ')}\n`, (err, data) => (err ? reject(err) : resolve(data))),
  );
}

// Updates/Deletes the todo item in given index
function upDelete(todo = null) {
  return new Promise((resolve, reject) => {
    fs.readFile(FILE, DEFAULT_ENCODING, (err, data) => {
      let lines = data.split('\n');
      let index = checkIndex(lines);
      console.log(index);
      console.log(todo);
      
      if (index === NaN) {
        return;
      }
      
      if (todo.length > 0) {
        // Updates the todo item at index
        let todoList = todo.join(' ');
        lines.splice(index, 1, todoList);
      } else {
        // Remove the todo item at index
        lines.splice(index, 1);
      }
      let newLines = lines.join('\n');
      // Overwrite the file
      fs.writeFile(FILE, newLines, e => {
        if (e) err = e;
      });
      if (err) {
        reject(err);
      }
      resolve('To Do item has been deleted!');
    });
  });
}

// Removes all todo items
function resetToDos() {
  return new Promise((resolve, reject) => {
    // Overwrite the file with ''
    fs.writeFile(FILE, '', err => {
      if (err) reject(err);
      resolve('To-Do List is cleared!');
    });
  });
}

// Explains all commands (from lecture folder - Modified)
function printHelp() {
  console.log(`Usage: node index.js [options]

HackYourFuture Node.js Week 2 - Lecture To-Do App

Options:

  list          reads all to-dos
  add "to-do"   adds to-do
  remove index  removes to-do item at the index
  reset         removes all to-dos 
  update index  updates to-do item at the index
  help          show this help text
  `);
}

/**
 * Checks the index
 * 1) it that a number or not
 * 2) the txt includes it or not
 */
function checkIndex(list) {
  let index = Number(args[0]);
  index -= 1;
  if (index === NaN) {
    console.log(`The index you wrote is not a number.
    Please try again.`);
    return NaN;
  } else if (list.length <= index) {
    console.log("The index you wrote couldn't be found in todos.txt");
    return NaN;
  }
  return index;
}

const cmd = process.argv[2];
const args = process.argv.slice(3);

try {
  switch (cmd.toLowerCase()) {
    case 'list':
      readFile().then(data => {
        if (data != '') {
          console.log(`To-Dos:\n${data}`);
        } else {
          console.log('To-Dos List is empty!');
        }
      });
      break;
    case 'add':
      appendFile(...args)
        .then(() => console.log('Wrote to-do to file'))
        .then(() => readFile())
        .then(data => console.log(`\nTo-Dos:\n${data}`))
        .catch(console.error);
      break;
    case 'remove':
      upDelete()
        .then(msg => console.log(msg))
        .then(() => readFile())
        .then(data => console.log(`\nTo-Dos:\n${data}`))
        .catch(console.error);
      break;
    case 'reset':
      resetToDos()
        .then(msg => console.log(msg))
        .catch(console.error);
      break;
    case 'update':
      let todo = args.slice(1);
      upDelete(todo)
        .then(msg => console.log(msg))
        .then(() => readFile())
        .then(data => console.log(`\nTo-Dos:\n${data}`))
        .catch(console.error);
      break;
    case 'help':
    default:
      printHelp();
      break;
  }
} catch (error) {
  printHelp();
}
