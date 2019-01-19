const fs = require('fs');
const json = fs.readFileSync('todo.json', 'utf-8');
const jsonData = JSON.parse(json);

function todoList() {
  jsonData.forEach(elem => console.log(elem.task));
}

function add(value) {
  jsonData.push({ task: value });
  let newJsonData = JSON.stringify(jsonData);
  fs.writeFile('todo.json', newJsonData, function(error) {
    if (error) {
      console.log(error);
    }
  });
}

function remove(index) {
  if (index < jsonData.length) {
    jsonData.splice(index, 1);
    let newJsonData = JSON.stringify(jsonData);
    fs.writeFileSync('todo.json', newJsonData);
  } else {
    console.log('Please use a line number');
  }
}

function reset() {
  fs.writeFileSync('todo.json', JSON.stringify([]));
}

function update(index, updateTask) {
  if (index < jsonData.length) {
    jsonData.splice(index, 1, { task: updateTask });
    let newJsonData = JSON.stringify(jsonData);
    fs.writeFileSync('todo.json', newJsonData);
  } else {
    console.log('Please use a line number');
  }
}

module.exports = {
  todoList: todoList,
  add: add,
  remove: remove,
  reset: reset,
  update: update,
};
