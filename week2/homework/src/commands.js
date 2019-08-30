const fs = require('fs');
const colors = require('colors');
function showCommandsList() {
  const helpList = fs.readFileSync('./commands.txt', 'utf8');
  console.log(colors.cyan(helpList));
}

module.exports = {
  showCommandsList
};
