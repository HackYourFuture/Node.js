const fs = require('fs');

function update(toDoItem, newValue) {
  fs.readFile('./toDo.json', 'utf8', (error, data) => {
    if (error) {
      console.log(error);
    } else {
      const parsedData = JSON.parse(data);
      toDoItem--;
      if (isNaN(toDoItem)) {
        console.log('please inter a number.');
      } else if (toDoItem > parsedData.length || toDoItem < 0) {
        console.log('There is no such a line');
      } else {
        parsedData[toDoItem] = newValue;
        const jsonData = JSON.stringify(parsedData, null, 2);
        fs.writeFile('./toDo.json', jsonData, error => {
          if (error) {
            console.log(error);
          } else {
            console.log(newValue + ' The file has been updated.');
          }
        });
      }
    }
  });
}
module.exports = update;
