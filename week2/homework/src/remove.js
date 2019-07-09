'use strict';
const fs = require('fs');
function remove(args) {
  return new Promise(resolve =>
    fs.readFile('./data.json', 'utf-8', (err, data) => {
      if (err) {
        resolve(err);
      } else {
        data = JSON.parse(data);
        let index = args;
        if (data.hasOwnProperty(index)) {
          console.log(`\n${index} ${data[index]} deleted\n`);
          delete data[index];
        } else {
          console.log('\nTODO # does not exist\n');
        }
        resolve(JSON.stringify(data, null, 2));
      }
    }),
  );
}
module.exports = remove;
