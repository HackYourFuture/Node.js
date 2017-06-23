var fs = require('fs');

var options = process.argv.slice(2);

var command = options[0];

switch (command) {
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
	case 'delete':
		deleteLine();
		break;
	case 'reset':
		resetFile();
		break;
}

function splitStringByNewline(string) {
	return string.split('\n').filter(function (element) {
		element = element.trim();
		return element.length > 0;
	});
}

function showHelp() {
	openFile('help.txt', function (error, data) {
		if (error) {
			return console.log('Error: the help file could not be displayed', error);
		}
		console.log(data);
	});
}

function listTodos() {
	openFile('todo.txt', function (error, data) {
		if (error) {
			if (error.code === 'ENOENT') {
				return console.log('Nothing to do! (or your dog ate your todo list)');
			} else {
				return console.log('Error: Something went wrong', error);
			}
		}

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
	});
}


function addLine() {

	options.shift();
	var allLine = options.join(' ');

	fs.appendFileSync('todo.txt', allLine + "\n", 'utf8');
}

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

function resetFile() {
	fs.writeFileSync('todo.txt', '')
	console.log('todo list is rested!');
}

})
}

function openFile(fileName, callback) {
	fs.readFileSync(__dirname + '/' + fileName, 'utf8');
}
