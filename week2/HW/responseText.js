const commandArr = process.argv.slice(2)
const CommandName = commandArr[0]
export const helpText = `To DO app:\n this app is helping you to make your 
        To DO list.
         several commands you can use to modify your list.
         here you can find the available commands :

         No command: show help section ex:(node index.js).

         help:   show help section ex:(node index.js help).

         list:   show current todo's, or show an appropriate text if 
                 there are no todos ex:(node index.js list).

         add:    add a todo item. all the words behind "add" are entered as 1 
                 todo item to the list ex:(node index.js add "Buy groceries").

         remove: remove a todo item by its 1-base index.
                 ex:(node index.js remove 2).

         reset:  remove all todo items from the list ex:(node index.js reset).
         `
export const errorText = `UnExpected Unknown Command !!
          Please Write "node index.js help" in the Command Line to Know Which Commands Are Supported`
export const invalidCommand = `Invalid Command ${CommandName}!!
  Please Write "node index.js help" in the Command Line to review the proper structure of 
  ${CommandName} command`

export const emptyTODOList = `Your To Do list is empty ,
   if you want to add some use the following command : 
    node index.js add <Todo item>`

export const invalidToDoOrder = `No ToDo for the Order You Provided`
export const todoRemoved = `Your ToDO Item Removed Successfully.`
export const todoAdded = `Your ToDO Item Added Successfully.`
export const todoUpdated = `Your ToDO Item Updated Successfully.`
export const todoListReset = `Your ToDO List Reset Successfully.`