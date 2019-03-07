const fs = require('fs');
let path = 'todo.txt';

// CRUD Operation

const method = {
  add: buffer => {
    fs.readFile(path, { encoding: 'utf-8' }, (err, data) => {
      if (err) throw 'error writing file: ' + err;
      buffer += data;
      fs.writeFile(path, buffer, err => {
        if (err) throw 'error writing file: ' + err;
        console.log('wrote the file successfully');
      });
    });
  },

  list: () => {
    fs.readFile(path, { encoding: 'utf-8' }, (err, data) => {
      console.log(data);
    });
  },

  remove: row => {
    const removeLines = (data, lines = []) => {
      if (lines) {
        return data
          .split('\n')
          .filter((val, idx) => lines.indexOf(idx) === -1)
          .join('\n');
      }

      fs.readFile(path, 'utf8', (err, data) => {
        if (err) throw err;

        fs.writeFile(path, removeLines(data, [row - 1]), 'utf8', () => {
          console.log('Deleted successfully');
        });
      });
    };
  },

  reset: () => {
    fs.writeFile(path, '', () => {
      console.log('Reset successfully');
    });
  },

  help: () => {
    return console.log(`You are now using ToDo Methods to manage your data
    1- You can type [add + 'your data'] to add new todo 
    2- You can type [list] to see all todos
    3- type [remove + the line of the todo] to delete the todo
    4- type [reset] to clear all your todos
  `);
  },
};

module.exports = method;
