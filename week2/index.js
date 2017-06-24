//Include File File System package.
var fs = require('fs');

//Get input commands, remove 'node index.js' form the command.
var options = process.argv.slice(2);

// find the value of the command, call help file in case command value not found.
switch (options[0]) {
	case 'help':
	default:
		showHelp();
		break;
	case 'list':
		listTodos();
		break;
	case 'add':
		addLine();
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
}
//separate by new line file content, and filter it in array.
function splitStringByNewline(string) {
	return string.split('\n').filter(function (element) {
		element = element.trim();
		return element.length > 0;
	});
}

//Call help file and display content.
function showHelp() {
	var data = openFile('help.txt')
	console.log(data);
}

//call todo file content and display its content.
function listTodos() {
	var data = openFile('todo.txt');
	var todos = splitStringByNewline(data);
	if (todos.length === 0) {
		return console.log('Nothing to do!')
	}
	console.log('Your todo list looks like this');
	todos.forEach(function (element, index) {
		index = (index + 1).toString();
		console.log(index, element);
	});

	if (todos.length > 5) {
		console.log('You have too much to do!');
	}

}
//Add new todo line, creat a file in case its not exist.
function addLine() {
	options.shift(); //remove first element from command
	var allLine = options.join(' ') ; //wrap all command as one line
	fs.appendFileSync('todo.txt', allLine + '\n', 'utf8'); // append the new line to list
	listTodos(); // show the new list
}

//update new todo line, creat a file in case its not exist.
function updateLine() {
	if (options[1] <= 0) { // in case that the user enter worng number
		console.log('Please enter right line number!!! ' + '\n');
		showHelp();
	} else {
		var lineNumber = options[1] - 1; // get the line number
		var data = fs.readFileSync('todo.txt', 'utf8') // get file information
		var dataRendering = data.split('\n'); //split every line to array element
		if (lineNumber > dataRendering.length) { // check if update line number exist or not
			console.log("You dont have this line number in your list\n" );
			showHelp();
		} else {
			var updateLine = options.slice(2); // remove first two words from command 
			dataRendering.splice(lineNumber, 1, updateLine.join(' ')); // replace with index number for length of one with update line.
			var newLines = dataRendering.join('\n'); // join array element with new line separator
			fs.writeFileSync('todo.txt', newLines); //Write on file
			console.log('Line ' + ++lineNumber + ' is Updated!' + '\n');// display confirmation message
			listTodos(); // show the new list
		}
	}

}

//delete one line from todo list by index number.
function deleteLine() {
	if (options[1] <= 0) { //Check if the line number is 0 and show help
		console.log('Please enter right line number!!! ' + '\n');
		showHelp();
	} else {
		var lineNumber = options[1] - 1; // Get the line number
		var data = fs.readFileSync('todo.txt', 'utf8') // get file content
		var dataRendering = data.split('\n'); // create new array
		dataRendering.splice(lineNumber, 1); // slice the line number
		var newLines = dataRendering.join('\n'); // rejoin data
		fs.writeFileSync('todo.txt', newLines); // write to the file 
		console.log('Line ' + options[1] + ' is deleted!' + '\n'); // show confirmation message
		listTodos(); // show the result
	}
}

//Reset todo list by overwriting blank one.
function resetFile() {
	fs.writeFileSync('todo.txt', '') // overwriting file with blank
	console.log('todo list is rested!'); // show confirmation message 
}

//Load file content depending on filen ame, and handle error message.
function openFile(fileName) {
	var fileContaint; 
	try {
		fileContaint = fs.readFileSync(__dirname + '/' + fileName, 'utf8'); //read file with calling name
	} catch (error) { //handel errors
		if (error.code === 'ENOENT') {
			return console.log(fileName + ' Not exist! (or your dog ate your ' + fileName + ' file)');
		} else {
			return console.log('Error: Something went wrong', error);
		}
	}
	return fileContaint;
}
