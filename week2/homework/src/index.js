/* It is a Node.js command line application
The user must be able to run the file using node index.js or node . in the project directory
There must be a help section that lists all the commands and a short description for each of them
The user must be able to add, remove and list to-dos.
The user must be able to remove all to-dos at once.
The functions are: 
  add();
  help();
  list();
  remove();
  reset();
  help();
*/
let fs = require('fs');
let args = process.argv.slice(2);
// takes only two args after the . in the command line
let command = args[0];
// the 1st arg is the command that calls the meant function
let todoItem = args[1];
// the 2nd arg is the item we are dealing with of a number of its position

if (command === 'add') {
  add(todoItem);
} else if (command === 'help') {
  help();
} else if (command === 'list') {
  list();
} else if (command === 'remove') {
  remove(todoItem);
} else if (command === 'reset') {
  reset();
} else if (command === 'help' || !command) {
  help();
}

function list() {
  fs.readFile('./todoList.txt', 'utf8', (error, todoList) => {
    if (error) {
      if (error.code === 'ENOENT') {
        console.log('no data found');
      } else {
        console.log(error);
      }
    } else {
      console.log(todoList);
    }
  });
}
function add(todoItem) {
  fs.appendFile('./todoList.txt', todoItem + '\n', error => {
    if (error) {
      console.error(error);
    } else {
      console.log(`[${todoItem}] was added`);
    }
  });
}
function remove(index) {
  fs.readFile('./todoList.txt', 'utf8', (error, todoList) => {
    if (error) {
      if (error.code === 'ENOENT') {
        console.log('no data found');
      } else {
        console.log(error);
      }
    } else {
      const splitList = todoList.split('\n');
      // make the list an array of lines
      const position = index + 1;
      const newList = splitList.filter(elem => elem !== position);
      newList.join('\n');
      // join the new list as a normal list
      console.log(newList);
      console.log(splitList);
      fs.writeFile('./todoList.txt', newList, error => console.error(error));
    }
  });
}
function reset() {
  fs.writeFile('./todoList.txt', '', (error, todoList) => {
    if (error) {
      if (error.code === 'ENOENT') {
        console.log('no data found');
      } else {
        console.log(error);
      }
    } else {
      console.log(`Rest!
      Nothing to be done in the list`);
    }
  });
}
function help() {
  fs.readFile('./todoList.txt', 'utf8', error => {
    if (error) {
      if (error.code === 'ENOENT') {
        console.log('no data found');
      } else {
        console.log(error);
      }
    } else {
      console.log(`Tip: You did not enter any command, 
      you can enter one of the following commands:

      * node index.js list
      Shows current to-dos, or shows an appropriate text if there are no to-dos
      
      * node index.js add "Buy groceries"
      Adds a to-do item. All the words behind add are entered as 1 to-do item to the list.
           
      * node index.js remove (number)
      Removes a to-do item by its 1-base index.
      
      * node index.js reset
      Removes all to-do items from the list`);
    }
  });
}
