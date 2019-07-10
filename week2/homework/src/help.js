const fs = require('fs');
const desc = 'HELP : shows command list with small descriptions';
function help(array) {
  array.forEach(element => {
    console.log(element.desc);
  });
}
module.exports = { help, desc };
