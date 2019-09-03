'use strict';

const fs = require('fs');

const read = function(directory, Unicode) {
  return new Promise(function(resolve, reject) {
    fs.readFile(directory, Unicode, function(err, result) {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

const write = function(directory, data) {
  return new Promise(function(resolve, reject) {
    fs.writeFile(directory, data, function(err, result) {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

module.exports = { read, write };
