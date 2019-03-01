const fs = require('fs');
const util = require('util')

const readFile = util.promisify(fs.readFile)

const remove = (file, task) =>{
  readFile(file, "utf-8")
  .then(data => {
    const arr = data.toString().split("\n");
    const index = arr.indexOf(task)
    const removed = arr.splice(index,1);
    fs.writeFile(file, arr.join("\n"),err => {
      if(err) throw err 
    })
  })
    
}

module.exports = { remove }