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

const add = item => {
  fs.appendFile('./to-do.txt', item + '\n', err => {
    if (err) {
      console.log(err);
    }
 else {
      console.log('New item added!');
    }
  });
};

const remove = index => {
  fs.readFile('./to-do.txt', 'utf8', (err, data) => {
    if (err) {
      console.log(err);
    }
 else {
      if (index > data.split('\n').length) {
        console.log(`Please write a number from 1 to ${data.split('\n').length}`);
      }
 else {
        let newData = data.split('\n');
        newData.splice(index - 1, 1);
        newData = newData.join('\n');

        fs.writeFile('./to-do.txt', newData, err => {
          if (err) {
            console.log(err);
          }
 else {
            console.log('Selected item removed!');
          }
        });
      }
    }
  });
};

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

const update = (index, newItem) => {
  fs.readFile('./to-do.txt', 'utf8', (err, data) => {
    if (err) {
      console.log(err);
    }
 else {
      if (data === '') {
        console.log(`There is no item to update. Please add items.`);
      }
 else if (index > data.split('\n').length) {
        console.log(`Please write a number from 1 to ${data.split('\n').length}`);
      }
 else {
        let newData = data.split('\n');
        newData.splice(index - 1, 1, newItem);
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

const help = () => {
  fs.readFile('./help.txt', 'utf8', (err, data) => {
    if (err) {
      console.log(err);
    }
 else {
      console.log(data);
    }
  });
  console.log(`You can use these commands to make a to-do list: \n`);
};

module.exports = {
  list,
  add,
  remove,
  reset,
  help,
  update
};
