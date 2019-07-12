const fs = require('fs');

function remove(toDoItem) {
  fs.readFile('./toDo.json', 'utf8', (error, data) => {
    if (error) {
      console.log(error);
    } else {
      const parsedData = JSON.parse(data);
      const toRemove = toDoItem - 1;
      if (isNaN(toRemove)) {
        console.log('please inter a number');
      } else if (toRemove > parsedData.length || toRemove < 0) {
        console.log('There is no such a line');
      } else {
        const removed = parsedData.splice(toRemove, 1);
        const jsonData = JSON.stringify(parsedData, null, 2);
        fs.writeFile('./toDo.json', jsonData, error => {
          if (error) {
            console.log(error);
          } else {
            console.log(`${toRemove + 1} has been removed.`);
          }
        });
      }
    }
  });
}

module.exports = remove;
