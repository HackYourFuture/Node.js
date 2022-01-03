# Homework Node.js Week 3

## Todo List

1. Practice the concepts
2. Prep exercises
3. Code along
4. PROJECT: HackYourTemperature III

## **1. Practice the concepts**

> The problems in the _practice the concepts_ section are designed to get you warmed up for the real exercises below. You do not have to submit your code, but you have to finish all the exercises.

This week you'll finish the command line exercises. Go back to `learnyounode` and start doing **exercises 9 (JUGGLING ASYNC) until 13 (HTTP JSON API SERVER)**

## **2. Prep exercises**

> Prep exercises are exercises that you should work on _before_ the session on Sunday. These are a little more difficult or show an important concept and as such are a great exercise to talk about with your mentor. Have a solution ready by Sunday as you may be asked to show what you did.

Inside your `Node.js` fork, go to the folder `week3`. Inside of that folder, navigate to `/prep-exercises`. For each exercise, you will find a separate folder. The `README` explains what needs to be done. There will also be some questions at the bottom to think about. Go through them _before_ the session on Sunday as it will be covered then.

## **3. Code alongs**

> Remember to upload the end code of all code alongs to your Github profile so that you can refer back to it anytime!

### 3.1 Templating

This week we introduced a new concept: the `templating engine`. In this small application a user will be able to add people's basic information to a page. This is done **dynamically**, meaning that new information can get loaded in the page without having to do a page refresh.

You'll learn how to use a templating engine called [Handlebars](https://handlebarsjs.com/).

Have fun!

- [Express JS Crash Course - Member App](https://www.youtube.com/watch?v=L72fhGm1tfE). Note that this tutorial is a little outdated as the `express-handlebars` library has changed its API. You will have to look at the `express-handlebars` documentation and see what changes are needed!

### 3.2 Mailer

Something that pretty much all applications have is the ability to send emails so I dont have to explain how important this is. Emails are sent for example to verify users, to recover accounts, to notify users of events, etc. You will need all the skills you have learned so far, but I promise you that it will be a lot of fun.

[Nodemailer - Send Emails From Your Node.js App](https://www.youtube.com/watch?v=nF9g1825mwk&t=469s)

## **4. PROJECT: HackYourTemperature III**

> This week you'll finish `HackYourTemperature`. Continue working from `/homework/hackyourtemperature`

This week it is all about integrating our templating engine with our API. Since we've already loaded in our package `express-handlebars`, we can get started immediately. If at any point you're stuck, try reading the [documentation](https://github.com/ericf/express-handlebars) or ask a question in Slack!

### 4.1. Set up the initial index.handlebars

1. We first have to make Express aware of the templating engine. We do this by using the `engine()` and `set()` functions. Paste in the following (and figure out what it does, by checking the [documentation](https://github.com/express-handlebars/express-handlebars)):

```js
import exphbs from "express-handlebars";

app.set("view engine", "handlebars");
app.engine("handlebars", exphbs({ defaultLayout: false }));
```

Also, as we are now going to use our templating engine we need to configure that we are using the url. Add the line:

```js
app.use(express.urlencoded({ extended: true }));
```

You can also remove a line now, hopefully you can figure out which line that is.

2. In the root of the project folder, create a new folder called `views`.
3. Create 1 `.handlebars` file inside the `views` folder, named `index.handlebars`
4. The content of `index.handlebars` should be a regular, complete HTML document. Write a basic structure, including a `<head>` and `<body>`. The latter should include a `<form>`. Make sure it has an `<input>` field, which should be of `type="text"` and have a `name="cityName"`. Also add a submit button. The form should be submitted to our `POST` request endpoint, which is `/weather`. Let the form know about this endpoint by passing it as a value to the `action` property: `action="/weather"`
5. Now we need our `GET` endpoint to render this page by changing the response to call the `render` function.
6. Test out your work! Make sure it renders a form in your browser when you go to `localhost:3000`

### 4.1.2 Grab the cityName

When you now press the submit button it breaks. The problem is that our `POST` endpoint still returns json, so we will have to fix that.

1. Change the lines of code where you send back the json object and send the template back using the `render` function, but include an object with the `weatherText` variable. TIP: you can add an object as the second argument!
2. Navigate to `index.handlebars`. Underneath the `<form>`, add a `<p>`. Give it the following content: `{{ weatherText }}` (Notice how the name `weatherText` refers back to the key in the object passed in the `render()`). The `{{}}` syntax is our handlebars syntax to tell it to substitute information in there.

Check in the browser if this works. Enter a city and you should see the temperature in your p tag. Pretty cool!

### 4.2. We are done right?

WRONG! Remember the tests we wrote last week? Those will not be happy that right now we are not returning objects anymore. If you run your tests now you will see that they all fail.

So there are two ways to deal with this. The tests we wrote treat our code as a black box, we send a request and we check what we get back. We can keep on this track, but now we have to also mock or configure our tests to do something with handlebars. This could get complicated really fast, and if we get html back anyway it is probably better to test using something that can work with the html easily. In this case you would want to use something like [cypress](https://www.cypress.io/) to test this application.

The other way to think about this is to decide that we don't need to test `handlebars` and its rendering function, that is the responsibility of those developers and they will have their test cases. The end point functions right now do a LOT of work (we guess) and could very well be split up to have all the functionality in a separate function. Then we can have the end point call this function to get the data and then put it in the render function. We can then adjust our tests to test the separated function rather than the whole endpoint.

In the real world you will probably have both of these tests, and usually have a QA engineer write the cypress ones and you as the developer of the API the jest ones.

We will leave the `cypress` test as something to play around with when you find the time (you now have a nice small application that serves as a great minimal app to try cypress with), but do make sure that you separate your code so that your tests work again.

TIPS:

- You will want to create a new file for your function
- Your `app.test.js` should not need `supertest` anymore and will only need to import the new file.
- You should probably look at the naming of your files again!

**YOU JUST BUILT YOUR VERY FIRST FULL STACK APPLICATION WITH TESTING!**

![Success Kid](https://i.pinimg.com/474x/ef/c9/9b/efc99bd36587b1f8acc8a51cd2f9f861--kidney-surgery-kid-memes.jpg)

## **SUBMIT YOUR HOMEWORK?**

There is no homework to submit this week. You _will_ have a test, however!

Have a look at your class channel to see what is expected, there will be a post up at the beginning of the week!
