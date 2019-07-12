const fs = require('fs');

function remove(toDoItem) {
  fs.readFile('./toDo.txt', 'utf8', (error, data) => {
    if (error) {
      console.log(error);
    } else {
      const result = data.split('\n');
      console.log(typeof toDoItem);
      const test = toDoItem - 1;
      console.log(test);
      console.log(result);
      if (isNaN(test)) {
        console.log('please inter a number');
      } else if (test > result.length || test < 0) {
        console.log('There is no such a line');
      } else {
        const removed = result.splice(test, 1);
        const returnValue = result.join('\n');
        fs.writeFile('./toDo.txt', returnValue, error => {
          if (error) {
            console.log(error);
          } else {
            console.log(`${test + 1} has been removed.`);
          }
        });
      }
    }
  });
}

module.exports = remove;
