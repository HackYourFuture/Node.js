'use strict';

// TODO: Write the homework code in this file
var program = require('commander');
const { readFile, writeFile } = require('fs');
const { promisify } = require('util');

const readFileWithPromise = promisify(readFile);
const writeFileWithPromise = promisify(writeFile);

const [ , , cmd, ...args] = process.argv;

const TODO_FILE = 'todos.json'; 

async function main(){
  const data =JSON.parse( await readFileWithPromise(TODO_FILE, 'utf8').catch(() => '[]'));
  const elementKey = parseInt(args)-1;

  switch (cmd){

    case 'add':
      data.push(args.join(' '))
      await writeFileWithPromise(TODO_FILE, JSON.stringify(data));
      console.info('Element has been added')
    break;

    case 'list':
      console.info(data);
    break;

    case 'remove':
    if(data.length >= elementKey || Number.isNaN(elementKey))
    {
      data.splice(elementKey, 1)
      await writeFileWithPromise(TODO_FILE, JSON.stringify(data));
      console.info('Element is removed')
    }
    else
    {
      console.info('This element does not exist')
    }
    break;

    case 'reset':
      await writeFileWithPromise(TODO_FILE, JSON.stringify([]));
    break; 

    case 'update':
  
      if(data.length >= elementKey)
      {
        args[0] = '';
        data[elementKey] = args.join(' ').trim();      
        await writeFileWithPromise(TODO_FILE, JSON.stringify(data));
        console.info('It is updated')
      }
      else
      {
        console.info('This element does not exist')
      }
   break; 

    default:
      console.info('<Adding new data to target file>   node . add "New Element"');
      console.info('<Reading data from the file>       node . list');
      console.info('<Removing data by target key>      node . remove "Key Element"');
      console.info('<Reseting the file>                node . reset');
      console.info('<Updating data by target key>      node . remove "Key Element"');
    break;
  }
}

//
main();