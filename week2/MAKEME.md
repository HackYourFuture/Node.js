# Homework Node.js Week 2

## Todo List

1. Practice the concepts
2. Node.js exercises
3. Code along
4. PROJECT: HackYourTemperature II

## **1. Practice the concepts**

> The problems in the _practice the concepts_ section are designed to get you warmed up for the real exercises below. You do not have to submit your code, but you have to finish all the exercises.

This week you'll continue with the command line exercises. Go back to your command line and start doing **exercises 6 (MAKE IT MODULAR) until 10 (TIME SERVER)**

## **2. Node.js Exercises**

> Inside of your `Node.js` fork, go to the folder `week2`. Inside of that folder, navigate to `/homework/nodejs-exercises`. For each exercise, create the necessary files here.

### **Exercise 1: Make a blog API**

Anyone here still remember blogs!? They were all the rage around 10 years ago. We are a bit late to the party, but I think we can still make some money with a blog application.

Since you just learned about REST and APIs we are going to use them when writing this application. The resource in the application are `blogs`. Each blog will have a `title` and `content`.

We also want our blogs to be stored `persistently`. Data persistence means keeping the data you are working with around whether or not the service is restarted.

In the frontend this could be something simple like when a user is filling out a form, leaves the page and then comes back later, the form is still filled out where they left off.

In the backend it means that saving incoming data into separate files on the hard drive.

We'll do the same by saving each blog post as a separate file.

Let's start by setting up our environment. Follow the steps:

**Setup:**

