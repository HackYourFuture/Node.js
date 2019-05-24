async function helpCommand() {
  console.log(`
  HackYourFuture Node.js Week 2 - CLI To-Do App Homework
  Usage: node index.js [options]
  Options:
   list......................list all to-do
   add [to-do]...............adds a to-do
   remove [index]............removes the to-do
   update [index] [to-do]....updates the to-do
   reset.....................removes all to-do items
   help......................show help text
   `);
}
module.exports = helpCommand;
