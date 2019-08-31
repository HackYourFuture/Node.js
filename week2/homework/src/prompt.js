/* eslint-disable max-len */
'use strict';

const chalk = require('chalk');
const rl = require('readline');

const prompt = question => {
  const readLine = rl.createInterface(process.stdin, process.stdout);
  return new Promise((resolve, reject) => {
    readLine.question(question, answer => {
      resolve(answer);
      readLine.close();
    });
  });
};

const addPrompt = chalk.yellow(`Please, type a todo at least 5 letters long.\n`);
const removePrompt = chalk.yellow(`Please, enter to-do order to remove:  `);
const completePrompt = chalk.yellow(`Please, enter to-do order to complete it:  `);
const resetPrompt = `${chalk.red.inverse('This will remove all to-dos!!!')}\n
Type ${chalk.green('yes')} to continue or ${chalk.red('no')} to cancel\n`;
const readPrompt = chalk.yellow(`Please, enter to-do order to read:  `);
const updatePrompt = chalk.yellow(`Please, enter to-do order to update:  `);
const updateQuestion = chalk.red(`Please, enter new to-do to replace it: `);
const exportPrompt = chalk.yellow(`Please, enter filename:  `);
const searchPrompt = chalk.yellow(`Please, enter a keyword :  `);

module.exports = {
  prompt,
  addPrompt,
  removePrompt,
  completePrompt,
  resetPrompt,
  readPrompt,
  updatePrompt,
  updateQuestion,
  exportPrompt,
  searchPrompt
};
