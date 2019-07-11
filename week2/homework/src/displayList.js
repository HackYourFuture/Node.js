const readFile = require('./readFile');

async function displayList() {
  const data = await readFile();
  Object.keys(data).map(key => console.log(key, data[key], '\n'));

  console.log(
    '\x1b[33m%s\x1b[0m ',
    '\nTo update\t: node . update #TODO NewTODO\nTo remove\t: node . remove TODO#\nTo reset list\t: node . reset\n',
  );
}
module.exports = displayList;
