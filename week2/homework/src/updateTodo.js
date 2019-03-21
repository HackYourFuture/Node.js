const fs = require('fs');
const util = require('util');

var readFile = util.promisify(fs.readFile);

const update = (file, index, newTask) => {
  readFile(file, 'utf-8').then(data => {
    let arr = data.split('\n');
    arr[index] = newTask;
    fs.writeFile(file, arr.join('\n'), err => {
      if (err) throw err;
    });
  });
};

module.exports = { update };
