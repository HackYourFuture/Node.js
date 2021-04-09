# Homework Node.js Week 3

## Todo List

1. Practice the concepts
2. Node.js exercises
3. Code along
4. PROJECT: HackYourTemperature III

## **1. Practice the concepts**

> The problems in the _practice the concepts_ section are designed to get you warmed up for the real exercises below. You do not have to submit your code, but you have to finish all the exercises.

This week you'll finish the command line exercises. Go back to `learnyounode` and start doing **exercises 11 (HTTP FILE SERVER ) until 13 (HTTP JSON API SERVER)**

## **2. Node.js exercises**

> Inside of your `Node.js` fork, go to the folder `week3/homework/exercises`. Inside of that folder you will find separate folders for each exercise where you should write your code.

### **Exercise 1: Chuck Norris programs do not accept input**

Did you know that there is an API for Chuck Norris jokes? That's incredible, right!?

Write a small JavaScript function that calls this API [The Internet Chuck Norris Databases](http://www.icndb.com/api/) and returns a random joke. You'll be using the `node` command to execute the JavaScript file. To `GET` a random joke inside the function, use the API: http://www.icndb.com/api/ (see `node-fetch`). Make use of `async/await` and `try/catch`.

Hints:  
- To install node dependencies you should first initialize npm
- Print the entire response to the console to see how it is structured.

### **Exercise 2: Authentication**

So far all the APIs we used would happily respond to any request. In reality, most APIs hold sensitive information that should not be accessible for everyone.

In order to guard the data APIs use some way to `authenticate` the user. To authenticate essentially means: to verify the identity of the user. Does the server "know" them, or is it a complete stranger?

The simplest form of authentication is appropriately called _basic_. Similarly to how you log in to a website, the basic authentication expect a username and a password. This is sent in the request as part of the header, under the type: `Authorization`. The content of the header is: `Basic <username>:<password>`.

Naturally, there is catch. The username and password are not sent as plain text, but need to be encoded in base64, which is a way of encoding text for use in HTTP.

For this exercise you'll make an API request using Node.js. You'll be making a request to an API that requires you to authenticate yourself.

The API can be found at https://restapiabasicauthe-sandbox.mxapps.io/api/books. In order to use it, you need to use the credentials `admin:hvgX8KlVEa` to authenticate. 

Follow the steps:

1. Visit https://www.base64encode.org/ to convert the following credentials to base64 encoding:

```md
admin:hvgX8KlVEa
```

2. Set the Authorization header and API URL in the GET request (use `node-fetch`)

```js
fetch(<INSERT_API_URL>, {
    headers: { 'Authorization': 'Basic <INSERT_BASE64_CREDENTIALS>' }
  });
```

3. Print the response to the console

Use `async/await` and `try/catch`

### **Exercise 3: Party time**

Are you excited for the biggest party on the planet? We are and we would like to invite everyone, but there is only a limited number of seats.

Start by taking a look at the documentation of the API: https://reservation100-sandbox.mxapps.io/rest-doc/api.
While reading the documentation make sure to note the following:

- Which methods are available (GET or POST)?
- What is the route?
- What headers are expected?
- What should the request body contain, and how it should be formatted?

After you understand the API, write a function that makes a reservation and logs the response to the console. Follow the steps:

1. Use `node-fetch` to make a request with the correct headers and body format
2. Make use of `async/await` and `try/catch`
3. Print the response to the console

Hints:

- To set headers use `fetch(<URL>, { headers: { 'XXXX': 'YYYY' } }`
- The documentation at https://www.npmjs.com/package/node-fetch can be of great help

### **Exercise 4: Fun with Handlebars**

Do you know the game [Cards Against Humanity](https://cardsagainsthumanity.com/)? It's a game where players need to fill blanks in a sentence to make the funniest joke. For example, in the photo below:

![cards against humanity](https://www.snopes.com/tachyon/2015/11/cards-against-humanity.png?resize=865,391)

The resulting phrase reads as: _Hope_ is a slippery slope that leads to a _disappointing birthday party_.

Inspired by the game _you want to write a Node.js function that simulates playing the game_. You'll do this with help of [Handlebars.js](https://handlebarsjs.com/), the templating engine we've been using to build this module's project.

Inside of this function you want to do the following:

- Randomly select 2 words needed to fill in the blanks in the phrase `_______ is great to ________` and print the result to the console.

Follow the steps:

1. Install and require [Handlebars](https://handlebarsjs.com/installation/). Note that it's just `handlebars`, not `express-handlebars`
2. Implement the `getRandomElement` function so that it returns a random element from an array.
3. The `drawCard` function should first define a variable (called `cardData`), which contains an object with 2 keys: `subject` and `punchline`.
4. Randomly assign to these keys values, taken from the corresponding arrays (make use of the `getRandomElement` function!):
5. Create a variable, called `card`, that contains a template literal with the following: `_______ is great to ________`. Replace the `___` with the Handlebars placeholders
7. Compile the `card` using the `compile` method
8. Combine the compiled template with `cardData` to get a complete sentence.
9. Log the result to the console!

Hints:

If you don't know how to use Handlebars, [the documentation has a nice example!](https://www.npmjs.com/package/handlebars#usage)

## **3. Code along**

> Create a new GitHub repository for this project. It's a portfolio piece!

This time you will build an application that sends emails. I dont have to explain how important this is. Almost every web application needs to send emails. Emails are sent for example to verify users, to recover accounts, to notify users of events, etc. You will need all the skills you have learned so far, but I promise you that it will be a lot of fun.

[Nodemailer - Send Emails From Your Node.js App](https://www.youtube.com/watch?v=nF9g1825mwk&t=469s)

## **4. PROJECT: HackYourTemperature III**

> This week you'll finish `HackYourTemperature`. Continue working from `/homework/hackyourtemperature`

This week we'll add our external API that we're going to work with: [Open Weather Map](https://openweathermap.org/). The goal this week is to learn how to make an API request from the backend, and then to send the result to the frontend.

### 4.1 The API

1. We first have to make an account: do so via [the website](https://openweathermap.org/appid)
2. Go back to your project folder and create a new folder called `sources`. Inside create a file called `keys.json`. Go to your OpenWeatherMap account, find the API Key and copy it into `keys.json`

### 4.2 The Backend

1. Remove the response from last week, we'll rewrite it later
2. Inside of the the `POST` route, bring in `axios` and pass the value of the API endpoint: `https://api.openweathermap.org/data/2.5/weather`. For it to work we first have to add the API Key, like so:

```js
const API_KEY = require('./sources/keys.json').API_KEY;
axios(`https://api.openweathermap.org/data/2.5/weather?APPID=${API_KEY}`);
```

Now, there are 2 situations that could happen: if the city name is not found, we want to send to the client a response with a message that the city isn't found. However, if the city is found and then we want to return a message that contains the city name and current temperature.

3. If the result is not found, we `render()` to the page the `index` (just like in the `/` endpoint). However, also add a second argument, an object: `{ weatherText: "City is not found!" }`
4. If the result is found, we also `render()` to the page the `index`. Also add here the object. Only, instead of just a string dynamically add in the `cityName` and temperature (gotten from the result of the API call). Hint: use template strings to add variables in your strings!

### 4.3 The Frontend

In the frontend we're going to add one thing:

1. Navigate to `index.handlebars`. Underneath the `<form>`, add a `<p>`. Give it the following content: `{{ weatherText }}` (Notice how the name `weatherText` refers back to the key in the object passed in the `render()`)

Now test out your work to see if it behaves as expected. Run your server with `node server.js`. Open your browser at the right port and fill in the form. On submit there should appear a message underneath the form, that either says that the city isn't found or what the temperature is.

**YOU JUST BUILD YOUR VERY FIRST FULL STACK APPLICATION!**

![Success Kid](https://i.pinimg.com/474x/ef/c9/9b/efc99bd36587b1f8acc8a51cd2f9f861--kidney-surgery-kid-memes.jpg)

## **SUBMIT YOUR HOMEWORK!**

After you've finished your todo list it's time to show us what you got! Upload all your files to your forked repository (a copy from the teacher's). Then make a pull request to it.

If you need a refresher, take a look at the following [guide](../hand-in-homework-guide.md) to see how it's done.

The homework that needs to be submitted is the following:

1. Node.js exercises
2. Project: HackYourTemperature III

_Deadline Tuesday 23.59 CET_
