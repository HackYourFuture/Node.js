'use strict';

const constants = {
  cli: {
    list: {
      option: true,
      optionFlags: '-l, --list',
      description: 'Lists all the to-do list.',
      command: 'list',
      alias: 'ls'
    },
    add: {
      option: true,
      optionFlags: '-a, --add <title>',
      description: 'Adds a new to-do item with the provided title.',
      command: 'add <title>',
      alias: 'a'
    },
    remove: {
      option: true,
      optionFlags: '-rm, --remove <id>',
      description: `Removes the to-do item from the list \
      if it finds one with the id provided.`,
      command: 'remove <id>',
      alias: 'rm'
    },
    update: {
      option: false,
      optionFlags: '',
      description: `Updates the to-do item's title with the new title \
      of which id number matches with the id number provided`,
      command: 'update <id> <newTitle>',
      alias: 'u'
    },
    reset: {
      option: true,
      optionFlags: '-rs, --reset',
      description: `Removes all the to-do items from the list.`,
      command: 'reset',
      alias: 'rs'
    }
  }
};

module.exports = constants;
