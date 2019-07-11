const fs = require('fs');
const list = require('./list');
const fileName = './src/data.json';

function add(todoItem) {
  return new Promise((resolve, reject) => {
    list().then(data => {
      const todoList = JSON.parse(data);
      todoList.push(todoItem);
      const newList = JSON.stringify(todoList, null, 2);
      return fs.writeFile(fileName, newList, error => (error ? reject(error) : resolve(data)));
    });
  });
}

module.exports = add;
