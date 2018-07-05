'use strict';

const { readFile, writeFile } = require('fs');

const { promisify } = require('util');

const readFileWithPromise = promisify(readFile);
const writeFileWithPromise = promisify(writeFile);

const args = process.argv.slice(2);

const cmd = args[0];

let TODO_PATH = 'todo-json';

function readToDos() {
	return readFileWithPromise(TODO_PATH, 'utf8')
		.then(JSON.parse)
		.catch(() => ([]));
}
function writeToDos(toDos) {
	return writeFileWithPromise(TODO_PATH, JSON.stringify(toDos, null, 2));
}

switch (cmd) {
	case 'add':
		const text = args[1];
		readToDos()
			.then(toDos => {
				toDos.push({ toDo: text });
				return toDos;
			})
			.then(writeToDos);
		break;
	case 'remove':
		let index = args[1];
		readToDos()
			.then(toDos => {
				if (index >= 0) {
					toDos.splice(index, 1);
				} else {
					console.info('The index you passed is not valid');
				}
				return toDos;
			}).then(writeToDos);
		break;
	case 'list':
		readToDos()
			.then(console.log);
		break;
	case 'reset':
		readToDos()
			.then(toDos => {
				toDos.splice(0, toDos.length);
				return toDos;
			}).then(writeToDos);
		break;
	case 'update':
		const start = args[1];
		const newText = args[2];
		readToDos()
			.then(toDos => {
				if (start >= 0 && typeof newText === 'string') {
			toDos.splice(start, 1);
			toDos[start] = { toDos: newText };
		}else {
			console.info('Please check again the index you passed and the new To Do you want to pass in');
		}
		return toDos;
}).then(writeToDos);
break;
	case 'help':
    console.log('You can use these commands in order to get a proper result:\n \n node . add \'New To Do\'   : Adding new To Dos \n node . remove [Index of the To Do you want to remove]  : Remove a to DO from the list \n node . list  : showing tho whole list \n node . update [Index of the To Do you want to update]  \'new TO Do\'  : Updating the list with new To DO \n node . reset  : Reset the list');
break;
	default:
		console.log('You can use these commands in order to get a proper result:\n \n node . add \'New To Do\'   : Adding new To Dos \n node . remove [Index of the To Do you want to remove]  : Remove a to DO from the list \n node . list  : showing tho whole list \n node . update [Index of the To Do you want to update]  \'new TO Do\'  : Updating the list with new To DO \n node . reset  : Reset the list');
break;
}
