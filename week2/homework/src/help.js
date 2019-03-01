const readHelper = require('./readFile');

async function displayHelp() {
  const helper = await readHelper('help.json');
  console.log('Commands:');
  for (let key of Object.keys(helper)) {
    console.log(`${key} \t: ${helper[key].replace(/\. /g, '\n\t')} `);
  }
}

module.exports = displayHelp;
