// Extract the argument and recognize it after making sure that it is a correct argument. If a wrong argument is entered, display a list of allowed arguments. (done)
// In case of using (help) as an argument or using empty argument, display the contents of help.txt (done)
// In case of using (add) as an argument, make sure that the second argument is not empty then add it to todo.txt
// In case of using (remove) as an argument, make sure that the second argument is an acceptable index then show a warning message before removing the item from todo.txt
// In case of using (update) as an argument, make sure that the second argument is an acceptable index and also the third argument is not empty then show a warning message before updating the item in todo.txt
// In case of using (reset) as an argument, show a warning message before reseting todo.txt
// In case of using (list) as an argument, show current todo's, or show an appropriate text if there are no todos.

var fs = require("fs");
var path = require("path");
console.log("\n\n--<( ToDo App )>--\n\n")// Display a title with the app name.
var arguments = process.argv.slice(2);// To extract the list of arguments
switch (arguments[0]) {
    // In case of using "help" or empty argument
    case "help":
    case undefined:
        console.log(fs.readFileSync(path.join(__dirname, "help.txt"), "utf8"));
        break;
    case "add":
        break;
    case "remove":
        break;
    case "update":
        break;
    case "reset":
        break;
    case "list":
        break;
    default:// in case the user used a wrong argument.
        console.log("You have used an unknown argument.\nThis is a list of all arguments that can be used:\n");
        var allowedArgsList = fs.readFileSync(path.join(__dirname, "help.txt"), "utf8").split("\n");
        // To extract only the lines that contain arguments from help.txt
        allowedArgsList.forEach(function(line, index) {
            if ((index + 2) % 6 == 0) {
                console.log(line.slice(0, -2));// To remove ":" from the end of the line.
            }
        });
        console.log("\nFor more information use the argument 'help'");
                 }