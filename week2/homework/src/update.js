const fs = require('fs');

function update(toDoItem, newValue) {
  //read todo.txt
  fs.readFile('./toDo.txt', 'utf8', (error, data) => {
    if (error) {
      console.log(error);
    } else {
      const result = data.split('\n');
      // make array from data
      // change the value of certain index
      toDoItem--;
      if (toDoItem > result.length) {
        console.log('There is no such a line');
      } else {
        result[toDoItem] = newValue;
        console.log(toDoItem);
        //make a string form an array
        const updated = result.join('\n');
        ///write todo.txt again
        fs.writeFile('./toDo.txt', updated, error => {
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
