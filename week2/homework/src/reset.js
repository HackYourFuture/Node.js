const fs = require('fs');

function reset(todoItem) {
  fs.writeFile('./todoList.txt', '', err => {
    if (err) throw err;
    console.log('All the Items in the list was removed');
  });
}

module.exports = reset;
