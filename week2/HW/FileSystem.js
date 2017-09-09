import fs from 'fs'
import { emptyTODOList, invalidToDoOrder, todoRemoved, todoAdded, todoListReset, todoUpdated } from './responseText.js'

export default function getToDoList() {
    readToDoFile("list")

}
export function addTODO(toDoItem) {
    readToDoFile("add", toDoItem)
}
export function removeTODO(index) {
    readToDoFile("remove", index)
}
export function reset() {
    readToDoFile("reset")
}

export function updateTODO(index, updatedItem) {
    readToDoFile("update", index, updatedItem)
}

function readToDoFile(arg1, arg2, arg3) {
    fs.readFile("./ToDo.json", 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            return
        }
        switch (arg1) {
            case "list":
                displayToDolist(data)
                break
            case "add":
                addNewTODO(data, arg2)
                break
            case "remove":
                removeExistingTODO(data, arg2)
                break
            case "update":
                updateExistingTODO(data, arg2, arg3)
                break
            case "reset":
                resetExistingTODO()
                break
            default:
                break
        }
    })
}
function writeToDoFile(command, toDoListJSON) {
    fs.writeFile("./ToDo.json", JSON.stringify(toDoListJSON), function (err) {
        if (err) {
            console.log(err);
            return
        }
        switch (command) {
            case "add":
                console.log(todoAdded);
                break
            case "remove":
                console.log(todoRemoved);
                break
            case "update":
                console.log(todoUpdated);
                break
            case "reset":
                console.log(todoListReset);
                break
            default:
                break
        }
    });
}
function displayToDolist(jasonString) {
    let toDoList = Object.values(JSON.parse(jasonString))

    if (toDoList.length == 0) {
        console.log(emptyTODOList)
        return
    }
    toDoList.forEach(function (element, index) {
        console.log(`ToDo ${index + 1} :${element}`)
    }, this);
}
function addNewTODO(jasonString, tODOItem) {
    let toDoListJSON = JSON.parse(jasonString)
    let keys = Object.keys(toDoListJSON)
    let newTODOKey = keys.length > 0 ? (parseInt(keys[keys.length - 1]) + 1).toString() : "0"
    toDoListJSON[newTODOKey] = tODOItem
    writeToDoFile("add", toDoListJSON)
}
function removeExistingTODO(jasonString, index) {
    let toDoListJSON = JSON.parse(jasonString)
    let keys = Object.keys(toDoListJSON)
    if (!(keys[index - 1])) {
        console.log(invalidToDoOrder)
        return
    }
    delete toDoListJSON[keys[index - 1]]
    writeToDoFile("remove", toDoListJSON)
}
function resetExistingTODO() {
    let toDoListJSON = {}
    writeToDoFile("reset", toDoListJSON)
}
function updateExistingTODO(jasonString, index, updatedItem) {
    let toDoListJSON = JSON.parse(jasonString)
    let keys = Object.keys(toDoListJSON)
    if (!(keys[index - 1])) {
        console.log(invalidToDoOrder)
        return
    }
    toDoListJSON[keys[index - 1]] = updatedItem
    writeToDoFile("update", toDoListJSON)
}