#!/usr/bin/env node
var argv = require('yargs')
    .commandDir('cmds')
    .usage('Usage: $0 <command> [file] [options]')
    .help('h')
    .alias('h', 'help')
    .wrap(70)
    .epilog('Simple ToDoList ver 0.2')
    .version('0.2')
    .demandCommand()
    .argv;
