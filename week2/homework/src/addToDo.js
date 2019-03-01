const fs = require("fs");

const add = (file, task) => {
  fs.appendFile(file, `${task}\n`, err =>{
    if(err) throw err;
    console.log("appended ", task) 
  })
}

module.exports = { add }