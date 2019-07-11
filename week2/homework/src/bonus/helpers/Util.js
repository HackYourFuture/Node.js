'use strict';

const { readFilePromise, writeFilePromise } = require('./Promisify');

class Util {
  static getFileData(filePath) {
    return readFilePromise(filePath, 'utf8');
  }

  static write(filePath, data) {
    return writeFilePromise(filePath, data, 'utf8');
  }

  static async getJSONFromFile(filePath) {
    /* eslint brace-style: 2 */
    try {
      const dataString = await readFilePromise(filePath, 'utf8');
      return JSON.parse(dataString);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Util;
