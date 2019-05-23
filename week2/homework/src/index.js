'use strict';

const fs = require('fs');
const fileName = `${__dirname}/todoList.txt`;

const command = process.argv[2];
const args = process.argv.slice(3);

const number = parseInt(args);

if (command === 'add') {
  add(...args).then(() => console.log(`a new item has been saved...`));
} else if (command === 'help' || command === undefined) {
  help();
} else if (command === 'list') {
  list().then(data => console.log(`To-Dos:\n${data}`));
} else if (command === 'remove') {
  remove(number);
} else if (command === 'reset') {
  reset().then(() => console.log('All to-do has been deleted'));
}

async function remove(index) {
  try {
    const data = await list();
    let arr = data.split('\n');
    arr.splice(index - 1, 1);
    write(arr);
  } catch (err) {
    console.error(err);
  }
}

function write(arr) {
  return new Promise((resolve, reject) =>
    fs.writeFile(fileName, `${arr.join('\n')}`, (err, data) => (err ? reject(err) : resolve(data))),
  );
}

function add(...text) {
  return new Promise((resolve, reject) =>
    fs.appendFile(fileName, `${text.join(' ')}\n`, (err, data) =>
      err ? reject(err) : resolve(data),
    ),
  );
}

function list() {
  return new Promise(resolve =>
    fs.readFile(fileName, 'utf8', (err, data) => resolve(err ? '' : data)),
  );
}

function reset() {
  return new Promise((resolve, reject) =>
    fs.writeFile(fileName, ``, (err, data) => (err ? reject(err) : resolve(data))),
  );
}

function help() {
  console.log(`Usage: node index.js [options]

To-Do App

Options:

  read            read all to-dos
  write [to-do]   add to-do
  reset           remove all to-dos
  remove          remove a specific item in to-dos by passing a index number
  help            show this help text
  `);
}
