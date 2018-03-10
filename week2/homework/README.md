# HackYourFuture Node.js Week 2 - Homework

## Assignment

These are the specs for this week's assignment:

- Write a Node.js command line application
- The user must be able to run the file using `node index.js` or `node .` in the
  project directory
- There must be a `help` section that lists all the commands and a short
  description for each of them
- The user must be able to add, remove and list to-dos.
- The user must be able to remove all to-dos at once.

The following commands must be present:

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

## Bonus assignment

- Use JSON to store to-dos
- Split each action (i.e. read, write, etc.) into a separate file
- Use [commander](https://www.npmjs.com/package/commander) library to implement
  command line interface

Add following commands:

### `update`

Updates a to-do item with new text:

```
node index.js update 3 "Brush teeth"
```

### Things to consider

- What representation you use in your file (CSV, TSV, JSON, etc).
- Handle edge cases, i.e. control what happens if user enters unexpected input,
  e.g. `remove -100`.
