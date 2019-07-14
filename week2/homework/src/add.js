const fs = require('fs');
function add(toDoText) {
  fs.appendFile('./toDoList.txt', toDoText + '\n', error => {
    if (error) {
      console.log(error);
    } else {
      console.log('added in your toDoList');
    }
  });
}

module.exports = add;
