> Please help us improve and share your feedback! If you find better tutorials or links, please share them by opening a Pull Request.

# HackYourFuture Node.js - Homework week 4

## Assignment for this week
These are the specs for this week's assignment:
- The user can run a NodeJs to-do app
- The user can be able to run the file using node index.js
- There should be a "help" section that lists all the commands for how to use the app

The following commands should be present:
- No command: show help section (`node index.js`)
- help: show help section (`node index.js help`)
- list: show current todo's, or show an appropriate text if there are no todos (`node index.js list`)
- add: add a todo item. all the words behind "add" are entered as 1 todo item to the list (`node index.js add "Buy groceries"`)
- remove: remove a todo item by its 1-base index. (`node index.js remove 2`)
- reset: remove all todo items from the list (`node index.js reset`)

- *BONUS:* update: update a todo item with new text (`node index.js update 3 "Wash teeth"`)

### Consider this:
- What representation you use in your file (CSV, TSV, JSON, ...)
- Handle edge cases, i.e. control what happens if user enters unexpected input
