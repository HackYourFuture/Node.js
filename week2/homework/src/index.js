'use strict';
const commander = require('./config');
const ListManager = require('./list-manager');

const main = async () => {
  const manager = new ListManager();

  if (!(await manager.prepare())) {
    process.exit();
  }

  commander.listManager = manager;

  // Let the commander process the arguments!
  commander.parse(process.argv);
};

main();
