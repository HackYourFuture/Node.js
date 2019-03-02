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
      return data
        .split('\n')
        .filter((val, idx) => lines.indexOf(idx) === -1)
        .join('\n');
    };

    fs.readFile(path, 'utf8', (err, data) => {
      if (err) throw err;

      fs.writeFile(path, removeLines(data, [row - 1]), 'utf8', () => {
        console.log('Deleted successfully');
      });
    });
  },

  reset: () => {
    fs.writeFile(path, '', () => {
      console.log('Reset successfully');
    });
  },
};

module.exports = method;
