'use strict';

// TODO: Write the homework code in this file
const fs = require('fs');
let command = process.argv[2];
let command1 = process.argv[3];
function readFiles(fileName) {
  const file = fs.readFileSync(fileName, 'utf8');
  return file;
}
function writeFiles(fileName, data) {
  const file = fs.writeFileSync(fileName, data);
  return file;
}
let add = targetedFile => {
  readFiles(targetedFile);
  fs.appendFileSync(targetedFile, `${command1}\n`);
  return command1;
};

let list = targetedFile => {
  let file = readFiles(targetedFile);
  console.log(file);
};

let remove = targetedFile => {
  let file = readFiles(targetedFile);
  let arr = file.split('\n');
  if (command1 > arr.length) {
    console.log(`check please the number of the to-dos
    ---------------------------`);
    list();
  }
 else {
    arr.splice(command1 - 1, 1).join('\n');
    console.log(arr);
    writeFiles(targetedFile, arr.join('\n'));
  }
};
let reset = targetedFile => {
  return writeFiles(targetedFile, '');
};
switch (command) {
  case 'help':
    console.log(
      `welcome to the CLI to-dos list, you can use the following command :
       1- list (to view the to-do list)
       2- add (add to the list) 
       3- remove (to remove one of the to-do) 
       4- reset (to remove all)`
    );
    break;
  case 'list':
    console.log(list('todo.txt'));
    break;
  case 'add':
    console.log(add('todo.txt'));
    break;
  case 'remove':
    remove('todo.txt');
    break;
  case 'reset':
    console.log(reset('todo.txt'));
    break;
}
