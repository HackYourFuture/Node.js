#!/usr/bin/env node
'use strict';

const args = require('./arguments');
const method = require('./methods');

let param = args.file[1] + '\r\n';

const command = args.file[0];

switch (command) {
  case 'add':
    method.add(param);
    break;
  case 'list':
    method.list();
    break;
  case 'remove':
    method.remove(param);
    break;
  case 'reset':
    method.reset();
    break;
  default:
    console.log(method);
}
