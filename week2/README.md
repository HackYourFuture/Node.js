## Summary:
Last week we looked at building an HTTP interface. The interface allowed us to get a state, and manipulate the state (add, subtract, reset). This week's key topics are:
1. Persisting data beyond the lifetime of the app.
1. Building a Command Line Interface
1. Using Node.JS's FileSystem (FS)

## Assignment for this week
These are the specs for this week's assignment:
- The user can run a NodeJs to-do app
- The user can be able to run the file using node index.js
- There should be a "help" section that lists all the commands for how to use the app

The following commands should be present:
- No command: show help section
- help: show help section
- list: show current todo's, or show an appropriate text if there are no todos
- add: add a todo item. all the words behind "add" are entered as 1 todo item to the list
- remove: remove a todo item by its 1-base index.
- reset: remove all todo items from the list

Chocolate cake for the person who can succeed the most tests :) (prices will have to be shared in case of equal score)

## Reading material

### Something about ES6 I want you guys to know
Old guys like Joost, Erol and I are talking about this "ES6" all the time. ES6 basically means: the latest version of NodeJS. It's a lot of really nice new features. For you guys, you should remember the following
> During the NodeJS course, we will teach you some ES6 features, like Fat Arrow. It's *extremely* important to know whether a function comes from ES6 or from an older version of JavaScript. Why? [Because browsers don't support every new feature just yet](http://kangax.github.io/compat-table/es6/). NodeJS, on the other hand, you can always control which version of Javascript is running, because it's running on your computer, not in the browser. Version 6.x that you are running supports most ES6.  

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

### 4. Buffers in NodeJS 
[Egghead video tutorial](https://egghead.io/lessons/node-js-node-js-buffers)  
