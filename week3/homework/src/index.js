'use strict';
//JSON.parse(content).number
//JSON.stringify(obj)

// TODO: Write the homework code in this file
const fs = require('fs');
const uuidv4 = require('uuid-v4');


let toDoList = [];
readToDoFile();
if (control()) {

  switch (process.argv[2]) {
    case 'help':
      console.log("Usage of the program:");
      console.log("1. node index.js help");
      console.log("2. node index.js list");
      console.log("3. node index.js add \"Buy groceries\"");
      console.log("4. node index.js remove 2");
      console.log("5. node index.js reset");
      console.log("6. node index.js update 3 'Brush teeth'");
      break;
    case 'list':
      getToDo();
      break;
    case 'add':
      addToDo();
      break;
    case 'remove':
      removeToDo(process.argv[3]);
      break;
    case 'reset':
      while (toDoList.length > 0) {
        removeToDo(toDoList.length - 1);
      }
      break;
    case 'update':
      updateToDo();
      break;
    default:
      console.log('Wrong choice');
  }
}
//CLI
function control() {
  try {
    if (process.argv.length < 3) {
      throw new Error("You entered insufficient argument.");
      //console.log("You entered insufficient argument.");
    } else if (process.argv[2] === 'add' || process.argv[2] === 'remove') {
      if (process.argv.length < 4) {
        throw new Error("You entered insufficient argument.");
        //console.log("You entered insufficient argument.");
      } else if (process.argv[2] === 'remove') {
        if (parseInt(process.argv[3]) > toDoList.length) {
          throw new Error("Your list doesn't include this index.");
        }
      }
    }
  } catch (error) {
    console.log('Enter correctly please. ' + error);
    return false;
  }
  return true;
}
//CLI
function addToDo() {
  let item = '';
  for (let i = 3; i < process.argv.length; i++) {
    item += process.argv[i];
  }
  toDoList.push({ name: item });
  updateFile();
}
//CLI
function updateToDo() {
  let index = parseInt(process.argv[3]);
  let item = '';
  for (let i = 4; i < process.argv.length; i++) {
    item += process.argv[i];
  }
  toDoList[index - 1] = { name: item };
  updateFile();
}
//CLI
function removeToDo(index) {
  toDoList.splice(index, 1);
  updateFile();
}

function getToDo() {
  if (toDoList.length > 0) {
    for (let i = 0; i < toDoList.length; i++) {
      console.log(toDoList[i].name);
    }
  } else {
    console.log("You don't have to do anything");
  }
}
/*Read From File*/
function readToDoFile(indexToDo) {
  let content = fs.readFileSync('./toDo.txt', "utf-8");
  if (content !== "") {
    toDoList = JSON.parse(content);
  }
  if (toDoList.length === 0)
    return "You don't have to do anything";
  if (indexToDo == undefined)
    return toDoList;
  return toDoList[indexToDo - 1];
}

function addToDoFromHTML(newItem) {
  readToDoFile();
  if (!newItem.hasOwnProperty('done')) {
    newItem.done = "false";
  }
  newItem.id = uuidv4();
  toDoList.push(newItem);
  updateFile();
  return 'New todo is added.';
}
//Index range starts from zero
function updateToDoFromHTML(todoId, newToDo) {
  const index = findIndexTodo(todoId);
  if (index !== -1) {
    toDoList[index].name = newToDo.name;
    toDoList[index].done = 'false';
    updateFile();
    return 'todo is successfully updated.';
  }
  return 'todo is not updated.';
}

function deleteToDoFromHTML(todoId) {

  if (todoId == undefined) {//Remove all items from list
    readToDoFile();
    while (toDoList.length > 0) {
      removeToDo(toDoList.length - 1);
    }
    return 'All todos are deleted.';
  } else {
    const index = findIndexTodo(todoId);
    if (index !== -1) {
      removeToDo(index);//Remove the item from list
      return 'Todo is successfully deleted.';
    }
    return 'Delete process is unsuccessful.';
  }

}

function upDateDone(todoId) {
  const index = findIndexTodo(todoId);
  if (index !== -1) {
    toDoList[index].done = true;
    updateFile();
    return 'Update process is successful.';
  }
  return 'Update process is not successful.';
}

function findIndexTodo(todoId) {//return index of todo that is searched
  readToDoFile();
  let index = -1;
  toDoList.forEach((todo, i) => {
    let currentTodoId = JSON.parse(JSON.stringify(todo)).id;
    if (currentTodoId === todoId) {
      index = i;
    }
  });
  return index;
}

function upDateNotDone(todoId) {
  const index = findIndexTodo(todoId);
  if (index !== -1) {
    toDoList[index].done = false;
    updateFile();
    return 'Update process is successful.';
  }
  return 'Update process is not successful.';
}

function updateFile() {
  try {
    fs.writeFileSync('./toDo.txt', JSON.stringify(toDoList));
  } catch (err) {
    /* Handle the error */
    console.log('File couldn\'t be updated. Err: ' + err);
  }
}
module.exports = {
  readToDoFile,
  addToDoFromHTML,
  updateToDoFromHTML,
  deleteToDoFromHTML,
  upDateDone,
  upDateNotDone
};
