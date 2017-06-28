// Extract the argument and recognize it after making sure that it is a correct argument. If a wrong argument is entered, display a list of allowed arguments. (done)
// In case of using (help) as an argument or using empty argument, display the contents of help.txt (done)
// In case of using (add) as an argument, make sure that the second argument is not empty then add it to todo.txt (done)
// In case of using (remove) as an argument, make sure that the second argument is an acceptable index then show a warning message before removing the item from todo.txt (done)
// In case of using (update) as an argument, make sure that the second argument is an acceptable index and also the third argument is not empty then show a warning message before updating the item in todo.txt (done)
// In case of using (reset) as an argument, show a warning message before reseting todo.txt (done)
// In case of using (list) as an argument, show current todo's, or show an appropriate text if there are no todos. (done)

var fs = require("fs");
var readline = require("readline");
console.log("\n\n--<( ToDo App )>--\n\n")// Display a title with the app name.
var todoArray = fs.readFileSync(__dirname + "/todo.txt", "utf8").split("\n");// Extract list of tasks from todo.txt
var commandArguments = process.argv.slice(2);// Extract the list of arguments

// This function takes taskToAdd as the only argument and adds it to todo.txt file.
function add(taskToAdd) {
    fs.appendFileSync(__dirname + "/todo.txt", taskToAdd + "\n");
    console.log("'" + taskToAdd + "' was added successfully to the todo's.");
}

// When the selected index is not correct or the file todo.txt is empty, this function offers to add the task to the end of the list instead of updating the selected index. It takes a message to show to the user as an argument.
function addInsteadOfUpdate(message) {
    var rl = readline.createInterface(process.stdin, process.stdout);
    rl.question(message + "!\nSo do you want to add it anyway to the end of todo list? (yes to add)", function(answer) {
        if (answer.toLowerCase().trim() == "yes") {
            add(commandArguments[2]);// call the function that adds tasks to todo.txt
        }
        else {
            console.log("Nothing was added to the todo list.");
        }
        rl.close();
    });
}

// This function is responsible for removing or updating tasks. It depends on the argument (command).
function removeOrUpdate(command) {
    // Show a warning message before proceeding
    var rl = readline.createInterface(process.stdin, process.stdout);
    rl.question("Are you sure you want to " + command + " task " + parseInt(commandArguments[1]) + "? (yes to " + command + ")", function(answer) {
        if (answer.toLowerCase().trim() == "yes") {
            var firstSlice = todoArray.slice(0, parseInt(commandArguments[1]) - 1);
            // If the requested command is updated, the new task will be added to its proper index.
            if (command == "update") {
                firstSlice.push(commandArguments[2]);
            }
            todoArray = firstSlice.concat(todoArray.slice(parseInt(commandArguments[1])));
            fs.writeFileSync(__dirname + "/todo.txt", todoArray.join("\n"));
            console.log("Task '" + parseInt(commandArguments[1]) + "' was " + command + "d successfully.");
        }
        else {
            console.log("Task '" + parseInt(commandArguments[1]) + "' was not " + command + "d.");
        }
        rl.close();
    });
}

switch (commandArguments[0]) {
    // In case of using "help" or empty argument
    case "help":
    case undefined:
        console.log(fs.readFileSync(__dirname + "/help.txt", "utf8"));
        break;
        
    case "add":
        // to check if there is a second argument after the "add" argument.
        if (commandArguments[1]) {
            add(commandArguments[1]);// call the function that adds tasks to todo.txt
        }
        else {
            console.log("You have to write what you want to add to the todo's as a second argument\ne.g., node " + __filename + " add 'Watch tv'");
        }
        break;
        
    case "remove":
        // to check if there is an index as a second argument after the "remove" argument.
        if (parseInt(commandArguments[1])) {
            // to check if the list of todo is empty or not.
            if (todoArray[0] == "") {
                console.log("The list of todo is already empty!");
            }
            else {
                // check if the index is not greater than list length and not smaller than 1
                if (parseInt(commandArguments[1]) > todoArray.length - 1 || parseInt(commandArguments[1]) < 1) {
                    console.log("There is/are only '" + (todoArray.length - 1) + "' task/s in the todo list!\nSo the second argument must be greater than '0' and smaller than '" + todoArray.length + "'");
                }
                else {
                    removeOrUpdate("remove");// call the function that removes tasks from todo.txt.
                }
            }
        }
        else {
            console.log("You have to use task's index as a second argument\ne.g., node " + __filename + " remove 1");
        }
        break;
        
    case "update":
        // to check if there is an index as a second argument and a text as a third argument after the "update" argument.
        if (parseInt(commandArguments[1]) && commandArguments[2]) {
            // to check if the list of todo is empty or not.
            if (todoArray[0] == "") {
                addInsteadOfUpdate("The list of todo is empty");// call the function that offers to add instead of update.
            }
            else {
                // check if the index is not greater than list length and not smaller than 1
                if (parseInt(commandArguments[1]) > todoArray.length - 1 || parseInt(commandArguments[1]) < 1) {
                    addInsteadOfUpdate("There is/are only '" + (todoArray.length - 1) + "' task/s in the todo list");// call the function that offers to add instead of update.
                }
                else {
                    removeOrUpdate("update");// call the function that updates tasks in todo.txt.
                }
            }
        }
        else {
            console.log("You have to use task's index as a second argument and to write what you want to do as third argument\ne.g., node " + __filename + " update 1 'Watch tv'");
        }
        break;
        
    case "reset":
        // Show a warning message before resetting.
        var rl = readline.createInterface(process.stdin, process.stdout);
        rl.question("Are you sure you want to reset the list of todo? (yes to reset)", function(answer) {
            if (answer.toLowerCase().trim() == "yes") {
                fs.writeFileSync(__dirname + "/todo.txt", "");
                console.log("List of todo was reset!");
            }
            else {
                console.log("List of todo was NOT reset.");
            }
            rl.close();
        });
        break;
        
    case "list":
        // to check if the list of todo is empty or not.
        if (todoArray[0] == "") {
            console.log("So far there is nothing to do, the list of todo is empty!");
        }
        else {
            // Store every line from todo.txt as an element in the array "todoList".
            var todoList = fs.readFileSync(__dirname + "/todo.txt", "utf8").split("\n");
            for (var i=0 ; i<todoList.length -1 ; i++) {
                console.log((i + 1) + " - " + todoList[i]);
            }
        }
        break;
        
    default:// in case the user used a wrong argument.
        console.log("You have used an unknown argument.\nThis is a list of all arguments that can be used:\n");
        var allowedArgsList = fs.readFileSync(__dirname + "/help.txt", "utf8").split("\n");
        // To extract only the lines that contain argument names from help.txt
        allowedArgsList.forEach(function(line, index) {
            if ((index + 2) % 6 == 0) {
                console.log(line.slice(0, -2));// To remove ":" from the end of the line.
            }
        });
        console.log("\nFor more information use the argument 'help'");
                 } 