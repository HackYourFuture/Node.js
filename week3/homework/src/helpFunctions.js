'use strict';

const fs = require('fs');

const ENCODING = 'utf8';
const PATH = `${__dirname}/todoList.json`;

const actions = {
  list: () => {
    return new Promise((resolve, reject) =>
      fs.readFile(PATH, ENCODING, (err, todoList) => {
        if (err) {
          if (err.code === 'ENOENT') console.log('no data found');
          reject(err);
        }
        resolve(todoList);
      }),
    );
  },
  reset: data => {
    return new Promise((resolve, reject) => {
      fs.writeFile(PATH, JSON.stringify(data), err => {
        if (err) reject(err);
      });
      resolve();
    });
  },
};

const { list, reset } = actions;

module.exports = { list, reset };
