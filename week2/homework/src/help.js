const help = () => {
  return console.log(`
Welcome to To-Do's application!
Options:
  type ' list ' to see a list of all to-dos.
  type ' add "to-do" ' to add a new to-do to the list.
  type ' remove index' to remove a to-do from the list.
  type ' update index "to-do" ' to replace a to-do with another one. 
  type ' reset ' to delete the list and rest the application.
  type ' help ' to return to help menu.
  `);
};

module.exports = help;
