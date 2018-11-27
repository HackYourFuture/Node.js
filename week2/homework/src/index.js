'use strict';
// TODO: Write the homework code in this file

const fs = require("fs");

const help = [
  "list - It shows all the items in the list.",
  "add 'todo item' - It adds 'todo item' to the list.",
  "update 2 'other todo item' - It updates item at index 2 with 'other todo item'.",
  "remove 2 - It removes item at index 2.",
  "reset - It clears the list and deletes all the items."
];

let command = process.argv[2];
let index = process.argv[3];
let item = process.argv[4];
let argvLen = process.argv.length;
const file = fs.readFileSync("./to-dos.json", "utf8");
let toDos = JSON.parse(file);

function helpMe() {
  help.forEach(el => console.log(el));
}

function showList() {
  if (toDos[0]) {
    toDos.forEach((el, i) => console.log(`${i + 1}- ${el.task}`));
  } else {
    console.log("the to-Do list is empty");
  }
}

function writeData(json) {
  let data = JSON.stringify(json, null, 2);
  fs.writeFile("to-dos.json", data, (err) => {
    if (err) {
      console.error("Something wrong happened, try again!", err);
    } else {
      console.log("The item has been edited successfully.");
    }
  });
}

function appendItem(item) {
  toDos.push({ task: item });
  writeData(toDos);
}

function removeItem(index) {
  if (index > toDos.length || !Boolean(Number(index))) {
    console.log("The item you are trying to remove is not existing");
  } else {
    toDos.splice(index - 1, 1);
    writeData(toDos);
  }
}

function updateItem(index, item) {
  if (index <= toDos.length) {
    toDos.splice(index - 1, 1, { task: item });
    writeData(toDos);
  } else {
    console.log("The item you are trying to update is not existing");
  }
}

function deleteList() {
  toDos.length = 0;
  writeData(toDos);
}

function renderCommand() {
  if (argvLen < 5) {
    switch (command) {
      case "add":
        appendItem(item);
        break;
      case "remove":
        removeItem(item);
        break;
      default:
        console.log(`${command} is not a command`);
        helpMe();
    }
  } else if (argvLen < 6 && command === "update") {
    updateItem(index, item);
  } else {
    helpMe()
  }
}

if (argvLen < 4 && command === "help" || argvLen < 3) {
  helpMe()
} else if (argvLen < 4) {
  switch (command) {
    case "add":
    case "remove":
    case "update":
      console.log("you did not specify an item to add, remove or update!");
      break;
    case "reset":
      deleteList();
      break;
    case "list":
      showList();
      break;
    default:
      console.log(`${command} is not a command`);
  }
} else {
  renderCommand();
}