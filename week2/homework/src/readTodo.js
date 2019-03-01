const fs = require('fs')

const read = (file) => {
  fs.readFile(file, "utf-8", (err, data) => {
    if(err) throw err;
    console.log(data);
  })
}

module.exports={read};