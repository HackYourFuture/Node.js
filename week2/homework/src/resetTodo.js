const fs = require('fs');

const reset = file =>{
  fs.writeFile(file, '', err => {
    if(err) throw err;
  })
}

module.exports={reset} 