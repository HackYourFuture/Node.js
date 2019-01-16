'use strict';

// TODO: Write the homework code in this file
const fs = require('fs');
let command = process.argv[2];
let command1 = process.argv[3];
let add = () => {
  fs.readFileSync('todo.txt', 'utf8');
  fs.appendFileSync('todo.txt', `${command1}\n`);
  return command1;
};

let list = () => {
  let file = fs.readFileSync('todo.txt', 'utf8');
  console.log(file);
};

let remove = () => {
  let file = fs.readFileSync('todo.txt', 'utf8');
  let arr = file.split('\n');
  if (command1 > arr.length) {
    console.log(`check please the number of the to-dos
    ---------------------------`);
    list();
  }
 else {
    arr.splice(command1 - 1, 1).join('\n');
    console.log(arr);
    fs.writeFileSync('todo.txt', arr.join('\n'));
  }
};
let reset = () => {
  return fs.writeFileSync('todo.txt', '');
};

if (command === 'help') {
  console.log(
    `welcome to the CLI to-dos list, you can use the following command :
     1- list (to view the to-do list)
     2- add (add to the list) 
     3- remove (to remove one of the to-do) 
     4- reset (to remove all)`
  );
}
 else if (command === 'list') {
  console.log(list());
}
 else if (command === 'add') {
  console.log(add());
}
 else if (command === 'remove') {
  console.log(remove());
}
 else if (command === 'reset') {
  console.log(reset());
}
