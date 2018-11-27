const express = require("express");
const fs = require("fs");

module.exports = {
  parser: require("body-parser"),
  uuidv4: require('uuid/v4'),
  app: express(),
  readData: readData,
  writeData: writeData,
  checkId: checkId,
  notFound: notFound
}

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
function checkId(list, id) {
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