'use strict';

const fs = require('fs');
const reset = () => {
  const resetData = '';
  fs.writeFile('./to-do.txt', resetData, err => {
    if (err) {
      console.log(err);
    }
 else {
      console.log('The to-do list has been reset!');
    }
  });
};

module.exports = reset;
