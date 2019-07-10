const fs = require('fs');

function remove(index) {
  fs.readFile('./src/data.json', 'utf8', (error, data) => {
    if (error) throw error;
    if (Number.isInteger(Number(index)) && index > 0) {
      const array = data.split('\n');
      const removedItem = array[index - 1];
      array.splice(index - 1, 1);
      const newData = array.join('\n');

      fs.writeFile('./src/data.json', newData, error => {
        if (error) throw error;
        console.log(`${removedItem} removed from the todo list`);
      });
    } else {
      console.log(`The index should be an integer`);
    }
  });
}

module.exports = remove;
