const fs = require('fs');
const list = require('./list');
const fileName = './src/data.json';

function add(todoItem) {
  return new Promise((resolve, reject) => {
    list()
      .then(toDos => {
        const todoList = JSON.parse(toDos);
        todoList.push(todoItem);
        const newList = JSON.stringify(todoList, null, 2);
        return fs.writeFile(fileName, newList, error => (error ? reject(error) : resolve(toDos)));
      })
      .catch(error => console.log(error));
  });
}

module.exports = add;
