const fs = require('fs');
const fileName = './src/data.json';

function reset() {
  return new Promise((resolve, reject) => {
    return fs.writeFile(fileName, '[]', error => (error ? reject(error) : resolve([])));
  });
}

module.exports = reset;
