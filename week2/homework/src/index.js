'use strict';
const fs = require('fs');
const command = process.argv[2];
const commandExpression = process.argv[3];
const newToDo = process.argv[4];

function help() {
  fs.readFile('./help.txt', 'utf8', function (error, data) {
    if (error) {
      return console.log(error);
    }
    console.log(data);
  });
};

function list() {
  fs.readFile('./toDo.json', 'utf8', function (error, data) {
    if (error) {
      return console.log(error);
    }
    const myToDoList = JSON.parse(data);
    if (Object.values(myToDoList).length === 0) {
      return console.log('You have not any plan in your To Do List');
    }
    console.log(myToDoList);
  });
};

function add(commandExpression) {
  fs.readFile('./toDo.json', 'utf8', function (error, data) {
    if (error) {
      return console.log(error);
    }

    const myToDoList = JSON.parse(data);
    const newToDoItem = {
      'index': myToDoList.length,
      'description': commandExpression
    };
    myToDoList.push(newToDoItem);
    fs.writeFile(
      './toDo.json',
      JSON.stringify(myToDoList),
      function (error) {
        if (error) {
          console.error(error);
        }
      }
    );
  });
}

function remove(commandExpression) {
  fs.readFile('./toDo.json', 'utf8', function (error, data) {
    if (error) {
      return console.log(error);
    }
    if (commandExpression < 0) {
      return console.log('The parameter you entered as index is invalid');
    }

    const myToDoList = JSON.parse(data);
    myToDoList.splice(commandExpression, 1);
    myToDoList.forEach(function (x) {
      x.index = myToDoList.indexOf(x);
    });
    fs.writeFile(
      './toDo.json',
      JSON.stringify(myToDoList),
      (error) => {
        if (error) { console.log(error); }
      }
    );
  });
}

function reset() {
  fs.writeFile(
    './toDo.json',
    '[]',
    (error) => {
      if (error) { console.log(error); }
    }
  );
};

function update(commandExpression, newToDo) {
  fs.readFile('./toDo.json', 'utf8', function (error, data) {
    if (error) {
      return console.log(error);
    }
    if (commandExpression < 0) {
      return console.log('The parameter you entered as index is invalid');
    }

    const myToDoList = JSON.parse(data);
    myToDoList[commandExpression].description = newToDo;
    fs.writeFile(
      './toDo.json',
      JSON.stringify(myToDoList),
      (error) => {
        if (error) { console.log(error); }
      }
    );
  });
}

switch (command) {
  case 'list':     // Shows current to-dos, or shows an appropriate text if there are no to-dos
    list();
    break;
  case 'add':   // All the words behind add are entered as 1 to-do item to the list.
    add(commandExpression);
    break;
  case 'remove':  // Removes a to-do item by its 1-base index, e.g. to remove second item, execute:
    remove(commandExpression);
    break;
  case 'reset':  // Removes all to-do items from the list:
    reset();
    break;
  case 'update':  // Updates a to-do item with new text: node index.js update 3 "Brush teeth"
    update(commandExpression, newToDo);
    break;
  case 'help':   // help shows help section
  default:    // no command shows help section
    console.log('Please use a valid code which you can find at below!!!');
    help();
}
