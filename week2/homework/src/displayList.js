'use strict';
const fs = require('fs');
function displayList(todoText) {
  return new Promise(resolve =>
    fs.readFile('./data.json', 'utf-8', (err, data) => {
      if (err) {
        resolve(err);
      } else if (Object.keys(JSON.parse(data)).length === 0) {
        console.log('No items to show.\nTo add: node . add "TODO" .');
        resolve(data);
      } else {
        data = JSON.parse(data);
        Object.keys(data).map(key => console.log(key + ' ' + data[key]));
        console.log('To remove : node . remove # \n' + 'To update: node . update # "new TODO"');
        resolve(data);
      }
    }),
  );
}
module.exports = displayList;