1. Create a new empty folder e.g. `1-blog-api`
2. In the folder you just created, initialize a `package.json` file
3. Create a JavaScript file, called `server.js`, that will contain the server code
4. Install and require [Express.js](https://www.npmjs.com/package/express)
5. Create a basic Express setup, that has one endpoint (`/`).

That was not too hard now was it. Now you are ready for the real coding. We will start off by...

**1.1 Creating new posts**

To create a new blog post, we need 2 things:

1. A user that sends data from a client (for example, a webpage that contains a `<form>`)
2. A web server that listens to a request that comes in at a certain `endpoint`.

We won't work on the first point, but we'll assume the incoming data from the client will be in JSON format. For example: `{ "title": "My first blog", "content": "Lorem ipsum" }`.

Instead, we'll create another endpoint in our web server that will receive the data and store it into a separate file. The file storage will happen with use of [fs](https://nodejs.org/api/fs.html#fs_file_system), a native Node.js module that allows us to interact with our computer's file system so we can create new files.

Follow the steps:

1. Inside `server.js`, add the following starter code in the correct place:

```javascript
const fs = require("fs");

app.<METHOD>('/blogs', (req, res) => {
    // How to get the title and content from the request??
    fs.writeFileSync(title, content);
    res.end('ok')
})
```

2. Replace `<METHOD>` with the correct HTTP verb.
3. Figure out how to access the `title` and `content` properties from out of the request.

Hint: Remember `express.json()`. Why did we use it during our lectures?

After you've finished writing your code, use Postman to test that your code works. Send a request using the correct HTTP verb and URL. As the data you'll be sending in the request body, you can make use of the example: `{ "title": "My first blog", "content": "Lorem ipsum" }`. Make sure that you specify the`Content-Type` as JSON, though!

Expected output:
You should get a response `ok` and see a new file `My first blog` in your `1-blog-api` folder.

![Obama not bad](https://nwlc.org/wp-content/uploads/2016/09/notbad.jpg)

Up next:

**1.2 Updating existing posts**

Updating posts is very similar to creating them. You only need to use a different METHOD and add a check that the blog post that the user is trying to update already exists with `fs.existsSync()`.

Follow the steps:

1. Inside `server.js`, add the following starter code in the correct place:

```javascript
app.<METHOD>('/blogs', (req, res) => {
    if() { // Add condition here
      fs.writeFileSync(title, content);
      res.end('ok')
    } else {
      // Respond with message here
    }
})
```

2. Replace `<METHOD>` with the correct HTTP verb.
3. Add a condition: if the file with the given title exists, rewrite it with the given content. Otherwise response with a message, saying 'This post does not exist!'. Make use of the `fs.existsSync(title)`.

After you've finished writing your code, use Postman to test that your code works. Send a request using the correct HTTP verb and URL. As the data you'll be sending in the request body, you can make use of the example: `{ "title": "My first blog", "content": "This content is now updated!" }`.

Does it send the correct response in the case the post exists, or if it doesn't?

Expected output:
If the request could be handled, respond with 'ok', else respond with 'This post does not exist!'.

Next up:

**1.3 Deleting posts**

To delete a post we need to target a file by using an identifier: the title. However, instead of getting the title through the body of the request, we're going to get it from the `URL parameters`.

To delete a file with `fs`, we'll use the `fs.unlinkSync(<filename>)` method.

Follow the steps:

1. Inside `server.js`, add the following starter code in the correct place:

```javascript
app.<METHOD>('/blogs/:title', (req, res) => {
    // How to get the title from the url parameters?
    if () { // Add condition here
    fs.unlinkSync(title);
    res.end('ok');
    } else {
      // Respond with message here
    }
})
```

2. Replace `<METHOD>` with the correct HTTP verb.
3. Figure out how to get the `title` from the request.
4. Add a condition, only delete the file if it exists. Make use of the `fs.existsSync(title)` method.
5. Delete the file by passing the title to the `fs.unlinkSync()` method.

After you've finished writing your code, use Postman to test that your code works. Send a request using the correct HTTP verb and URL. No body content needed!

**1.4 Reading posts**

Wanting to read a file is the most common form of request a client can send. Type in `https://www.google.com/` into your browser and you are sending a request, wanting to read a file!

When a web server receives for a request wanting to read a file, it sends back a response including the file that needs to be read.

In our blog application, we'll be sending the correct file depending on the title of the blog. We specify this in our request by putting the title of that blog in the URL parameters, like `http://localhost:3000/blogs/blogtitle`.

The moment the web server gets a request coming in at our new endpoint, we'll look at the URL parameters and then respond with the correct file.

In Express this we can send a file in the response using the `res.sendFile(<filename>)` method.

Follow the steps:

1. Inside `server.js`, add the following starter code in the correct place:

```javascript
app.<METHOD>('/blogs/:title', (req, res) => {
    // How to get the title from the url parameters?
    res.sendFile(title);
})
```

2. Replace `<METHOD>` with the correct HTTP verb.
3. Figure out how to get the `title` from the request.
4. Add a condition, only send the file if it exists. Make use of the `fs.existsSync(title)` method.
5. Send a file using the `res.sendFile(<filename>)` method.

After you've finished writing your code, use Postman to test that your code works. Send a request using the correct HTTP verb and URL. No body content needed!

All done? Congratulations!

![Congratulations](https://media.giphy.com/media/l1AsI389lnxkvQHAc/giphy.gif)

## **3. Code along**

> Create a new GitHub repository for this project. It's a portfolio piece!

This week we'll practice with a new concept: the `templating engine`. You'll learn more about that next week, but for now just follow along.

In this small application a user will be able to add people's basic information to a page. This is done **dynamically**, meaning that new information can get loaded in the page without having to do a page refresh.

You'll learn how to use [Express.js](https://expressjs.com/) and a templating engine (you'll learn more about that in week 3) called [Handlebars](https://handlebarsjs.com/).

Have fun!

- [Express JS Crash Course - Member App](https://www.youtube.com/watch?v=L72fhGm1tfE)

## **4. PROJECT: HackYourTemperature II**

> This week you'll continue building on `HackYourTemperature`. Inside the folder `homework`, create a new folder called `hackyourtemperature`.

So far you've build a basic web server. We've loaded in the necessary modules. We have one `end point`, which is `/`. And we have activated the server, by `listening` to a port number.

This week's homework we will expand on that, in 2 parts:

1. We'll make templates to create a frontend that will be a simple page with a form
2. We'll create a `POST` route that will allow us to access the submitted form data

### 4.1 The Frontend

Since we've already loaded in our package `express-handlebars`, we can get started immediately. If at any point you're stuck, try reading the [documentation](https://github.com/ericf/express-handlebars) or ask a question in Slack!

1. We first have to make Express aware of the templating engine. We do this by using the `engine()` and `set()` functions. Paste in the following (and figure out what it does):

```js
app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
```

2. In the root of the project folder, create a new folder called `views`. Inside of this create another folder called `layouts`.
3. Create 2 `.handlebars` files: inside layouts create `main.handlebars` and outside of the folder `index.handlebars`
4. The content of `main.handlebars` should be the complete HTML document. Write a basic structure, including a `<head>` and `<body>`. As a final part, inside the `<body>` paste in the following: `{{ body }}` (this injects the HTML from `index.handlebars)` into the body)
5. The content of the `index.handlebars` should be a `<form>`. Make sure it has an `<input>` field, which should be of `type="text"` and have a `name="cityName"`. Also add a submit button. The form should be submitted to our `POST` request endpoint, which is `/weather`. Let the form know about this endpoint by passing it as a value to the `action` property: `action="/weather"`
6. Test out your work! Make sure it renders a form in your browser

### 4.2 The Backend

In this part we'll add another endpoint, with a `POST` method.

1. First let's modify our `/` route. Instead of sending a string, send a template using the `render()` function. Pass in the name of the template, which is `index`
2. To make Express aware of what data type the incoming data is (which is JSON). We do that using the `urlencoded()` method on the express object. Using the `use()` function from `app`, pass in the `urlencoded()` from `express`. Give the `urlencoded()` function the following argument: `{ extended: true }`
3. Create a `POST` route, that has as an endpoint: `/weather`
4. Inside the callback function of the route, get access to the `cityName` and put it inside a variable. Hint: use the `body` object from the request to find it.
5. Send the the form input back as a response to the client

Test out your work using Postman and make sure that any time you submit something in the form, it returns as a response from the server the exact words you submitted.

## **SUBMIT YOUR HOMEWORK!**

After you've finished your todo list it's time to show us what you got! Upload all your files to your forked repository (a copy from the teacher's). Then make a pull request to it.

If you need a refresher, take a look at the following [guide](../hand-in-homework-guide.md) to see how it's done.

The homework that needs to be submitted is the following:

1. Node.js exercises
2. Project: HackYourTemperature II

_Deadline Saturday 23.59 CET_
