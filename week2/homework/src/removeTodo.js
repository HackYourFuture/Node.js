const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

const remove = (file, index) => {
  readFile(file, 'utf-8').then(data => {
    const arr = data.split('\n');
    const removed = arr.splice(index, 1);
    fs.writeFile(file, arr.join('\n'), err => {
      if (err) throw err;
    });
  });
};

module.exports = { remove };
