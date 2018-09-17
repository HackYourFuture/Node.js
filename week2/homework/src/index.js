'use strict';
const fs = require('fs');
const command = process.argv[2];
const commandFirstItem = process.argv[3];
const newData = process.argv[4];

function help() {
  fs.readFile('./help.txt', 'utf8', function (error, data) {
    if (error) {
      console.log(error);
    }
    else {
      console.log(data);
    }
  });
};

function list() {
  fs.readFile('./toDo.json', 'utf8', function (error, data) {
    if (error) {
      console.log(error);
    }
    else {
      const myToDoList = JSON.parse(data);
      if (Object.values(myToDoList).length === 0) {
        console.log('You have not any plan in your To Do List');
      }
      else {
        console.log(myToDoList);
      }
    }
  });
};

function add(commandFirstItem) {
  fs.readFile('./toDo.json', 'utf8', function (error, data) {
    if (error) {
      console.log(error);
    }
    else {
      const myToDoList = JSON.parse(data);
      const index = Object.keys(myToDoList).length + 1;
      myToDoList[index] = commandFirstItem;
      fs.writeFile(
        './toDo.json',
        JSON.stringify(myToDoList),
        function (error) {
          if (error) {
            console.error(error);
          }
        }
      );
    }
  });
}

function remove(commandFirstItem) {
  fs.readFile('./toDo.json', 'utf8', function (error, data) {
    if (error) {
      console.log(error);
    }
    else {
      const myToDoList = JSON.parse(data);
      if (commandFirstItem >= 1) {
        delete myToDoList[parseInt(commandFirstItem)];
        fs.writeFile(
          './toDo.json',
          JSON.stringify(myToDoList),
          (error) => {
            if (error) { console.log(error); }
          });
      }
      else {
        console.log('The parameter you entered as index is invalid');
      }
    }
  });
}

function reset() {
  fs.writeFile(
    './toDo.json',
    '{}',
    (error) => {
      if (error) { console.log(error); }
    }
  );
};

function update(commandFirstItem, newData) {
  fs.readFile('./toDo.json', 'utf8', function (error, data) {
    if (error) {
      console.log(error);
    }
    else {
      const myToDoList = JSON.parse(data);
      if (commandFirstItem > 0) {
        myToDoList[commandFirstItem] = newData;
        fs.writeFile(
          './toDo.json',
          JSON.stringify(myToDoList),
          (error) => {
            if (error) { console.log(error); }
          }
        );
      }
      else {
        console.log('The parameter you entered as index is invalid');
      }
    }
  });
}

switch (command) {
  case 'list':     // Shows current to-dos, or shows an appropriate text if there are no to-dos
    list();
    break;
  case 'add':   // All the words behind add are entered as 1 to-do item to the list.
    add(commandFirstItem);
    break;
  case 'remove':  // Removes a to-do item by its 1-base index, e.g. to remove second item, execute:
    remove(commandFirstItem);
    break;
  case 'reset':  // Removes all to-do items from the list:
    reset();
    break;
  case 'update':  // Updates a to-do item with new text: node index.js update 3 "Brush teeth"
    update(commandFirstItem, newData);
    break;
  case 'help':   // help shows help section
  default:    // no command shows help section
    console.log('Please use a valid code which you can find at below!!!');
    help();
}
