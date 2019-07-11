const readFile = require('./readFile');

async function update(args) {
  const data = await readFile();
  if (!data.hasOwnProperty(args[0])) {
    console.log('\x1b[33m%s\x1b[0m ', 'no such TODO');
  } else if (args.length === 1) {
    console.log('\nNo update value provided');
  } else {
    data[args[0]] = args.slice(1).join(' ');
  }
  return JSON.stringify(data);
}
module.exports = update;
