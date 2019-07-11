const fs = require('fs');
const list = require('./list');
const help = require('./help');
const fileName = './src/data.json';

function update(todoItem, newVal) {
  return new Promise((resolve, reject) => {
    list().then(toDos => {
      if (todoItem <= 0 || todoItem > toDos.length) {
        help();
      } else {
        const todoList = JSON.parse(toDos);
        const mappedList = todoList.map((elem, index) => (index === todoItem - 1 ? newVal : elem));
        const newList = JSON.stringify(mappedList, null, 2);
        return fs.writeFile(fileName, newList, error => (error ? reject(error) : resolve(newList)));
      }
    });
  });
}

module.exports = update;
