'use strict';

const fs = require('fs');
const fileName = `${__dirname}/todoList.txt`;

const command = process.argv[2];
const number = process.argv[3];
const args = process.argv.slice(3);

if (command === 'add') {
  add(...args).then(() => console.log(`a new item has been added`));
} else if (command === 'help' || command === undefined) {
  help();
} else if (command === 'list') {
  list().then(data => console.log(`To-Dos:\n${data}`));
} else if (command === 'remove') {
  remove(number);
} else if (command === 'reset') {
  reset().then(() => console.log('All to-do items has been deleted'));
} else if (command === 'update') {
  const newItem = process.argv.slice(4);
  update(number, newItem);
} else {
  console.log('please write a valid command or look at help list');
}

async function update(index, text) {
  try {
    const data = await list();
    const arr = data.split('\n');

    if (index <= arr.length && index > 0) {
      arr.splice(index - 1, 1, text);
      write(arr).then(console.log('an item has been modified'));
    } else {
      console.log('invalid number');
    }
  } catch (err) {
    console.error(err);
  }
}

async function remove(index) {
  try {
    const data = await list();
    const arr = data.split('\n');
    if (index <= arr.length && index > 0) {
      arr.splice(index - 1, 1);
      write(arr).then(console.log('an item has been removed'));
    } else {
      console.log('invalid number');
    }
  } catch (err) {
    console.error(err);
  }
}

function write(arr) {
  return new Promise((resolve, reject) =>
    fs.writeFile(fileName, arr.join('\n'), (err, data) => (err ? reject(err) : resolve(data))),
  );
}

function add(...text) {
  return new Promise((resolve, reject) =>
    fs.appendFile(fileName, text.join(' ') + '\n', (err, data) =>
      err ? reject(err) : resolve(data),
    ),
  );
}

function list() {
  return new Promise(resolve =>
    fs.readFile(fileName, 'utf8', (err, data) => (err ? reject(err) : resolve(err ? '' : data))),
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

  add             add new item to the to-dos
  list            read all to-dos
  reset           remove all to-dos
  remove          remove a specific item in to-dos by passing a index number
  help            show this help text
  update          change specific item from to-dos depended on a passed number 
  `);
}
