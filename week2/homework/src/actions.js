/* eslint-disable indent */
const fs = require('fs');
function add(item) {
  fs.readFile('./todoList.json', 'utf8', (error, data) => {
    if (error) {
      console.log(error);
    }
 else {
      const todos = JSON.parse(data);
      todos.push(item);
      const dataString = JSON.stringify(todos);
      fs.writeFile('./todoList.json', dataString, error => {
        if (error) {
          console.log(error);
        }
      });
    }
  });
}
function list() {
  fs.readFile('./todoList.json', 'utf8', (error, todoList) => {
    if (error) {
      if (error.code === 'EN0ENT') {
        console.log('No data found');
      }
 else {
        console.error(error);
      }
    }
 else {
      const todos = JSON.parse(todoList);
      todos.forEach(elem => console.log(elem));
    }
  });
}

function remove(index) {
  fs.readFile('./todoList.json', 'utf8', (error, data) => {
    if (error) {
      console.log(error);
    }
 else {
      const todos = JSON.parse(data);
      todos.splice(index - 1, 1);
      const dataString = JSON.stringify(todos);
      fs.writeFileSync('./todoList.json', dataString, 'utf8');
    }
  });
}

function help() {
  console.log(`Usage: node index.js [options]

HackYourFuture Node.js Week 2 - To-Do App

Options:

  list [l]                            lists all to-dos
  add [a] [to-do]                     adds to-do
  remove [rm] [index]                  removes to-do with given index
  help [h]                            shows this help text
  reset [r]                           removes all to-do list
  update [u] [index] [new value]      updates item with new value
  `);
}

function reset() {
  fs.writeFile('./todoList.json', '[]', error => {
    if (error) {
      console.log(error);
    }
    console.log('Your to-do list is empty now');
  });
}

function update(index, newItem) {
  fs.readFile('./todoList.json', 'utf8', (error, data) => {
    if (error) {
      console.log(error);
    }
 else {
      const todos = JSON.parse(data);
      todos.splice(index - 1, 1, newItem);

      const dataString = JSON.stringify(todos);
      fs.writeFileSync('./todoList.json', dataString, 'utf8');
    }
  });
}
module.exports = { add, list, remove, help, reset, update };
