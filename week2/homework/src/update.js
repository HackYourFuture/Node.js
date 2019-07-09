'use strict';
const fs = require('fs');
function update(args) {
  return new Promise(resolve =>
    fs.readFile('./data.json', 'utf-8', (err, data) => {
      if (err) {
        resolve(err);
      } else {
        data = JSON.parse(data);
        let index = args[0];
        if (data.hasOwnProperty(index)) {
          console.log(`\n${data[index]} has been updated as : `);
          data[index] = args[1];
          console.log(`\n${data[index]}\n`);
        } else {
          console.log('\nTODO # does not exist\n');
        }
        resolve(JSON.stringify(data, null, 2));
      }
    }),
  );
}
module.exports = update;
