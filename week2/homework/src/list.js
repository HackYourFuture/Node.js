const fs = require('fs');
function list() {
  fs.readFile('./toDoList.txt', 'utf8', (error, file) => {
    if (error) {
      console.log('There is toDoList file.');
    } else {
      console.log(file);
    }
  });
}

module.exports = list;
