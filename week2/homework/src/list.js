const fs = require('fs');

function list() {
  fs.readFile('./src/data.json', 'utf8', (error, data) => {
    if (error) {
      console.log(error);
    } else if (data) {
      console.log(data);
    } else if (!data) {
      console.log('There is not a ToDo list!');
    }
  });
}
module.exports = list;
