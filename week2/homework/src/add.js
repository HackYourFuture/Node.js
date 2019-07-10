const fs = require('fs');

function add(todoText) {
  fs.appendFile('./src/data.json', todoText + '\n', error => {
    if (error) throw error;
    console.log(`${todoText} added to the list`);
  });
}

module.exports = add;
