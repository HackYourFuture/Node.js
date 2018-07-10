'use strict';

const boxt = require('boxt');
const chalk = require('chalk');

const helpMessages = {
  add: 'use: node . add "something to do"',
  remove: 'use: node . remove <index>',
  list: 'use: node . list',
  done: 'use: node . done <index>',
  update: 'use: node . update <index> "something to do instead"',
  reset: 'use: node . reset',
  help: boxt(
    `${chalk.cyan('>>')} Available commands:
node . add 'something to do'
${chalk.inverse.green('Adds a todo to your todo list.')}
node . remove <index>
${chalk.inverse.green('Removes a todo, specified by the index.')}
node . list
${chalk.inverse.green('Lists all todos.')}
node . done <index>
${chalk.inverse.green('Marks a todo as done, specified by the index.')}
node . update <index> 'new todo'
${chalk.inverse.green(
      'Replaces a todo specified by the index withe a new todo.'
    )}
node . reset
${chalk.inverse.green('Resets the todos file.')}
node . OR node . help
${chalk.inverse.green('Shows the available commands (this).')}`,
    {
      theme: 'round',
      color: 'green',
      align: 'left'
    }
  )
};

module.exports = helpMessages;
