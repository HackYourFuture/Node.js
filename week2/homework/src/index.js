'use strict';
const program = require('commander');
const handler = require('./handler.js');

var todos = handler.read();

program
    .version('0.1.0');

program
    .command('help')
    .description('usage of this cmd line program')
    .action(function (param) {
        program.help();
    });

program
    .command('add [todo]')
    .description('add to-do')
    .action(function (param) {
        handler.add(param);
        console.log('\"' + param + '\" saved');
    });

program
    .command('remove [index]')
    .description('remove to-do by index')
    .action(function (param) {
        handler.remove(param);
        console.log("removed by index: " + param);
    });

program
    .command('list')
    .description('list all to-dos')
    .action(function () {
        console.log(handler.read());
    });

program
    .command('reset')
    .description('remove all to-dos')
    .action(function () {
        handler.reset();
        console.log('removed all to-dos');
    });

program
    .command('update [index] [to-do]')
    .description('update to-do')
    .action(function (index, param) {
        handler.update(index, param);
        console.log(index + '. to-do updated as "' + param + '"');
    });

program.parse(process.argv);

if (!program.args.length) program.help();