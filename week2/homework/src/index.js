'use strict';
let fs = require('fs');

let args = process.argv.slice(2);

let command = args[0];
let item = args[1];

function list() {
  fs.readFile('./todoList.txt', 'utf8', (error, data) => {
    if (error) {
      if (error.code === 'ENOENT') {
        console.log('no data found');
      }
      console.error(error);
    } else {
      console.log(data);
    }
  });
}

function add(item) {
  fs.appendFile('./todoList.txt', '\n' + item, error => {
    if (error) console.error(error);
  });
}

if (command === 'add') {
  add(item);
} else if (command === 'help') {
  help();
} else if (command === 'list') {
  list();
} else if (command === 'remove') {
  remove();
} else if (command === 'reset') {
  reset();
}
