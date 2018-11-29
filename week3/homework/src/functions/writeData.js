'use strict';
const fs = require('fs');

const writeData = function (data) {
  let string = JSON.stringify(data);
  fs.writeFile('./toDoList.json', string, err => {
    if (err) {
      console.log('Not found');
    }
  })
}

module.exports = writeData;