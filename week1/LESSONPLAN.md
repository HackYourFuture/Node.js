# Node.js Week 1 (Lesson Plan)

## Agenda

The purpose of this class is to introduce to the student:

- Recap of previous module most relevant concepts

1. Backend and Node.js basics
2. Client-server model
3. Node.js and NPM basics (`npm init`, `npm install`, `package.json`, `require` and `modules.export`)
4. How to create a basic Express.js server
5. Serving static files with Express

## FIRST HALF (12.05 - 13.30)

**START RECORDING THE LECTURE (Quicktime or Open Broadcast Software)**

### 1. Backend and Node.js basics

#### Explanation

All web sites consist of a frontend (HTML/CSS and browser JavaScript) and a backend (web server that interacts with the database and sends data to the frontend).

The frontend (through the browser) allows for users to interact with the application. The backend is there to handle incoming and outgoing data traffic.

![Server architecture](../assets/Server.png)

Node.js is a server-side platform, that allows us to use JavaScript to write backend applications.

#### Example

Show students how to use Node.js to execute JavaScript files. Start with the following simple example, but explain how this log will be found inside of the command line instead of

```js
console.log("Hello World!");
```

#### Exercise

In a new JavaScript file write a function that returns true if a day is a weekend and false if it is not.

```javascript
function isWeekend(dayOfWeek) {
  if (dayOfWeek === "Saturday") return true;
  if (dayOfWeek === "Monday") return false;
  // fill in the rest
}

console.log("Tuesday is a " + (isWeekend("Tuesday") ? "weekend" : "week day")); // week day
console.log("Friday is a " + (isWeekend("Friday") ? "weekend" : "week day")); // week day
console.log("Sunday is a " + (isWeekend("Sunday") ? "weekend" : "week day")); // weekend
```

Execute the file with `node` in the command line.

#### Essence

We can use Node.js, from the command line, in order to run JavaScript files to perform calculations (without use of a browser) or that can interact with the operating system.

### 2. Client-server model

#### Explanation

The way a client and server interact with each other, is called the `client-server model`. It says that if a client needs data, it will send a `request` to a server, which will then give the client that data. The server does so by sending a `response` back to the client, which includes the data asked for.

`HyperText Transfer Protocol` (HTTP) is the communication guideline for how this should go.

`Uniform Resource Locator` (URL) is the address where a a given file (or in more technical terms, `resource`) can be found.

`Port` is the door to which web communication can pass through. A port number is assigned before communication can pass through it.

`Content-Type` is a property that has to be included in a request header, to specify to the receiving web server what type of data (e.g. JSON, XML, Binary, etc.) will be send.

#### Example

Show the students the requests and responses of the following application, by using the Network tab in the browser:

- https://fullstack-exampleapp.herokuapp.com/

#### Exercise

Ask different students to identify the following in this screenshot:

![HTTP request exercise](../assets/request_exercise.png)

- URL:
- PORT:
- IP address:
- Content-Type:

#### Essence

The client-server model describes how each communicates with the other, through `requests` and `responses`. Generally speaking, the client sends `requests` for `GET`ting or `POST`ing data, and the server responds with what the client wanted to have.

## SECOND HALF (14.00 - 16.00)

### 3. Node Package Manager (NPM)

#### Explanation

The Node Package Manager (NPM) is a collection of functional modules that other developers have written, in order to be reused by other developers in order to more quickly build solutions to IT problems.

NPM is accessible in the command line, by using `npm [COMMAND]`. Online you can find a registry of different modules: [NPM](https://www.npmjs.com).

#### Example

Explain the purpose of the `require` function, using a local file (see the `build-with-students` folder, step 1)

Explain the `npm init` command and the purpose of a `package.json` file (see the `build-with-students` folder, step 2)

Explain `npm install` by installing Express.js inside of that folder. Show the `node_modules` folder and explain its purpose.

#### Exercise

Ask students to setup a new Node.js project, with only a `package.json` and empty JavaScript file initialized.

Have them install the package [one-liner-joke](https://www.npmjs.com/package/one-liner-joke).

Then ask them to complete the follow JavaScript code:

```javascript
// what is missing here?

console.log(oneLinerJoke.getRandomJoke().body);
```

#### Essence

Developers don't want to rebuild the same thing, therefore we have publicly accessible modules others have made (and that we can make ourselves as well) to be used freely. NPM is the place where those are stored for JavaScript modules.

### 4. Express.js

#### Explanation

Express.js is the most popular NPM package for easily creating web servers in Node.js. Through the predefined methods we can route data traffic, connect to other web servers, interact with databases and serve client-side applications.

#### Example (code along)

Show them a running Express application.

Use browser Network tab to show request response of the following application:

https://obscure-anchorage-82962.herokuapp.com/

In a new folder:

```shell
> npm init
> npm install express
```

Create a JavaScript file called `server.js`, with the following code:

```javascript
const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
```

Start the app using `node server.js`. Check if the app is running by opening the following URL in the browser `localhost:3000`

#### Exercise

Write an Express app that serves the following HTML:

```html
<html>
  <head>
    <title>Task app</title>
  </head>
  <body>
    <h1>Things to do</h1>
    <ul>
      <li>Write assignments</li>
      <li>Buy groceries</li>
      <li>Prepare dinner</li>
      <li>Watch movie</li>
    </ul>
  </body>
</html>
```

#### Essence

Express.js is used to easily create web servers, that allow us (among other reasons) to serve HTML so our browser can read it. The browser sends a request to a specific address, like `/`, and our server (through Express) responds with an HTML file.

### 5. Serving static files with Express

#### Explanation

Motiviation based on previous exercise where HTML code is put in the javascript. Instead of doing this, the HTML can be saved in a file in the project and then send with express when needed.

#### Example

Save the HTML content in a new file in the project e.g. `index.html`. Then modify the javascript code to serve the HTML from the file instead of having it hardcoded.

```javascript
const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => res.sendfile("index.html"));

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
```

#### Exercise

```css
li:nth-child(even) {
  background-color: #ccc;
}
```

If time left: Save the above css in a file `style.css`.
Link the stylesheet in the HTML file. Extend the express app to return the sylesheet for route `\style.css`.

#### Essence

By serving content from files our javascript code is kept clean and at the same time UI designers can easily work on the HTML/CSS files without having to navigate code.
