'use strict';

const fs = require('fs');
let command = process.argv[2];
let value = process.argv[3];
let listFile = fs.readFileSync('./data.json', 'utf8');
let listArr = JSON.parse(listFile);

switch (command) {
  case 'list':
    viewTasks();
    break;
  case 'add':
    addTask();
    break;
  case 'help':
  case undefined:
    let helpFile = fs.readFileSync('./help.txt', 'utf8');
    console.log(helpFile);
    break;
  case 'remove':
    removeTask(value);
    break;
  case 'reset':
    clearTasks();
    break;

  case 'update':
    updateTasks(value);
    break;

  default:
    console.log('wrong command check the help menu by typing help');
}

function viewTasks() {
  if (!listArr || listArr.length == 0) {
    console.log('no toDos sorted');
  } else {
    listArr.forEach(element => {
      console.log(element);
    });
  }
}

function addTask() {
  if (process.argv.length < 4) {
    console.log('check the help menu by typing help');
  } else {
    let taskLine = '';
    for (let i = 3; i <= process.argv.length - 1; i++) {
      taskLine += process.argv[i] + ' ';
    }
    listArr.push(taskLine);
    fs.writeFile('./data.json', JSON.stringify(listArr, null, 2), err => {
      if (err) throw err;
    });
  }
}

function removeTask(i) {
  if (i > listArr.length || i == 0) {
    console.log('not existed task type list to view existed tasks (starting index is 1) ');
  } else if (process.argv.length < 4) {
    console.log(' check the help menu by typing help');
  } else {
    listArr.splice(i - 1, 1);
    fs.writeFile('./data.json', JSON.stringify(listArr), err => {
      if (err) throw err;
    });
  }
}

function clearTasks() {
  listArr = '[]';
  fs.writeFile('./data.json', listArr, err => {
    if (err) throw err;
  });
}

function updateTasks(i) {
  if (i > listArr.length || i == 0) {
    console.log('not existed task type list to view existed tasks (starting index is 1)');
  } else if (process.argv.length < 5) {
    console.log(' check the help menu by typing help');
  }
  let taskLine = '';
  for (let i = 4; i <= process.argv.length - 1; i++) {
    taskLine += process.argv[i] + ' ';
  }
  listArr.splice(i - 1, 1, taskLine);
  fs.writeFile('./data.json', JSON.stringify(listArr, null, 2), err => {
    if (err) throw err;
  });
}
