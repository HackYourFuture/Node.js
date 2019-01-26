'use strict';
// TODO: Write the homework code in this file

const fs = require('fs');
const command = process.argv[2]
const item = process.argv[3];
const commandUpdate = process.argv[4];

switch(command) {
  case 'add':
      add(item)
      break;
  case 'remove':
      deleteTask(item)
      break;
  case 'list':
      listItems(item)
      break;
  case 'reset':
      reset();
      break;
  case 'help':
  default:
  console.log(`Each command is supposed to be preceded by "node . "
  You have the following commands at your disposal:
  -- add        add items to list :
   Adds a to-do item in your list(to-do.txt). Use quotation marks in order to add more than one word!',
  -- remove     Removes a to-do item according to its index
  -- reset      Removes all to-do items.
  -- list       Shows the list of items
  -- help       Show  information of cli commands`)
     
}


function add(task) {
  fs.appendFile('./to-do.txt', task + '\n', function (error) {
      if (error) {
      console.log(error)
      }
  })
}

function deleteTask(index) {
  fs.readFile('./to-do.txt', 'utf8', function (error, data){
      if (error) {
          console.log(error)
      } else {
          let arrayFromData = data.split('\n');
          arrayFromData.splice(index-1, 1);
          let correctedList = arrayFromData.join('\n');
          fs.writeFile(to_doList, correctedList, function(error){
              if (error) {
                  console.log(error)
              }
          })
      }
  })
}

function listItems() {
  fs.readFile('./to-do.txt', 'utf8', function (error, data) {
      if (error) {
          console.log(error);
      } else if (data === '') {
          console.log('no task is added');
      } else {
          console.log(data);
      }
  })
}
function reset(){
  fs.writeFile('./to-do.txt', '', (error) => {
      if (error) {
          console.log(error)
      }
  })
}
