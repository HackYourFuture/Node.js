const fs = require('fs');
const list = require('./list');
const help = require('./help');
const fileName = './src/data.json';

function remove(todoItem) {
  return new Promise((resolve, reject) => {
    list().then(toDos => {
      if (todoItem <= 0 || todoItem > toDos.length) {
        help();
      } else {
        const todoList = JSON.parse(toDos);
        const filteredList = todoList.filter((elem, index) => index !== todoItem - 1);
        const newList = JSON.stringify(filteredList, null, 2);
        return fs.writeFile(fileName, newList, error => (error ? reject(error) : resolve(toDos)));
      }
    });
  });
}
module.exports = remove;
