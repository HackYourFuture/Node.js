'use strict';

//const fs = require('fs'); // access to fs module. Then look at documentation for FS module
const { readFile, writeFile } = require('fs');
//these are properties on an object - requesting specific properties of an fs object.

const { promisify } = require('util'); //is a built in method 

//today: read file, append file, write file (usually overwrites)

const DEFAULT_ENCODING = 'utf8';
const STORE_FILE_NAME = 'store.txt';

/* readFile('some-file.txt', 'utf8', (err, data) => {
  if (err)
  return console.error(err);
  console.info(data);
})*/

/* function readFileWith Promise(path, encoding) {
  return new Promise (resolve, reject)
  [see 12:50 et seq]
})*/

/* can simply then say const readFileWithPromise - promisify(readFile);*/

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
const cmd = process.argv[2];
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
