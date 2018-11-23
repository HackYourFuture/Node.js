'use strict';
const fs = require("fs");
const json = fs.readFileSync("./tasks.json", "utf-8");
const jsonData = JSON.parse(json);
let command = process.argv[2];
let value = process.argv[3];
let index = parseInt(value) - 1;
let updateTask = process.argv[4];

switch (command) {
  case 'list':
    listTasks();
    break;
  case 'add':
    addTask(value);
    break;
  case 'remove':
    removeTask(index);
    break;
  case 'reset':
    restTasks();
    break;
  case 'update':
    updateTasks(index, updateTask);
    break;
  case 'help':
  default:
    fs.readFile('./help.txt', 'utf8', function (error, data) {
      if (error) {
        console.error(error);
      } else {
        console.log(data);
      }
    });
}

function listTasks() {
  if (jsonData.length > 0) {
    for (let x = 0; x < jsonData.length; x++) {
      console.log(jsonData[x].task);
    }
  }
  else {
    console.log("No tasks to show");
  }
}

function addTask(value) {
  jsonData.push({ task: value });
  let newJsonData = JSON.stringify(jsonData);
  fs.writeFile('./tasks.json', newJsonData, function (error) {
    if (error) {
      console.error(error);
    }
  });
}
function removeTask(index) {
  if (index <= jsonData.length) {
    jsonData.splice(index, 1);
    let newJsonData = JSON.stringify(jsonData);
    fs.writeFileSync('tasks.json', newJsonData);
  }
  else {
    console.error("Please correct line number");
  }
}
function restTasks() {
  jsonData.splice(0, jsonData.length);
  let newJsonData = JSON.stringify(jsonData);
  fs.writeFileSync('tasks.json', newJsonData);
}
function updateTasks(index, updateTask) {
  if (index <= jsonData.length) {
    jsonData.splice(index, 1, { task: updateTask });
    let newJsonData = JSON.stringify(jsonData);
    fs.writeFileSync('tasks.json', newJsonData);
  }
  else {
    console.error("Please correct line number");
  }
}

