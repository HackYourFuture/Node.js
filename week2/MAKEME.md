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

> Inside of your `Node.js` fork, go to the folder `week2`. Inside of that folder, create a folder called `nodejs-exercises`.

### Make a blog API

Anyone here still remember blogs!? They were all the rage around 10 years ago. We are a bit late to the party, but I think we can still make some money with a blog application. Since you just learned about REST and APIs we are going to use them when writing this application. The resource in the application are blog `posts`. Each blog post will have a `title` and `content`. The `title` will also serve as an`id` uniquely identifying a blog post.

We want our blog posts to be stored `persistently` so that they do not dissapear when the Node.js application is restarted. To achieve this, each blog post will be stored as a separate file on the hard drive. 

Let's start by setting up our environment.

**Setup:**  
Step 0. Creata a new empty folder e.g. `exercise1`  
Step 1. In the folder you just created, initalize npm  
Step 2. Create a javascript file that will hold your code  
Step 3. Install and require express  
Step 4. Write or copy code from lecture to start an express server on port 3000.

That was not too hard now was it. Before we start coding we need to define what operations will be supported via our API.

| Operation | Description | Method | Route |
| --------- | ----------- | ------ | ----- |
| Create    | Given a title and content create a new post |  |  |
| Read one  | Given a title, return the content of a single blog post |  |  |
| Update    | Given a title and content update an existing blog post |  |  |
| Delete    | Given a title delete an existing blog post |  |  |

Take a minute to fill in the correct method and route in the table above.
Let us start with

**Creating a new post**

To create a new blog posts, the body of the request should contain a json with `title` and `content` , e.g. `{ "title": "My first blog", "content": "Lorem ipsum" }`. The blog posts will be stored in separate files using the `fs` module. The idea is that the name of the file will match the title of the blog post while the content will be stored as the content of the file. You can use the following starter code:

```javascript
const fs = require("fs");
app.<METHOD>('/posts', (req, res) => {
    // How to get the tiтle and content from the request??
    // what if the request does not have a title and/or content
    fs.writeFileSync(title, content);
    res.end('ok')
})
```

You need to fill in the correct method and figure out how to get the title and content from the request.

Use Postman to test that your code works. You should get a response `ok` and see a new file `My first blog` in your `exercise1` folder.

Hint: Remember `express.json()`. Why did we use it during our lectures?

![Obama not bad](https://nwlc.org/wp-content/uploads/2016/09/notbad.jpg)

Up next:

**Updating existing post**

Updating posts is very similar to creating them. This time we are going to use a _url parameter_ in express to send the `title` while the `content` will be part of the `body`. Make sure to use the correct `HTTP METHOD` and check that the blog post under update already exists with `fs.existsSync(title)`.

```javascript
app.<METHOD>('/posts/:title', (req, res) => {
    // How to get the title and content from the request??
    // what if the request does not have a title and/or content
    if (fs.existsSync(title)) {
      fs.writeFileSync(title, content);
      res.end('ok')
    }
    else {
      // post not found
    }
})
```

Use Postman to test that your code works. Try updating an existing post. Does it work? Now try updating a post that does not exist. Do you get the correct response and status code?

Next up:

**Deleting a post**

When deleting a post the corresponding file should be deleted. Since we are deleting a file there is no need to send any content in the request. To delete a file in Node use `fs.unlinkSync(<filename>)`:

```javascript
app.<METHOD>('/posts/:title', (req, res) => {
    // How to get the title from the request?
    fs.unlinkSync(title);
    res.end('ok');
})
```

Use Postman to test that your code works. Remember to use the correct url, for example: `http://localhost:3000/blogs/My first blog`

That was almost too easy, right? Next up, the hardest part:

**Reading a post**

To read a post the user needs to open the url `http:\\localhost:3000\blogs\My First Blog`. The server needs to send back the content of the file `My First Blog`. In express this can be done with the `res.sendfile(<filename>)` command.

```javascript
app.<METHOD>('/blogs/:title', (req, res) => {
    // How to get the title from the request?
    res.sendfile(title);
})
```

**Use Postman to test that your code works.**

All done? Then, _Congratulations_

![Congratulations](https://media.giphy.com/media/l1AsI389lnxkvQHAc/giphy.gif)

**Bonus: Reading all posts**
In addition to reading the content of a single post build an operation that reads all existing posts. To limit the size of response only send the title of the blog posts, e.g. `[{"title":"My First Blog"}, {"title":"Second Blog"}]`

```javascript
app.<METHOD>('/blogs', (req, res) => {
    // how to get the file names of all files in a folder??
})
```

## **3. Code along**

> The _code along_ section is designed to give you an idea of how different concepts fit together. You do not have to submit your code, but you have to finish the code along.

We'll start this week off with a blast, by building a small application that allows you to add people's basic information to a page. This is done **dynamically**, meaning that new information can get loaded in the page without having to do a page refresh. You'll learn how to use [Express.js](https://expressjs.com/) and a templating engine (you'll learn more about that in week 3) called [Handlebars](https://handlebarsjs.com/).

Have fun!

- [Express JS Crash Course - Member App](https://www.youtube.com/watch?v=L72fhGm1tfE)

## **4. PROJECT: HackYourTemperature II**

> This week you'll continue building on `HackYourTemperature`. Inside the folder `homework`, create a new folder called `hackyourtemperature`.

So far you've build a basic web server. We loaded in the necessary modules. We have one `end point`, which is `/`. We have activated the server, by `listening` to it.

This week's homework will be 2 parts:

1. making templates to create a frontend that will be a simple page with a form
2. creating a `POST` route that will allow us to access the submitted form data.

### The Frontend

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

### The Backend

In this part we'll add another endpoint, with a `POST` method.

1. First let's modify our `/` route. Instead of sending a string, send a template using the `render()` function. Pass in the name of the template, which is `index`
2. To make Express aware of what data type the incoming data is (which is JSON). We do that using the `urlencoded()` method on the express object. Using the `use()` function from `app`, pass in the `urlencoded()` from `express`. Give the `urlencoded()` function the following argument: `{ extended: true }`
3. Create a `POST` route, that has as an endpoint: `/weather`
4. Inside the callback function of the route, get access to the `cityName` and put it inside a variable. Hint: use the `body` object from the request to find it.
5. Send the the form input back as a response to the client

Test out your work and make sure that any time you submit something in the form, it returns as a response from the server the exact words you submitted.

## **SUBMIT YOUR HOMEWORK!**

After you've finished your todo list it's time to show us what you got! Upload all your files to your forked repository (a copy from the teacher's). Then make a pull request to it.

If you need a refresher, take a look at the following [guide](../hand-in-homework-guide.md) to see how it's done.

The homework that needs to be submitted is the following:

1. Node.js exercises
2. Project: HackYourTemperature II

_Deadline Saturday 23.59 CET_
