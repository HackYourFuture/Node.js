const fs = require('fs');
module.exports = {
  add: function add(todoItem) {
    fs.readFile('./todoList.json', 'utf8', (error, todoList) => {
      if (error) {
        if (error.code === 'ENOENT') {
          console.log('no data found');
        }
        console.log(error);
      } else {
        const data = JSON.parse(todoList);
        const keysList = Object.keys(data);
        const keyToBeAdded = ++keysList.length;
        data[keyToBeAdded] = todoItem;
        fs.writeFile('./todoList.json', JSON.stringify(data), 'utf8', () => {
          console.log(data);
        });
      }
    });
  },
  remove: function remove(todoItem) {
    fs.readFile('./todoList.json', 'utf8', (error, todoList) => {
      if (error) {
        if (error.code === 'ENOENT') {
          console.log('no data found');
        }
        console.log(error);
      } else {
        const data = JSON.parse(todoList);
        if (todoItem !== '.' && data[todoItem]) {
          let i = todoItem;
          do {
            delete data[i];
            if (data[++i]) data[--i] = data[++i];
            i;
          } while (i <= Object.keys(data).length);
          fs.writeFile('./todoList.json', JSON.stringify(data), 'utf8', () => {
            console.log(data);
          });
        } else {
          fs.writeFile('./todoList.json', JSON.stringify({}), 'utf8', () => {
            console.log({});
          });
        }
      }
    });
  },
  list: function list() {
    fs.readFile('./todoList.json', 'utf8', (error, todoList) => {
      if (error) {
        if (error.code === 'ENOENT') {
          console.log('no data found');
        }
        console.log(error);
      } else {
        const data = JSON.parse(todoList);
        console.log(data);
      }
    });
  },
  reset: function reset() {
    fs.readFile('./todoList.json', 'utf8', error => {
      if (error) {
        if (error.code === 'ENOENT') {
          console.log('no data found');
        }
        console.log(error);
      } else {
        fs.writeFile('./todoList.json', JSON.stringify({}), 'utf8', () => {
          console.log({});
        });
      }
    });
  },
  update: function update(todoItem, todoValue) {
    fs.readFile('./todoList.json', 'utf8', (error, todoList) => {
      if (error) {
        if (error.code === 'ENOENT') {
          console.log('no data found');
        }
        console.log(error);
      } else {
        const data = JSON.parse(todoList);
        data[todoItem] = todoValue;
        fs.writeFile('./todoList.json', JSON.stringify(data), 'utf8', () => {
          console.log(data);
        });
      }
    });
  },
  help: function help() {
    Object.keys(this).forEach(key => {
      key === 'add'
        ? console.log(`The '${key} function' helps you to ${key} new things on the todo list`)
        : key === 'remove'
        ? console.log(
            `The '${key} function' helps you to ${key} things on the todo list. To ${key} all of the list please use dot(.) after the ${key} command. You can use reset function too.`,
          )
        : key === 'list'
        ? console.log(`The '${key} function' helps you to ${key} all of things on the todo list`)
        : key === 'reset'
        ? console.log(
            `The '${key} function', ${key}s the todo list.Everyone deserves a fresh start`,
          )
        : key === 'update'
        ? console.log(
            `The ${key} function allow you to update respected todoItem. Syntax: update "number" "new value"`,
          )
        : console.log(
            `The '${key} function' is designed to ${key} you. You may use it with ${key} command or leaving the rest blank`,
          );
    });
  },
};
