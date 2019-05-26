'use strict';

// TODO: Write the homework code in this file

let fs = require('fs');

let args = process.argv.slice(2);

let command = args[0];
let todoItem = args[1];



if(command === 'add') {
  add(todoItem);
} else if (command === 'help'){
  help();
} else if (command === 'list') {
  list(todoItem);
} else if (command === 'remove') {
  remove(todoItem);
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
    console.error(error);
  });
};

function remove(todoItem){
  fs.readFile('./todoList.txt', 'utf8', (err, data) => {
    if (err) {
      throw err;
    } else {      
      let dataArray = data.split('\n');
      
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

const helpText = "type <help> for listing functions\n     <list> for listing items\n     <add> for adding items\n     <remove index> for removing an item of a specific index. ";

function help() {
  console.log(helpText);
};