/*global console*/
"use strict";
// ##### GLOBAL VARIABLE DECLARATIONS #####
var fs = require('fs');
var options = process.argv.slice(2);
var command = options[0];
var valOfOptions = options[1];
var dataOfTodos = openFile('todo.txt');
var todos = splitStringByNewline(dataOfTodos);
//console.log(todos);
console.log(`
######||***** welcome *****||######
######|| My List Todos App ||######
`);
//This function is to read the file and catch the error 
//Which we used it above To assign the variable we will use it later
function openFile(fileName) {
	try {
		var fileContaint = fs.readFileSync(__dirname + '/' + fileName, 'utf8');
	} catch (error) {
		if (error.code === 'ENOENT') {
			return console.log(fileName + ' Not exist! (or your ' + fileName + ' file)');
		} else {
			return console.log('Error: Something went wrong', error);
		}
	}
	return fileContaint;
}
// To check the type of command that will be typed by the user
switch (command.toLowerCase()) {
	case 'help':
	default:
		showHelp();
		break;
	case 'add':
		addItem();
		break;
	case 'remove':
		deleteLine();
		break;
	case 'reset':
		resetFile();
		break;
	case 'update':
		updateLine();
		break;
	case 'list':
		listTodos();
		break;
}
//Converts the text file into an array to deal with
function splitStringByNewline(string) {
	return string.split('\n').filter(function (element) {
		element = element.trim();
		return element.length > 0;
	});
}

//To call the helper text file.
function showHelp() {
	let dataOfHelp = openFile('help.txt')
	console.log(dataOfHelp);
}
//To add a new item.
function addItem() {
	//remove first item from process.argv
	options.shift(); 
	//Make it on a single line
	let newItem = options.join(' ') ;
	// append the new item to list
	fs.appendFileSync('todo.txt', '\n' + newItem + '\n', 'utf8');
	//Open the file todo txt and read it again To update the information
	dataOfTodos = openFile('todo.txt');
	todos = splitStringByNewline(dataOfTodos);
	listTodos(); 
}
//To delete the selected item.
function deleteLine() {
	//Check for the item number
	if ( valOfOptions > todos.length || valOfOptions <= 0) { 
		console.log('\n' + '"Check the number and enter an appropriate number"' + '\n');
	} else {
		dataOfTodos = openFile('todo.txt');
		// create new data
		todos = splitStringByNewline(dataOfTodos);
		//To delete the selected item
		todos.splice(valOfOptions - 1, 1);
		//Make it on a single line
		let newResult = todos.join('\n');
		fs.writeFileSync('todo.txt', newResult);
		console.log('\n' + '"Item ' + valOfOptions + ' has been deleted"' + '\n');
		listTodos();
	}
}
//Delete all items
function resetFile() {
	fs.writeFileSync('todo.txt', '')
	console.log('\n' + '" Done! "' + '\n'); 
}
//To update the selected item.
function updateLine() {
	//Check for the item number.
	if (valOfOptions > todos.length || valOfOptions <= 0) {
		console.log('\n' + '"Check the number and enter an appropriate number"' + '\n');
	} else {
		dataOfTodos = openFile('todo.txt');
		todos = splitStringByNewline(dataOfTodos);
		// remove first two items from process.argv
		let newLine = options.slice(2);
		// exchange the old item with the new item by index.
		todos.splice(valOfOptions - 1, 1, newLine.join(' '));
		let newResult = todos.join('\n'); 
		fs.writeFileSync('todo.txt', newResult);
		console.log( '\n' + '"Item ' + valOfOptions + ' has been updated"' + '\n');
		listTodos();
	}
}
//to Displays list items
function listTodos() {
	if (todos.length === 0) {
		return console.log('\n' + '"Nothing to do!"' + '\n' )
	}
	console.log( '\n' +'"Here is your list todo"' + '\n');
	todos.forEach(function (element, index) {
		index = (index + 1).toString();
		console.log(index, element);
	});
	if (todos.length > 5) {
		console.log('\n' +'"You have too much to do!"'+ '\n');
	}
}