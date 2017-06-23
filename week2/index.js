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
	options.shift();
	var allLine = options.join(' ');
	fs.appendFileSync('todo.txt', allLine + "\n", 'utf8');			
}

//delete one line from todo list by index number.
function deleteLine() {
	if (options[1] <= 0) {
		console.log('Please enter right line number!!! ' + '\n');
		showHelp();
	} else {
		var lineNumber = options[1] - 1;
		var data = fs.readFileSync('todo.txt', 'utf8')
		var dataRendering = data.split('\n');
		dataRendering.splice(lineNumber, 1);
		var newLines = dataRendering.join('\n');
		fs.writeFileSync('todo.txt', newLines);
		console.log('Line ' + options[1] + ' is deleted!' + '\n');
		listTodos();
	}
}

//Reset todo list by overwriting blank one.
function resetFile() {
	fs.writeFileSync('todo.txt', '')
	console.log('todo list is rested!');
}

//Load file content depending on filen ame, and handle error message.
function openFile(fileName) {
	var fileContaint;
	try {
		fileContaint = fs.readFileSync(__dirname + '/' + fileName, 'utf8');
	} catch (error) {
		if (error.code === 'ENOENT') {
			return console.log(fileName + ' Not exist! (or your dog ate your ' + fileName + ' file)');
		} else {
			return console.log('Error: Something went wrong', error);
		}
	}
	return fileContaint;
}
