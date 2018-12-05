'use strict'

const fs = require("fs");

function readData(cb) {
  fs.readFile("to-dos.json", "utf8", (err, file) => {
    if (err) {
      console.error("Something wrong happened, please try again!", err);
    } else {
      const list = JSON.parse(file);
      cb(list);
    }
  });
}

function writeData(json) {
  let data = JSON.stringify(json, null, 2);
  fs.writeFile("to-dos.json", data, (err) => {
    console.log(err ? `Something wrong happened, please try again!${err}` : "Done");
  });
}

function getIndexById(list, id) {
  let x;
  list.forEach((el, i) => {
    if (el.id === id) {
      x = i;
    }
  });
  return x;
}

function notFound(res, id) {
  res.send(`There is no item with id: ${id}`);
}

module.exports = {
  readData: readData,
  writeData: writeData,
  getIndexById: getIndexById,
  notFound: notFound
}