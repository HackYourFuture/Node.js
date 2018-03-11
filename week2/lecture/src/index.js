'use strict';

const fs = require('fs');

const DEFAULT_ENCODING = 'utf8';
const STORE_FILE_NAME  = 'store.txt';

function readFile() {
  return new Promise(
    resolve => fs.readFile(
      STORE_FILE_NAME,
      DEFAULT_ENCODING,
      (err, data) => resolve(err ? '' : data)
    )
  );
}

function appendFile(...text) {
  return new Promise(
    (resolve, reject) => fs.appendFile(
      STORE_FILE_NAME,
      `${text.join(' ')}\n`,
      (err, data) => err
        ? reject(err)
        : resolve(data)
    )
  );
}

function printHelp() {
  console.log(`Usage: node index.js [options]

HackYourFuture Node.js Week 2 - Lecture To-Do App

Options:

  read          read all to-dos
  write [to-do] add to-do
  help          show this help text
  `);
}

/* Or we could destructure the array instead
 * const [,, cmd, ...args] = process.argv;
 */
const cmd  = process.argv[2];
const args = process.argv.slice(3);

switch (cmd) {
  case 'read':
    readFile()
      .then(data => console.log(`To-Dos:\n${data}`));
    break;

  case 'write':
    appendFile(...args)
      .then(() => console.log('Wrote to-do to file'))
      .then(() => readFile())
      .then(data => console.log(`\nTo-Dos:\n${data}`))
      .catch(console.error);
    break;

  case 'help':
  default:
    printHelp();
    break;
}
