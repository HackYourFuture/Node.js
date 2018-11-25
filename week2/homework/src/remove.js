const data = require('./data');

let r = [];
const removeData = a =>
  a > 1 && a <= data.to_dos.length ?
    r = data.to_dos.splice((a - 1), 1) &&
    data.writeData(data.to_dos)
    :
    console.log("there is no item has this index to remove!")

module.exports = removeData;


