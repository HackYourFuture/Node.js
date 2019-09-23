# Homework Node.js Week 1

## Todo List

1. Practice the concepts
2. Node.js exercises
3. Code along
4. PROJECT: HackYourTemperature I

> Before we proceed, let's check to see if we have the latest versions of Node.js and the Node Package Manager (NPM) installed. You can do that by going to the Command Line (CLI) and running `node -v` and `npm -v`. Node.js should be at least **v10** and NPM should be at least **v6**.

## 1. Practice the concepts

In this week's interactive exercises, we'll be going back to the command line. We'll be using software from [Nodeschool](https://nodeschool.io/) to do some exercises.

Go to your favorite command line interface and run the following command

```md
npm install -g learnyounode
```

When it's all installed, **do exercise 1 (HELLO WORLD) until 5 (FILTERED LS)**!

## 2. Node.js exercises

### 1. Create an HTTP web server

> Inside your `week1` folder, create a folder called `node-exercises`

Create an HTTP web server using the native Node.js `http` module.

1. The server will be a functioning web server that can serve a very simple web site. When opening the server url in the browser e.g. `http:\\localhost:3000` the server needs to serve the following html:

```html
<html>
  <head>
    <title>My First Web Server</title>
  </head>
  <body>
    <div id="content"></div>
    <script src="script.js"></script>
  </body>
</html>
```

Do not forget to set the content-type to `text/html` so that the browser knows how to deal with the response.

2. Once the browser receives the html it will process it and detect the `script` tag. The browser will then try to load this script from the server at the endpoint `http:\\localhost:3000\script.js`. Your server needs to return a javascript that inserts some text under `content`.

```javascript
document
  .getElementById('content')
  .appendChild(document.createTextNode('Hello and Welcome to Server-land!'));
```

Do not forget to set the correct content-type.

Congratulations, you have created your very own working web server. In a nutshell this is how most web sites work. The client requests resources, then processes them based on the content type. This processing often leads to new requests and the cycle continues until everything is loaded and ready for the user to interact with.

3. _BONUS_: Our website is working, but looks really stale. Try adding some style to it. The style should be from an external source. Add this to your html (from step 1)

```html
<link rel="stylesheet" type="text/css" href="style.css" />
```

When the server gets a request at `http:\\localhost:3000\style.css` respond with some css e.g. `#content { color: blue }`. Don't forget the content-type and be creative.

## 3. Code along

We'll start this week off with a blast, by building a small application that allows you to add people's basic information to a page. This is done **dynamically**, meaning that new information can get loaded in the page without having to do a page refresh. You'll learn how to use [Express.js](https://expressjs.com/) and a templating engine (you'll learn more about that in week 3) called [Handlebars](https://handlebarsjs.com/).

Have fun!

- [Member App](https://www.youtube.com/watch?v=L72fhGm1tfE)

## 4. PROJECT: HackYourTemperature I

In this part of the homework you'll be setting up the basis of your project: `HackYourTemperature`. To start you first have to make a project folder. In the same folder that holds your other homework, create a new folder called `hackyourtemperature`. Then follow the following instructions:

1. Create a JavaScript file called `server.js` (it can be any name but this is more meaningful)
2. Initialize the Node Package Manager and create a `package.json` file by running `npm init`
3. Install and load in the necessary modules for this project
4. Set up your web server using Express (creating an Express instance, listen to **port 3000**)
5. Make a `GET` request to `/` that sends the message `hello from backend to frontend!` to the client

After writing all this code you can verify that it's working by running `node server.js` from the Command Line and checking your browser at `http://localhost:3000`. The page should display the message `hello from backend to frontend!`.

## **SUBMIT YOUR HOMEWORK!**

After you've finished your todo list it's time to show us what you got! Upload all your files to a forked repository (a copy from the teacher's). Then make a pull request to it.

If you need a refresher, take a look at the following [guide](../hand-in-homework-guide.md) to see how it's done.

The homework that needs to be submitted is the following:

1. Node.js exercises
2. Project: HackYourTemperature I

_Deadline Saturday 23.59 CET_
