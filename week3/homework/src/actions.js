'use strict';

const fs = require('fs');

const ENCODING = 'utf8';
const PATH = `${__dirname}/todoList.json`;

const actions = {
  list: () => {
    return new Promise((resolve, reject) => {
      fs.readFile(PATH, ENCODING, (err, todoList) => {
        if (err) {
          if (err.code === 'ENOENT') console.log('no data found');
          reject(err);
        }
        resolve(todoList);
      });
    });
  },
  reset: data => {
    return new Promise((resolve, reject) => {
      fs.writeFile(PATH, JSON.stringify(data), err => {
        if (err) {
          reject(err);
        }
        resolve();
      });
    });
  },
  update: async (request, response, value) => {
    try {
      let read = await list();
      read = JSON.parse(read);
      let index = parseInt(request.params.id) - 1;
      console.log(index);
      read[index].done = value;
      await reset(read);
      response.status(201).send('data has been modified');
    } catch {
      response.status(404).send('there is an error');
    }
  },
};

const { list, reset, update } = actions;

module.exports = { list, reset, update };
