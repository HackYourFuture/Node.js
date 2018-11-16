'use strict';
// TODO: Write the homework code in this file

const fs = require("fs");

const help = [
  "Run 'list' to show the current To-Do list, the item must be inside quotes ' '.",
  "Run 'add' and then the Item you want to add to a To-Do list, the item must be inside quotes ' '.",
  "Run 'remove' and then the Item then the item's Number to remove item from To-Do list, the item must be inside quotes ' '.",
  "Run 'reset' to remove all To-Do items from the list, the item must be inside quotes ' '.",
  "Run 'update' and then the item's Number you want to update in To-Do list then New Text, the item must be inside quotes ' '."
];

let command = process.argv[2];
let index = process.argv[process.argv.length - 2];
let item = process.argv[process.argv.length - 1];
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

function writeData(data) {
  fs.writeFile("to-dos.json", data, (err) => {
    if (err) {
      console.log("There is something wrong happened, try again");
    } else {
      console.log("Done");
    }
  });
}

function appendItem(item) {
  toDos.push({ task: item });
  let data = JSON.stringify(toDos, null, 2);
  writeData(data);
}

function removeItem(index) {
  if (index > toDos.length || !Boolean(Number(index))) {
    console.log("The item you are trying to remove is not existing");
  } else {
    toDos.splice(index - 1, 1);
    let data = JSON.stringify(toDos, null, 2);
    writeData(data);
  }
}

function updateItem(index, item) {
  if (index <= toDos.length) {
    toDos.splice(index - 1, 1, { task: item });
    let data = JSON.stringify(toDos, null, 2);
    writeData(data);
  } else {
    console.log("The item you are trying to update is not existing");
  }
}

function deleteList() {
  toDos.length = 0;
  let data = JSON.stringify(toDos, null, 2);
  writeData(data);
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