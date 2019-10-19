'use strict';

const fs = require('fs');
const DEFAULT_ENCODING = 'utf8';
const FILE_PATH = './todo.txt';
const help = require('./help');
const cmd = process.argv[2];
const args = process.argv.slice(3);

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
}

function deleteItem(index) {
  fs.readFile(FILE_PATH, DEFAULT_ENCODING, (err, contents) => {
    if (err) {
      console.log('No list to show.');
    } else {
      const contentPart = contents.split('\n');
      contentPart.splice(index - 1, 1);
      const updatedContent = contentPart.join('\n');
      fs.writeFile(FILE_PATH, updatedContent, err => {
        if (err) throw err;
        readFile().then(data => console.log(`New To-Do:\n${data}`));
      });
    }
  });
}

function resetFile() {
  return new Promise(resolve => fs.truncate(FILE_PATH, 0, (err, data) => resolve(err ? '' : data)));
}

switch (cmd) {
  case 'list':
    readFile().then(data => console.log(`To-Do:\n${data}`));
    break;

  case 'add':
    appendFile(...args)
      .then(() => console.log(`\nYou've added new task to your ToDo list`))
      .then(() => readFile())
      .then(data => console.log(`\nTo-Do:\n${data}\n`))
      .catch(console.error);
    break;

  case 'remove':
    deleteItem(args);
    break;

  case 'reset':
    resetFile().then(data => console.log('ToDo list is empty'));
    break;

  case 'help':
    help();
    break;

  default:
    help();
    break;
}
