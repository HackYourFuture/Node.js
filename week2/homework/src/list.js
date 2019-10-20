'use strict';

const fs = require('fs');

const list = () => {
  fs.readFile('./to-do.txt', 'utf8', (err, data) => {
    if (err) {
      console.log(err);
    }
 else if (data === '') {
      console.log('There is nothing in to-do list!');
    }
 else {
      let newData = data.split('\n');
      newData.pop();
      newData = newData.join('\n');
      console.log(newData);
    }
  });
};

module.exports = list;
