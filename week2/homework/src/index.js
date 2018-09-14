'use strict';

let fs = require('fs');
let program = require('commander');

program
	.version('2.18.0');
program
	.command('add <task>')
	.description('add an element to your to-do list')
	.action(function(task){
		add(task);
	});
program
	.command('')
	.description('show help')
	.action(function(){
		printHelp();
	});
program
	.command('remove <removeIndex>')
	.description('remove a to-do element from your list')
	.action(function(removeIndex){
		remove(removeIndex);
	});
program
	.command('reset')
	.description('remove a to-do element from your list')
	.action(function(){
		reset();
	});
program
	.command('update <updateIndex> <newElement>')
	.description('update one element from your list')
	.action(function(updateIndex, newElement){
		update(updateIndex, newElement);
	});
program
	.command('list')
	.description('list the elements to-do from your list')
	.action(function(){
		list();
	});
program
	.command('help')
	.description('show help')
	.action(function(){
		printHelp();
	});

program.parse(process.argv);

if(process.argv.length <= 2)
	printHelp();

function writeToFile(buffer){
	fs.writeFile('to-do.json', buffer, function(error, data){
		if(error){
			throw Error(error);
		}
	});
}

function getData(processData){
	fs.readFile('to-do.json', 'utf8', function(error, data) {
		if(error){
			throw Error(error);
		}
		else{
			processData(JSON.parse(data));
		}
	});
}

function add(task){
	getData(function(toDoData){
		toDoData.count++;
		toDoData.tasks.push(task);
		writeToFile(JSON.stringify(toDoData, null, 2));
	});
}

function list(){
	getData(function(toDoData){
		console.log(toDoData.tasks.join('\n'));
	});
}

function remove(index){
	if(index <= 0 ){
		throw Error('the index of the element to remove must be positive(greater than 0)');
	}
	getData(function(toDoData){
		toDoData.tasks.splice(index - 1, 1);
		toDoData.count--;
		writeToFile(JSON.stringify(toDoData, null, 2));
	});
}

function reset(){
	getData(function(toDoData){
		toDoData.tasks = [];
		toDoData.count = 0;
		writeToFile(JSON.stringify(toDoData, null, 2));
	});
}

function update(index, newElement){
	getData(function(toDoData){
		toDoData.tasks.splice(index - 1, 1, newElement);
		writeToFile(JSON.stringify(toDoData, null, 2));
	});
}

function printHelp(){
	console.log('Commands Help');
	console.log('help   -------> show help');
	console.log('add    -------> add a to-do to your list');
	console.log('remove -------> delete a to-do element from your list');
	console.log('list   -------> list the elements to-do from your list');
	console.log('reset  -------> clean your to-do list');
	console.log('update -------> update one element from your list');
}
