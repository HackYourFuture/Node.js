const fs = require('fs');

function list() {
  fs.readFile('./todoList.txt', 'utf8', (error, todoList) => {
    if (error) {
      if (error.code === 'ENOENT') {
        console.log('nothing found');
      }
 else console.error(error);
    }
 else {
      console.log(todoList);
    }
  });
}

module.exports = list;
