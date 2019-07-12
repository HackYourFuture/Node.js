const fs = require('fs');

function add(toDoItem) {
  fs.readFile('./toDo.json', 'utf8', (error, data) => {
    if (error) {
      console.log(error);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(toDoItem);
      const jsonData = JSON.stringify(parsedData, null, 2);
      console.log(toDoItem + ' You added to the list.');
      fs.writeFile('./toDo.json', jsonData, error => {
        if (error) {
          console.log(error);
        }
      });
    }
  });
}
module.exports = add;
