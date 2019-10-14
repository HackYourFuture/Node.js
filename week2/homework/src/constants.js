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
  },
  message: {
    success: {
      emptyList: 'There are no todos yet.',
      add: 'New Todo item successfully added to the list.',
      update: id => `Todo item with id ${id} successfully updated.`,
      remove: id => `Todo item with id ${id} successfully removed from the list.`,
      reset: 'Reset operation have been done successfully.'
    },
    error: {
      list: 'Todos could not be fetched.',
      add: 'Error occurred while trying to add new todo item to the list.',
      update: 'Could not find a todo item with id',
      remove: 'Could not find a todo item with id',
      fatal: 'There is a fatal error that prevent program from preparing the todo data file!',
      save: 'Error occurred while trying to save the list.'
    },
    misc: {
      argumentParseError: operation =>
        `Please provide a number that might match with a todo item for ${operation} operation.`,
      prepareFailError: 'Error occurred while trying to prepare todos data file.'
    }
  }
};

module.exports = constants;
