'use strict';

// TODO: Write the homework code in this file
const fs = require('fs');
const json = fs.readFileSync('todo.json', 'utf-8');
const jsonData = JSON.parse(json);
let command = process.argv[2];
let value = process.argv[3];
let index = parseInt(value);
let updateTask = process.argv[4];

function todoList() {
  jsonData.forEach(elem => console.log(elem.task));
}

function add(value) {
  jsonData.push({ task: value });
  let newJsonData = JSON.stringify(jsonData);
  fs.writeFile('todo.json', newJsonData, function(error) {
    if (error) {
      console.log(error);
    }
  });
}

function remove(index) {
  if (index < jsonData.length) {
    jsonData.splice(index, 1);
    let newJsonData = JSON.stringify(jsonData);
    fs.writeFileSync('todo.json', newJsonData);
  } else {
    console.log('Please use a line number');
  }
}

function reset() {
  fs.writeFileSync('todo.json', JSON.stringify([]));
}

function update(index, updateTask) {
  if (index < jsonData.length) {
    jsonData.splice(index, 1, { task: updateTask });
    let newJsonData = JSON.stringify(jsonData);
    fs.writeFileSync('todo.json', newJsonData);
  } else {
    console.log('Please use a line number');
  }
}

switch (command) {
  case 'list':
    todoList();
    break;
  case 'add':
    add(value);
    break;
  case 'remove':
    remove(index);
    break;
  case 'reset':
    reset();
    break;
  case 'update':
    update(index, updateTask);
    break;
  case 'help':
  default:
    fs.readFile('help.txt', 'utf8', function(error, data) {
      if (error) {
        console.log(error);
      } else {
        console.log(data);
      }
    });
}
