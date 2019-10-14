'use strict';

const commander = require('commander');

const program = new commander.Command();

// Configure Command Line Interface -Options & Commands-

program.version('1.0.0');

let configureCLI = (cliConfigs, commanderProgram, manager) => {
  for (const configKey in cliConfigs) {
    const config = cliConfigs[configKey];
    if (config.option) {
      commanderProgram.option(config.optionFlags, config.description);
    }
    commanderProgram
      .command(config.command)
      .alias(config.alias)
      .action(getActionForCommand(configKey, manager));
  }
};

let getActionForCommand = (command, manager) => {
  if (command === 'list') {
    return manager.listTodos.bind(manager);
  } else if (command === 'add') {
    return manager.addTodo.bind(manager);
  } else if (command === 'remove') {
    return manager.removeTodo.bind(manager);
  } else if (command === 'update') {
    return manager.updateTodo.bind(manager);
  } else if (command === 'reset') {
    return manager.resetTodos.bind(manager);
  } else {
    return console.error;
  }
};

module.exports = {
  program,
  configureCLI
};
