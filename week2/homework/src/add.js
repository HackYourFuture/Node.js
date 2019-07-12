const fs = require('fs');

function add(toDoItem) {
  fs.appendFile('./toDo.txt', toDoItem + '\n', error => {
    if (error) {
      console.log(error);
    } else {
      console.log(toDoItem + ' You added to the list.');
    }
  });
}
module.exports = add;
