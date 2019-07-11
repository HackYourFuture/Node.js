function help() {
  console.log(`Please write a valid number and one of the following commands:
  \n node index.js list
  Shows current to-dos, or shows an appropriate text if there are no to-dos
  
  \n node index.js add "Buy groceries"
  Adds a to-do item. All the words behind add are entered as 1 to-do item to the list.
       
  \n node index.js remove (number)
  Removes a to-do item by its 1-base index.
  \n node index.js update 3 "Brush teeth"
  Updates a to-do item with new text
 
  \n node index.js reset
  Removes all to-do items from the list`);
}

module.exports = help;
