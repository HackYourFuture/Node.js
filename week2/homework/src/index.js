'use strict';

const { list, addItem, remove, removeAll, update, Help } = require('./actions');

const command = process.argv[2];
const args = process.argv.slice(3);

const app = async () => {
  try {
    command === 'list'
      ? list()
      : command === 'add'
      ? (await addItem(...args)) + list()
      : command === 'remove'
      ? args < 1
        ? console.log(`\nindex must be greater than 0!\n`)
        : (await remove(...args)) + list()
      : command === 'reset'
      ? (await removeAll()) + list()
      : command === 'update'
      ? (await update(...args)) + list()
      : Help();
  } catch (err) {
    console.error(err);
  }
};
app();
