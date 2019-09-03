'use strict';

const fs = require('fs');

const read = function(directory, Unicode) {
  return new Promise(function(resolve, reject) {
    fs.readFile(directory, Unicode, function(err, res) {
      if (err) reject(err);
      else resolve(res);
    });
  });
};

const write = function(directory, data) {
  return new Promise(function(resolve, reject) {
    fs.writeFile(directory, data, function(err, res) {
      if (err) reject(err);
      else resolve(res);
    });
  });
};

module.exports = { read, write };
