import getToDoList, { addTODO, removeTODO, reset, updateTODO } from './FileSystem.js'
import checkCommand from './CommandChecks.js'
import { helpText, errorText } from './responseText.js'
(() => {
    const commandArr = process.argv.slice(2)
    const CommandName = commandArr[0]
    switch (commandArr[0]) {
        case undefined:
        case "help":
            if (checkCommand("help", commandArr))
                console.log(helpText);
            break
        case "list":
            if (checkCommand("list", commandArr)) {
                getToDoList()
            }
            break
        case "add":
            if (checkCommand("add", commandArr)) {
                addTODO(commandArr[1])
            }
            break
        case "remove":
            if (checkCommand("remove", commandArr)) {
                removeTODO(commandArr[1])
            }
            break
        case "reset":
            if (checkCommand("reset", commandArr)) {
                reset()
            }
            break
        case "update":
            if (checkCommand("update", commandArr)) {
                updateTODO(commandArr[1], commandArr[2])
            }
            break

        default:
            console.log(errorText)
            break
    }
})()




