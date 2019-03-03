'use strict';

const actions = require('./actions');

const args = process.argv;

args.splice(0, 2);

const retrieve = argument => args.includes(argument);

if (retrieve('add')) actions.add(process.argv[1]);

if (retrieve('remove')) actions.remove(process.argv[1]);

if (retrieve('list')) actions.list(process.argv);

if (retrieve('reset')) actions.reset(process.argv);

if (retrieve('help')) actions.help(process.argv);
