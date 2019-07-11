const fs = require('fs');
const list = require('./list');
const fileName = './src/data.json';

function remove(todoItem) {
  return new Promise((resolve, reject) => {
    list().then(data => {
      const todoList = JSON.parse(data);
      const filteredList = todoList.filter((elem, index) => index !== todoItem - 1);
      const newList = JSON.stringify(filteredList, null, 2);
      return fs.writeFile(fileName, newList, error => (error ? reject(error) : resolve(newList)));
    });
  });
}
module.exports = remove;
