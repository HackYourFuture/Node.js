# HackYourFuture Node.js - Homework week 2

## Assignment for this week

These are the specs for this week's assignment:

- The user can run a Node.js to-do app
- The user must be able to run the file using `node index.js`
- There should be a "help" section that lists all the commands for how to use
  the app

The following commands should be present:

### No command or `help`

Shows help section

```
node index.js
```

or

```
node index.js help
```

### `list`

Shows current to-dos, or shows an appropriate text if there are no to-dos

```
node index.js list
```

### `add`

Adds a to-do item. All the words behind `add` are entered as 1 to-do item to the
list.

```
node index.js add "Buy groceries"
```

### `remove`

Removes a to-do item by its 1-base index, e.g. to remove second item, execute:

```
node index.js remove 2
```

### `reset`

Removes all to-do items from the list:

```
node index.js reset
```

### *BONUS:* `update`

Updates a to-do item with new text:

```
node index.js update 3 "Wash teeth"
```

### Things to consider

- What representation you use in your file (CSV, TSV, JSON, ...)
- Handle edge cases, i.e. control what happens if user enters unexpected input
