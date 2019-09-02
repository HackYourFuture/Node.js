'use strict';

const fs = require('fs');

const read = function(directory, Unicode) {
  return new Promise(function(resolve, reject) {
    fs.readFile(directory, Unicode, function(err, res) {
      if (err) reject(err);
      else resolve(res);
    });
  });
};

read('todolist.json', 'utf8')
  .then(res => console.log(JSON.parse(res)))
  .catch(err => console.log(err.message));

// -----------------------------------------
// function write(directory, data) {
//   return new Promise(function(resolve, reject) {
//     fs.writeFile(directory, data, function(err, res) {
//       if (err) reject(err);
//       else resolve(res);
//     });
//   });
// }

// const data = { task: 'first Task', id: 100 };
// const dataString = JSON.stringify(data);
// write('todos.json', dataString)
//   .then(res => console.log(dataString))
//   .catch(err => console.log(err.message));
