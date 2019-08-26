'use strict';

const fs = require('fs');

exports.writing = function(updatedList) {
  fs.writeFileSync('./tasks_list.json', JSON.stringify(updatedList));
};

// function(a) {
//   console.log(a);
// };
