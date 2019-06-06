'use strict';

const fs = require('fs');

const args = process.argv.slice(2);
const command = args[0];
const todoItem = args[1];

const helpText = `type <help> for listing functions
<list> for listing items
<add> for adding items
<remove index> for removing an item of a specific index.
`;

switch (command) {
  case 'list':
    list(todoItem);
    break;
  case 'add':
    add(todoItem);
    break;
  case 'remove':
    remove(todoItem);
    break;
  case 'help':
    help();
    break;
}
function list() {
  fs.readFile('./todoList.txt', 'utf8', (error, data) => {
    if (error) {
      console.log(error);
    } else {
      console.log(data);
    }
  });
}

function add(newItem) {
  fs.appendFile('./todoList.txt', newItem + '\n', error => {
    if (error) {
      console.error(error);
    } else {
      console.log('Item added.');
    }
  });
}

function remove(index) {
  fs.readFile('./todoList.txt', 'utf8', (err, data) => {
    if (err) {
      throw err;
    } else {
      const dataArrayOfStrings = data.split('\n');

      dataArrayOfStrings.splice(index - 1, 1);

      const finalData = dataArrayOfStrings.join('\n');

      fs.writeFile('./todoList.txt', finalData, err => {
        if (err) throw err;
        console.log(`Successfully deleted item no.${index} from to-do list.`);
        console.log(finalData);
      });
    }
  });
}

function help() {
  console.log(helpText);
}
