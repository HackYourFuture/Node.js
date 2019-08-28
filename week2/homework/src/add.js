const fs = require('fs');

function add(todoTask) {
  if (todoTask === undefined) {
    console.log('Please fill in a legitimate task to add');
  } else {
    fs.appendFile('./data.txt', `${todoTask}\n`, error => {
      if (error) throw error;
    });
    console.log(`${todoTask} added to the list`);
  }
}

module.exports = add;
