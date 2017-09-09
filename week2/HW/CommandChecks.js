import { errorText, invalidCommand } from './responseText.js'
export default function checkCommand(command, arg) {
    let isGoodCommand = true;
    switch (command) {
        case "help":
        case "list":
        case "reset":
            if (arg.length > 1) {
                console.log(invalidCommand);
                isGoodCommand = false;
            }
            break


        case "add":
            if ((arg.length !== 2)) {
                console.log(invalidCommand);
                isGoodCommand = false;
            }
            break
        case "remove":
            if ((arg.length !== 2) || (isNaN(arg[1]))) {
                console.log(invalidCommand);
                isGoodCommand = false;
            }
            break

        case "update":
            if ((arg.length !== 3) || isNaN(arg[1])) {
                console.log(invalidCommand);
                isGoodCommand = false;
            }
            break

        default:
            console.log(errorText)
            break
    }
    return isGoodCommand
}