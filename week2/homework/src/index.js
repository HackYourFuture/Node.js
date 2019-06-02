/* It is a Node.js command line application
The user must be able to run the file using node index.js or node . in the project directory
There must be a help section that lists all the commands and a short description for each of them
The user must be able to add, remove and list to-dos.
The user must be able to remove all to-dos at once.
The functions are: 
  add();
  list();
  remove();
  update();
  reset();
  help();
  It should control what happens if user enters unexpected input, e.g. remove -100
*/
const fs = require('fs');
const error = require('./error');

const args = process.argv.slice(2);
// shows args starting from the . in the command line
const command = args[0];
// the 1st arg is the command that calls the meant function
const todoItem = args[1];
// the 2nd arg is the item we are dealing with of a number of its position
const newVal = args[2];
// the 3rd arg is the item's updated value
if (command === 'add') {
  add(todoItem);
} else if (command === 'list') {
  list();
} else if (command === 'remove') {
  remove(todoItem);
} else if (command === 'update') {
  update(todoItem, newVal);
} else if (command === 'reset') {
  reset();
} else if (command === 'help' || !command || todoItem <= 0 || todoItem > todoList.length) {
  help();
}

function list() {
  fs.readFile('./src/todoList.txt', 'utf8', (error, todoList) => {
    if (error) {
      error.e404(error);
    } else {
      console.log(todoList);
    }
  });
}
function add(todoItem) {
  fs.appendFile('./src/todoList.txt', todoItem + '\n', error => {
    // appendFile: creates the file if it does not exist already
    if (error) {
      console.error(error);
    } else {
      console.log(`[${todoItem}] was added`);
    }
  });
}

/* remove()
1. Read existing todoList.txt
2. Filter the item to be removed
3. Write new contents back to todoList.txt */
function remove(num) {
  fs.readFile('./src/todoList.txt', 'utf8', (error, todoList) => {
    if (error) {
      error.e404(error);
    } else {
        const splitList = todoList.split('\n');
      // make the list an array of lines
      if (num <= 0 || num > splitList.length) {
          help();
      } else {
          console.log(splitList.length)
          const newList = splitList.filter((elem, index) => index !== num - 1).join('\n');
          console.log(newList);
        fs.writeFile('./src/todoList.txt', newList, error => {
          if (error) {
            console.error(error);
            } else {
              console.log(newList);
            }
          });
      }
    }
  });
}
/* update()
1. Read existing todoList.txt
2. Map all the items to update the item
3. Write new contents back to todoList.txt */
function update(num, newVal) {
  fs.readFile('./src/todoList.txt', 'utf8', (error, todoList) => {
    if (error) {
      error.e404(error);
    } else {
      const splitList = todoList.split('\n');
        // make the list an array of lines
      if (num <= 0 || num > splitList.length) {
        console.log(splitList.length)
        help();
    } else {
          const newList = splitList
          .map((elem, index) => (index === num - 1 ? newVal : elem))
          .join('\n');
      fs.writeFile('./src/todoList.txt', newList, error => {
        if (error) {
          console.error(error);
        } else {
          console.log(newList);
        }
        });
        }
    }
  });
}
function reset() {
  fs.writeFile('./src/todoList.txt', '', (error, todoList) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`Rest!
      Nothing to be done in the list`);
    }
  });
}
function help() {
  fs.readFile('./src/todoList.txt', 'utf8', () => {
    console.log(`Please write a valid number and one of the following commands:
      * node index.js list
      Shows current to-dos, or shows an appropriate text if there are no to-dos
      
      * node index.js add "Buy groceries"
      Adds a to-do item. All the words behind add are entered as 1 to-do item to the list.
           
      * node index.js remove (number)
      Removes a to-do item by its 1-base index.
      * node index.js update 3 "Brush teeth"
      Updates a to-do item with new text
     
      * node index.js reset
      Removes all to-do items from the list`);
  })
}
