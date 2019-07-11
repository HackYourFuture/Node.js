function add(data, args) {
  return new Promise(resolve => {
    let keyOfNewItem = Object.keys(data).length + 1;
    while (data.hasOwnProperty(keyOfNewItem)) {
      keyOfNewItem++;
    }
    data[keyOfNewItem] = args.join(' ');
    console.log('\x1b[33m%s\x1b[0m ', `\n\n${data[keyOfNewItem]} added\n\n`);
    resolve(JSON.stringify(data));
  });
}

module.exports = add;
