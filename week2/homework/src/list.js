const fs = require('fs');

function list() {
  fs.readFile('./toDo.txt', 'utf8', (error, toDoList) => {
    if (error) {
      console.log(error);
    } else {
      if (toDoList == '') {
        console.log('The list is empty!...add some thing to the list');
      } else {
        console.log(toDoList);
      }
    }
  });
}

module.exports = list;
