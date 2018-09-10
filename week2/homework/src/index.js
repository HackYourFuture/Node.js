'use strict';

let fs = require('fs');

let program = require('commander');

program
	.version('0.0.1');
program
	.command('add <index>')
	.description('add an element to your to-do list')
	.action(function(index){
		
		handleRequest(0, 0, index);
	});
program
	.command('')
	.description('show help')
	.action(function(){
		printHelp();
	});
program
	.command('remove <index>')
	.description('remove a to-do element from your list')
	.action(function(index){
		handleRequest(1, index);
	});
program
	.command('reset')
	.description('remove a to-do element from your list')
	.action(function(){
		handleRequest(2)
	});
program
	.command('update <index> <newElement>')
	.description('update one element from your list')
	.action(function(index, newElement){
		handleRequest(3, index, newElement);
	});
program
	.command('list')
	.description('list the elements to-do from your list')
	.action(function(){
		handleRequest(4);
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

function printHelp(){
	console.log('Commands Help');
	console.log('help   -------> show help');
	console.log('add    -------> add a to-do to your list');
	console.log('remove -------> delete a to-do element from your list');
	console.log('list   -------> list the elements to-do from your list');
	console.log('reset  -------> clean your to-do list');
	console.log('update -------> update one element from your list');
}

function writeToFile(buffer){
	fs.writeFile('to-do.json', buffer, function(error, data){
		if(error)
			console.log(error);
	});
}

function handleRequest(request, index, updatedElem){ //request = (add, remove, reset, update, list)
	if(index && index <= 0){
		throw Error('The index of the element to ' + (request == 1 ? 'remove' : 'update') + ' must be grater than 0.');
	}
	fs.readFile('to-do.json', 'utf8', function(error, data) {
		if(error){
			console.log(error);
		}
		else{
			let infoObject = JSON.parse(data);
			let corrected = infoObject.tasks.split('\n');
			switch(request){
				case 0://add
					infoObject.count++;
					infoObject.tasks += updatedElem + '\n';
					writeToFile(JSON.stringify(infoObject, null, 2));
					break;
				case 1: //remove
					corrected.splice(index - 1, 1);
					corrected = corrected.join('\n');
					infoObject.tasks = corrected;
					infoObject.count--;
					writeToFile(JSON.stringify(infoObject, null, 2));
					break;
				case 2: //reset
					infoObject.tasks = '';
					infoObject.count = 0;	
					writeToFile(JSON.stringify(infoObject, null, 2));
					break;
				case 3: //update
					corrected.splice(index - 1, 1, updatedElem);
					corrected = corrected.join('\n');
					infoObject.tasks = corrected;
					writeToFile(JSON.stringify(infoObject, null, 2));
					break;
				case 4: //list
					console.log(infoObject.tasks);
					break;
				case 5:
					printHelp();
					break;
			}
		}
	});
}
