'use strict';

const fs = require('fs');

const update = (toDoNo, newItem) => {
  fs.readFile('./to-do.txt', 'utf8', (err, data) => {
    if (err) {
      console.log(err);
    }
 else {
      if (data === '') {
        console.log(`There is no item to update. Please add items.`);
      }
 else if (toDoNo > data.split('\n').length) {
        console.log(`Please write a number from 1 to ${data.split('\n').length}`);
      }
 else {
        let newData = data.split('\n');
        newData.splice(toDoNo - 1, 1, newItem);
        newData = newData.join('\n');

        fs.writeFile('./to-do.txt', newData, err => {
          if (err) {
            console.log(err);
          }
 else {
            console.log('Selected item updated!');
          }
        });
      }
    }
  });
};

module.exports = update;
