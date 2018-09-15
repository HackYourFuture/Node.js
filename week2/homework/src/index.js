'use strict';
let fs = require('fs');
let order = process.argv[2];
let orderDefinition = process.argv[3];
let orderDefinition2 = process.argv[4];

fs.readFile('./toDo.json', 'utf8', function (error, data) {
  if (error) {
    console.log(error);
  }
  else {
    let myToDoList = JSON.parse(data);

    function help() {
      fs.readFile('./help.txt', 'utf8', function (error, data) {
        if (error) {
          console.log(error);
        }
        else {
          console.log(data);
        }
      }
      );
    };

    function list() {
      function isEmpty(myToDoList) {
        if (Object.values(myToDoList).length === 0) {
          return true;
        }
        return false;
      }
      if (isEmpty(myToDoList)) {
        console.log('You have not any plan in your To Do List');
      }
      else {
        console.log(myToDoList);
      }
    };

    function add(orderDefinition, orderDefinition2) {
      let toDoDate = orderDefinition2.toLocaleDateString();
      myToDoList[Object.keys(myToDoList).length + 1] = orderDefinition + ' ' + toDoDate;
      fs.writeFile(
        './toDo.json',
        JSON.stringify(myToDoList),
        (error) => {
          if (error) { console.log(error); }
        });
    };

    function remove(orderDefinition) {
      delete myToDoList[orderDefinition];
      fs.writeFile(
        './toDo.json',
        JSON.stringify(myToDoList),
        (error) => {
          if (error) { console.log(error); }
        });
    };

    function reset() {
      fs.writeFile(
        './toDo.json',
        '{}',
        (error) => {
          if (error) { console.log(error); }
        });
    };

    function update(orderDefinition, orderDefinition2) {
      myToDoList[orderDefinition] = orderDefinition2;
      fs.writeFile(
        './toDo.json',
        JSON.stringify(myToDoList),
        (error) => {
          if (error) { console.log(error); }
        });
    };

    switch (order) {
      case 'help':   // help shows help section
        help();
        break;
      case undefined:   // no command shows help section
        help();
        break;
      case 'list':     // Shows current to-dos, or shows an appropriate text if there are no to-dos
        list();
        break;
      case 'add':   // All the words behind add are entered as 1 to-do item to the list.
        add(orderDefinition, orderDefinition2);
        break;
      case 'remove':  // Removes a to-do item by its 1-base index, e.g. to remove second item, execute:
        remove(orderDefinition);
        break;
      case 'reset':  // Removes all to-do items from the list:
        reset();
        break;
      case 'update':  // Updates a to-do item with new text: node index.js update 3 "Brush teeth"
        update(orderDefinition, orderDefinition2);
        break;
      default:
        console.log('Please use a valid code which you can find at below!!!');
        help();
    }
  }
});
