'use strict';

const fs = require('fs');
const util = require('util');
const readFileAsync = util.promisify(fs.readFile);

const HELP_FILE_PATH = __dirname + '/help.json';
const LIST_FILE_PATH = __dirname + '/list.json';
const DEFAULT_ENCODING = 'utf8';

async function readAndParse(file) {
  try {
    const filePath = file === 'help' ? HELP_FILE_PATH : LIST_FILE_PATH;
    const jsonData = await readFileAsync(filePath, DEFAULT_ENCODING);
    return JSON.parse(jsonData);
  } catch (error) {
    if ((error.code = 'ENOENT')) return { todos: [] };
    throw error;
  }
}

module.exports = readAndParse;
