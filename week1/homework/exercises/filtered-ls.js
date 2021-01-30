const fs = require('fs')
const path = require('path');

function callback(error, list) {
  if (error) return console.error(error)
  list.forEach(element => {
    if (path.extname(element) === ('.' + process.argv[3])) {
      console.log(element)
    }
  });
}
fs.readdir(process.argv[2], callback)