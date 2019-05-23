'use strict';

const fs = require('fs');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

class Actions {
  static async list() {
    const data = await readFile('to-do.json', 'utf8');
    return console.log(`\nTo-Do:\n${JSON.parse(data)}\n`);
  }

  static async addItem(...text) {
    let data = await readFile('to-do.json', 'utf8');
    data = JSON.parse(data);
    data.push(`\n${text.join(' ')}`);
    return writeFile('to-do.json', JSON.stringify(data), 'utf8');
  }

  static async remove(index) {
    let data = await readFile('to-do.json', 'utf8');
    data = JSON.parse(data);
    data.splice(index - 1, 1);
    return writeFile('to-do.json', JSON.stringify(data), 'utf8');
  }

  static async removeAll() {
    writeFile('to-do.json', JSON.stringify([]), 'utf8');
  }

  static async update(index, ...text) {
    let data = await readFile('to-do.json', 'utf8');
    data = JSON.parse(data);
    data.splice(index - 1, 1, `\n${text.join(' ')}`);
    return writeFile('to-do.json', JSON.stringify(data), 'utf8');
  }

  static Help() {
    console.log(`\nHackYourFuture Node.js Week 2 - CLI To-Do App Homework
  Usage: node index.js [options]\n Options:\n    list......................list all to-do
    add [to-do]...............adds a to-do\n    remove [index]............removes the to-do
    update [index] [to-do]....updates the to-do\n    reset.....................removes all to-do items
    help......................show help text\n`);
  }
}
const { list, addItem, remove, removeAll, update, Help } = Actions;

module.exports = { list, addItem, remove, removeAll, update, Help };
