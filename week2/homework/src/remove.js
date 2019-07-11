const fs = require('fs');

function remove(data, args) {
  return new Promise((resolve, reject) => {
    args.join(' ');
    if (data.hasOwnProperty(args)) {
      console.log('\x1b[33m%s\x1b[0m ', `\n\n${data[args]} removed\n\n`);
      delete data[args];
      resolve(JSON.stringify(data));
    } else {
      console.log('\x1b[33m%s\x1b[0m ', ' \n\n no such TODO \n\n');
      reject(console.error);
    }
  });
}

module.exports = remove;
