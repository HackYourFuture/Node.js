const fs = require('fs');
function reset() {
  fs.readFile('./toDoList.txt', 'utf8', (error, contents) => {
    if (error) {
      console.log('There is no toDoList');
    } else {
      fs.truncate('./toDoList.txt', 0, function() {
        console.log('done');
      });
    }
  });
}

module.exports = reset;
