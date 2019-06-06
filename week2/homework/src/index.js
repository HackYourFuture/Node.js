'use strict';

// TODO: Write the homework code in this file

const fs = require('fs');

const args = process.argv.slice(2);

const command = args[0];
const todoItem = args[1];

const helpText = "type <help> for listing functions\n     <list> for listing items\n     <add> for adding items\n     <remove index> for removing an item of a specific index. ";


if(command === 'add') {
  add(todoItem);
} else if (command === 'help'){
  help();
} else if (command === 'list') {
  list(todoItem);
} else if (command === 'remove') {
  remove(todoItem);
} else {
    console.log("Invalid command. See below for possible commands:");
    help();
};

function list(){
  fs.readFile('./todoList.txt', 'utf8', (error, todoList) => {
    if (error){
      console.log(error);
    } else {
      console.log(todoList);
    };
  });
};

function add(todoItem){
  fs.appendFile('./todoList.txt', todoItem + '\n', (error) => {
    if (error){
        console.error(error);
    } else {
        console.log("Item added.");
    };
  });
};

function remove(todoItem){
  fs.readFile('./todoList.txt', 'utf8', (err, data) => {
    if (err) {
      throw err;
    } else {      
      const dataArray = data.split('\n');
      
      dataArray.splice((todoItem-1),1);
          
      const updatedData = dataArray.join('\n');
      
      fs.writeFile('./todoList.txt', updatedData, (err) => {
        if (err) throw err;
        console.log (`Successfully deleted item no.${todoItem} from to-do list.`);
        console.log(updatedData);
       
      });
      
    };
  });
};


function help() {
  console.log(helpText);
};
