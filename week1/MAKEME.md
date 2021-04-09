# Homework Node.js Week 1

## Todo List

1. Crash course
2. Practice the concepts
3. Node.js exercises
4. Code along
5. PROJECT: HackYourTemperature I
6. Get your CV ready!

> Before we proceed, let's check to see if we have the latest versions of Node.js and the Node Package Manager (NPM) installed. You can do that by going to the Command Line (CLI) and running `node -v` and `npm -v`. Node.js should be at least **v12** and NPM should be at least **v6**.

## **1. Crash course**

There is a great crash course available here: https://www.youtube.com/watch?v=fBNz5xF-Kx4. Watch it and code along.

## **2. Practice the concepts**

> The problems in the _practice the concepts_ section are designed to get you warmed up for the real exercises below. You do not have to submit your code, but you have to finish all the exercises.

In this week's interactive exercises, we'll be going back to the command line. We'll be using software from [Nodeschool](https://nodeschool.io/) to do some exercises.

Go to your favorite command line interface and run the following command

```md
npm install -g learnyounode
```

When it's all installed, execute the command:

```md
learnyounode
```

And the menu will open up. **Do exercise 1 (HELLO WORLD) until 5 (FILTERED LS)**!

## **3. Node.js exercises**

> Inside of your `Node.js` fork, go to the folder `week1`. Inside of that folder, navigate to `/homework/exercises`. For each exercise, you will find a separate folder.

### **Exercise 1: Pad numbers**

Lets practice how to use code from other developers in our applications. In the file `/1-pad-numbers/padLeft.js` you will find a function I wrote the other day. Study the function and read the description to understand what it does.

Your task is to use this function in another file `1-pad-number/script.js`. Open the file and follow the instructions.

### **Exercise 2: To the left, to the left...**

Oh no! A senior developer from your team Slacks you that he tried to pad some numbers to 8 characters and it was not working at all. He asks you (politely) to fix the bug as soon as possible or face the wrath of management.

When you look at the function code you realize that the function only works up to 5 characters.

```javascript
// This change doesn't satisfy our needs!
function padLeft(val, num, str) {
	return '00000'.replace(/0/g, str).slice(0, num - val.length) + val;
}
```

What a stupid function! For a moment, you consider to rename the file to `terrible-function.js`, but realize that will not help your situation in any way. You could add three zeroes so that it works for 8 characters:

```javascript
// This change doesn't do much for us either...
function padLeft(val, num, str) {
	return '00000000'.replace(/0/g, str).slice(0, num - val.length) + val;
}
```

