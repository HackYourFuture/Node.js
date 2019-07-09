'use strict';
const fs = require('fs');
function readAndAppend(args) {
  return new Promise(resolve =>
    fs.readFile('./data.json', 'utf-8', (err, data) => {
      if (err) {
        resolve(err);
      } else {
        data = JSON.parse(data);
        let index = Object.keys(data).length + 1; //new item key
        while (data.hasOwnProperty(index)) {
          // to avoid assigning an existing key to the new item
          index++;
        }
        args = args.join(' ');
        data[index] = args;
        resolve(JSON.stringify(data, null, 2));
      }
    }),
  );
}
module.exports = readAndAppend;
