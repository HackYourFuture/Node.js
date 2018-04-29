'use strict';

// TODO: Write the homework code in this file

const express = require('express');
const uuid = require('uuid/v4');

const {
    readFile: _readFile,
    writeFile: _writeFile
} = require('fs');

const {
    promisify
} = require('util');

const readFile = promisify(_readFile);
const writeFile = promisify(_writeFile);

const app = express();