Then it would be just a matter of time before someone tries to use it for 9 characters and you get the same issue. You scour StackOverflow for related questions and discover that there is already a function that pads numbers, available through NPM: [left-pad](https://www.npmjs.com/package/left-pad).

Perfect! Let's use this module instead. Follow the steps:

1. Open the folder `/2-left-pad`
2. Initialize NPM using `npm init`, to create a `package.json` file
3. Copy and paste your code from the previous exercise in `script.js`
4. Follow the instructions on the website - from https://www.npmjs.com/package/left-pad on how to install and require the `left-pad` package inside of `script.js`
5. Replace the call to function `padLeft` to use this new NPM package called `left-pad` instead
6. Pad the numbers to 8 characters and check if everything works correctly

Tips:

-   Make sure you're in the correct directory when running `npm install left-pad`

### **Exercise 3: Create an HTTP web server**

In this exercise, you will build a simple web server. It will only serve one HTML file and one JavaScript file. This is enough for a minimal web site.

To help you get started some code is already provided for you. Check the file `3-web-server` and try to understand what the code does.

Check that the code is working fine by running it and opening the web site in your browser at `http:\\localhost:3000`. You should see the text `Hello World!`. While working on this exercise and the project, make sure to constantly check that your changes work as expected by running your code and checking the browser.

Your job is to change the code so that it serves HTML instead of just `Hello World!`.

Using node, read the contents of the file `index.html` then send it as a response. Make sure to set the correct `Content-Type` header.

Run the code and check that it works by opening a browser at `http:\\localhost:3000`.

If you open the Network tab (in the developer tools of your browser) you will notice that the browser tries to load the JavaScript `index.js`, but fails. This is because our server does not **serve** this file yet.

So far the server only serves one thing, the HTML file. In order to serve different things, we somehow have to determine what is being requested. This is where the `request.url` comes in.

If you open the Network tab you can see that when the browser is requesting the HTML code it is using the url `http://localhost:3000/`. On the other hand, when the browser is requesting the javascript it is using the url `http://localhost:3000/index.js`.

Let's change our code to send a different response, depending on the request URL.

To do this you need to write 2 conditional if statements. 
1. If the URL is `/` send the HTML file, same as before
2. If the URL is `/index.js` send the corresponding JavaScript file after reading it from the file system. Don't forget to set the correct `Content-Type` header.

Run the code and check that it works by opening a browser at `http://localhost:3000`. You should see the message _Welcome to Server-land!_.

Congratulations, you have created your very own working web server!

> In a nutshell this is how most web sites work. The client requests resources, server sends them, then the client processes the response based on the content type. This processing often leads to new requests and the cycle continues until everything is loaded and ready for the user to interact with.

Tips:
-  To set a response header [response.setHeader(name, value)](https://nodejs.org/api/http.html#http_response_setheader_name_value)
-  To read a file from the file system [fs.readFileSync(path)](https://nodejs.org/docs/latest-v12.x/api/fs.html#fs_fs_readfilesync_path_options)
-  Tired of restarting your server!? [nodemon](https://www.npmjs.com/package/nodemon) is here to help.

_BONUS_  
 Our website is working, but looks stale. Try adding some style to it. The style should be from an external source. Add this to your HTML file.

```html
<link rel="stylesheet" type="text/css" href="style.css" />
```

When the server gets a request at `http://localhost:3000/style.css` respond with a CSS file that contains some basic CSS rules e.g. `#content { color: blue }`. Don't forget to specify the `Content-Type` in the header of the request!

## **4. Code along**

> Create a new GitHub repository for this project. It's a portfolio piece!

In this application you'll be building an Ebook Sales Application. You'll make it possible to add new books to a list of books. You'll even learn how to put it out online, so you can get a URL that you can use to access your application anywhere.

Enjoy!

-   [Ebook Sales Application](https://www.youtube.com/watch?v=QT3_zT97_1g)

## **5. PROJECT: HackYourTemperature I**

> In this part of the homework you'll be setting up the basis of your project: `HackYourTemperature`. Inside the folder `homework`, create a new folder called `hackyourtemperature`. You'll add to it every week.

In this module you'll be rebuilding an existing application, starting from scratch. The application is called `HackYourTemperature` and you can find it here: [HackYourTemperature](https://hackyourtemperature.herokuapp.com/).

Each week you'll be building a certain part of it. This week we'll get started with creating a web server, using [Express.js](https://expressjs.com/).

1. Create a JavaScript file called `server.js` (it can be any name but this is more meaningful)
2. Initialize the Node Package Manager and create a `package.json` file by running `npm init -y`
3. Install and load in the necessary modules for this project: they are `express` (our web server), `express-handlebars` (our templating engine) and `axios`
4. Set up your web server using Express (creating an Express instance, listen to **port 3000**)
5. Make a `GET` request to `/` that sends the message `hello from backend to frontend!` to the client

After writing all this code you can verify that it's working by running `node server.js` from the Command Line and checking your browser at `http://localhost:3000`. The page should display the message `hello from backend to frontend!`.

## 6. Get your CV ready!

In this final exercise you have to prepare the first draft of your CV. Before preparing and submitting your CV, please look at the following link: [http://bit.ly/cvpreparation](http://bit.ly/cvpreparation).

When you feel prepared enough please fill in the following form:

-   [Fill in your CV details!](https://hackyourfuture.typeform.com/to/nbktd8)

## **SUBMIT YOUR HOMEWORK!**

After you've finished your todo list it's time to show us what you got! Have a look at the following [guide](../hand-in-homework-guide.md) to see how it's done.

The homework that needs to be submitted is the following:

1. Node.js exercises
2. Project: HackYourTemperature I

_Deadline Tuesday 23.59 CET_
