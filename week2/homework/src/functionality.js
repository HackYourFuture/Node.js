const fs = require('fs');

function todoList() {
  const jsonData = readAndParse();
  jsonData.forEach(elem => elem.task);
}

function add(value) {
  const jsonData = readAndParse();
  jsonData.push({ task: value });
  let newJsonData = JSON.stringify(jsonData);
  fs.writeFile('todo.json', newJsonData, function(error) {
    if (error) {
      console.log(error);
    }
  });
}

function remove(index) {
  const jsonData = readAndParse();
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
  const jsonData = readAndParse();
  if (index < jsonData.length) {
    jsonData.splice(index, 1, updateTask);
    let newJsonData = JSON.stringify(jsonData);
    fs.writeFileSync('todo.json', newJsonData);
  } else {
    console.log('Please use a line number');
  }
}

function readAndParse() {
  const json = fs.readFileSync('todo.json', 'utf-8');
  return JSON.parse(json);
}

module.exports = {
  todoList: todoList,
  add: add,
  remove: remove,
  reset: reset,
  update: update,
};
