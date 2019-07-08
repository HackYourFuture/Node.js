const fs = require('fs');

function help(toDoList) {
  fs.readFile('./help.txt', (err, data) => {
    if (err) {
      console.log('there is an error');
    }
 else {
      console.log(data);
    }
  });
}
module.exports = help;
