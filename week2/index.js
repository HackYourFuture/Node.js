const fs = require('fs');
 
 let toDo = [];
 switch (process.argv[2].toLowerCase()) {
      case 'help':
           fs.readFile('./help.txt', 'UTF-8', (err, data) => {
                console.log(data);
           });
           break;
      case 'list':
           toDo = require('./todo.json');
           for (i of toDo) {
                console.log(i.name)
           }
           break;
      case 'add':
           toDo = require('./todo.json');
           let temp = {
                name: process.argv[3]
           };
           toDo[toDo.length] = temp;
           fs.writeFile('./todo.json', JSON.stringify(toDo));
           break;
      case 'remove':
           toDo = require('./todo.json');
           toDo.splice(process.argv[3] - 1, 1);
           fs.writeFile('./todo.json', JSON.stringify(toDo));
           break;
      case 'reset':
           toDo = [];
           fs.writeFile('./todo.json', JSON.stringify(toDo));
           break;
      case 'update':
           toDo = require('./todo.json');
           toDo[process.argv[3]-1].name = process.argv[4];
           fs.writeFile('./todo.json', JSON.stringify(toDo));
           break;
 }