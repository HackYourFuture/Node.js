'use strict';
const { program: commander, configureCLI } = require('./config');
const ListManager = require('./list-manager');
const { cli, message } = require('./constants');

const main = async () => {
  const manager = new ListManager();

  if (!(await manager.prepare())) {
    process.exit();
  }

  commander.listManager = manager;

  configureCLI(cli, commander, manager);

  // Let the commander process the arguments!
  commander.parse(process.argv);

  // If no arguments passed; show help
  if (!process.argv.slice(2).length) {
    commander.outputHelp();
    return;
  }

  if (commander.list) {
    await manager.listTodos();
  } else if (commander.add) {
    await manager.addTodo(commander.add);
  } else if (commander.remove) {
    const parsedId = parseInt(commander.remove, 10);
    if (!isNaN(parsedId)) {
      await manager.removeTodo(parsedId);
    } else {
      console.error(
        `${commander.remove} is not a number. ${message.misc.argumentParseError('remove')}`
      );
    }
  } else if (commander.reset) {
    await manager.resetTodos(commander.reset);
  }
};

main();
