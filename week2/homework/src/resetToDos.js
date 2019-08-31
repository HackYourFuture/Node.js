'use strict';

const { saveToDo, logScreen } = require('./Util');

const resetToDos = () => {
  saveToDo([]).then(() => logScreen('All to-dos has removed successfully!', 'green'));
};

module.exports = resetToDos;
