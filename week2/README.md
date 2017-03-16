## Last week Summary
Last week we looked at building an HTTP interface. The interface allowed us to get a state, and manipulate the state (add, subtract, reset). 

## Today's meal
1. Recap last week
2. Homework
3. Questions & Answers (Q&A)
4. Other topics
4. Persisting data beyond the lifetime of the app.
5. Building a Command Line Interface / Working with arguments
6. Using Node.JS's FileSystem (FS)
7. CRUD operations
8. This week's assignment

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

## Reading material

### Something about ES6 I want you guys to know
You may hear us talking about this "ES6" all the time. ES6 basically means: the latest version of JavaScript. It has a lot of really nice new features that makes life as developer easier. For you guys, you should remember the following:
> During the NodeJS course, we will teach you some ES6 features, like Fat Arrow. It's *extremely* important to know whether a function comes from ES6 or from an older version of JavaScript. Why? [Because browsers don't support every new feature just yet](http://kangax.github.io/compat-table/es6/). With Node, on the other hand, you can always control which version of Javascript is running, because it's running on your computer, not in the browser. Node Version 6.x that you are running supports most ES6. 
So in summary: if you're working on the frontend, you probably don't want to use es6 just yet. In backend, type node --version to see which version you are running, and make sure everyone on the team has the same version by adding "engine" to `package.json` like so: 

```
"dependencies": {
  ...
},
"devDependencies": {
  ...
},
"engines": {
  "node": ">=6.5.0" // this means you need 6.5 or higher
},
```

### 1. ES6: Fat Arrow functions
This is one example of how ES6 can help us write cleaner code. I'm adding this as first reading material because it's used a lot on the NodeJS documentation website, so it's a good idea to understand what this means. Bonus points if you write your callbacks this way.   
[Blogpost Sitepoint]([https://www.sitepoint.com/es6-arrow-functions-new-fat-concise-syntax-javascript/)  
[Video]([https://www.youtube.com/watch?v=J85lRtO_yjY)  

### 2. NodeJS Process: 
Don't have to remember everything in this video, just a nice outline  
[Egghead video tutorial](https://egghead.io/lessons/node-js-the-node-js-process-object)  
Only read the part about "process.argv"  
[Node.JS docs - process.argv](https://nodejs.org/docs/latest/api/process.html#process_process_argv)  

### 3. NodeJS FS
Only read the part about readFile, appendFile (you will need this in your assignment)  
[Node.JS docs - fs.readFile](https://nodejs.org/api/fs.html#fs_fs_readfile_file_options_callback)  
[Node.JS docs - fs.appendFile](https://nodejs.org/api/fs.html#fs_fs_appendfile_file_data_options_callback)  

### 4. Node Fundamentals
Read parts:
- 3.1, 3.2
- 4.1, 4.3
[Airpair tutorial](https://www.airpair.com/javascript/node-js-tutorial#3-node-fundamentals)  
