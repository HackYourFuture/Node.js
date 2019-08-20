'use strict';

const fs = require('fs');
const config = require('./config');
const program = require('commander');

program.parse(process.argv);

try {
  const id = parseInt(program.args[0]);
  const data = fs.readFileSync(config.DATA_FILE, { encoding: config.ENCODING });
  const tasks = JSON.parse(data);
  if (!tasks.map(i => i.id).includes(id)) {
    throw new Error('INDEX required');
  }
  const filteredTasks = tasks
    .filter(task => task.id !== id)
    .map(task => task.description)
    .reduce((tasks, description, index) => {
      tasks.push({ id: index + 1, description });
      return tasks;
    }, []);
  fs.writeFileSync(config.DATA_FILE, JSON.stringify(filteredTasks, null, 2));
}
 catch (error) {
  console.log(error.message);
}
