'use strict';
const fs = require('fs');
const DEFAULT_ENCODING = 'utf8';
const FILE_PATH = 'c:/nodeJS/week2/homework/src/todo.txt';
const cmd = process.argv[2];
const args = process.argv.slice(3);

function printHelp() {
  console.log(`Usage: node index.js [options]

HackYourFuture Node.js Week 2/Homework 2 - Lecture To-Do App

Options:

  help          shows this help text(node index.js help/node index.js)
  list          shows current to-dos, or shows an appropriate text if there are no to-dos(node index.js list)
  add           adds a to-do item (all the words behind add are entered as 1 to-do item to the list)(node index.js add "Buy groceries")
  remove        removes a to-do item by its 1-base index, e.g. to remove second item, execute(node index.js remove 2)
  reset         removes all to-do items from the list(node index.js reset)

  `);
}
function readFile() {
  return new Promise(resolve =>
    fs.readFile(FILE_PATH, DEFAULT_ENCODING, (err, data) => resolve(err ? '' : data)),
  );
}

function appendFile(...text) {
  return new Promise((resolve, reject) =>
    fs.appendFile(FILE_PATH, `${text.join(' ')}\n`, (err, data) =>
      err ? reject(err) : resolve(data),
    ),
  );
};
function deleteItem(index) {
  fs.readFile(FILE_PATH, DEFAULT_ENCODING, (error, contents) => {
    if (error) {
      console.log('There is no toDoList file.');
    } else {
      const contentPart = contents.split('\n');
      contentPart.splice(index - 1, 1);
      const updatedContent = contentPart.join('\n');
      fs.writeFile(FILE_PATH, updatedContent, err => {
        if (err) throw err;
        readFile().then(data => console.log(`New To-Dos:\n${data}`));
      });
    }
  });
}
function resetFile() {
  return new Promise(resolve =>
    fs.truncate(FILE_PATH, 0, (err, data) => resolve(err ? '' : data)),
  );
}
switch (cmd) {
  case 'list':
    readFile().then(data => console.log(`To-Dos:\n${data}`));
    break;

  case 'add':
      appendFile(...args)
      .then(() => console.log('Wrote to-do to file'))
      .then(() => readFile())
      .then(data => console.log(`\nTo-Dos:\n${data}\n`))
      .catch(console.error);
    break;

  case 'remove':    
   deleteItem(args);
    break;

  case 'reset':
    resetFile().then(data => console.log('All in the file is deleted'));
    break;

  case 'help':
    printHelp();
    console.log('help');
    break;

  default:
    printHelp();
    break;
}
