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

> Inside of your `Node.js` fork, go to the folder `week3`. Inside of that folder, create a folder called `homework`. Inside, create a folder called `nodejs-exercises`. This will contain all the files for the following section.

### **Exercise 1: Chuck Norris programs do not accept input**

Did you know that there is an API for Chuck Noris jokes. That's incredible, right?

Write a small node program (not a server) that calls the this API http://www.icndb.com/api/ and prints a random joke to the conole.

Step 0. Create a new folder e.g. `exercise1`. Honestly guys do I even have to say this anymore.  
Step 1. In the folder you just created, initalize npm.  
Step 2. Create a javascript file that will hold the code for your program.  
Step 3. Install and require `node-fetch`.  
Step 4. GET a random joke from the URL http://www.icndb.com/api/  
Step 5. Print the joke to the console

Hints:

- Print the entire response to the concole to see how it is structured.

_This is the last time that steps 0-2 are explicitly written. For the next exercise I am assuming you know this already._

### **Exercise 2: Authentication**

So far all the APIs we used would happily respond to any request. In reality, most APIs hold sensitive information that should not be accessible for everyone. In order to guard the data APIs use some way to authenticate the user. The simplest form of authentication is called _basic_. Similarly to how you log in to a website, the basic authentication expect a username and a password. This is sent in the request as part of the header, under the type: `Authorization`. The content of the header is: `Basic <username>:<password>`. Naturally, there is catch. The username and password are not sent as plain text, but need to be encoded in base64, which is a type of encoding text for use in HTTP.

For this exercise you need to write a program thats calls the API https://restapiabasicauthe-sandbox.mxapps.io/api/books and prints the response to the console.

You need to use the credentials `admin:hvgX8KlVEa` to authenticate.

Step 1. Feel free to copy and modify the code from the previous exercise.  
Step 2. Visit https://www.base64encode.org/ to convert `admin:hvgX8KlVEa` to base64  
Step 3. Set the authorization header in the GET request - `fetch(<URL>,{ headers: { 'Authorization': 'Basic XXXXXX' } }`  
Step 4. Print the response

_Bonus_ points if you can encode the username and password to base64 using javascript code.

### **Exercise 3: Party time**

Write a program that makes a reservation for the biggest party on the planet and prints the response. I will not explain how the API works, instead you should read the documentation - https://reservation100-sandbox.mxapps.io/rest-doc/api

Step 1. Feel free to copy and modify the code from the previous exercise.  
Step 2. Read the documentation https://reservation100-sandbox.mxapps.io/rest-doc/api#/reservations/post_reservations. Find out:

- which methods are available (GET or POST)
- what is the URL
- what headers are expected, and
- what should the request contain  
  Step 3. Print the response

Hints:

- to set headers use `fetch(<URL>, { headers: { 'XXXX': 'YYYY' } }`
- the documentation at https://www.npmjs.com/package/node-fetch can be of great help

### **Exercise 4: Fun with Handlebars**

Do you know the game [Cards against humanity](https://cardsagainsthumanity.com/). It's a game where players need to fill blanks in a sentence to make the funniest joke. For example, in the photo below

![cards against humanity](https://www.snopes.com/tachyon/2015/11/cards-against-humanity.png?resize=865,391)

The resulting phrase reads as: _Hope_ is a slipery slope that leads to a _dissapointing birthday party_.

Inspired by the game you want to write a node program that simulates playing the game.  
The program needs to fill in the blanks in the phrase `_______ is great to ________` and print the result to the console.

For the first blank select a random word from `subjects = ["shark", "popcorn", "poison", "fork", "cherry", "toothbrush", "cannon"]`
For the second blank select a random word from `punchlines = ["watch movie with", "spread some love", "put on cake", "clean toilets", "go to the moon", "achieve world piece", "help people learn programing"]`

You have to use Handlebars to replace the words.

Step 1. Install and require handlebar (not `express-handlebars`, just `handlebars`)  
Step 2. copy the subjects amd punchlines to javascript  
Step 3. write code that randomly picks a`subject` and `punchline`
Step 4. replace the blanks in `phrase` with the random `subject` and `punchline` using handlebars

Hints:

- To get a random number between 0 and 6 use `Math.floor(Math.random()*7)`
- [The documentation on handlebars has a nice example, check it out!](https://www.npmjs.com/package/handlebars#usage)

## **3. Code along**

> The _code along_ section is designed to give you an idea of how different concepts fit together. You do not have to submit your code, but you have to finish the code along.

This time you will build an application that sends emails. I dont have to explain how important this is. Almost every web application needs to send emails. Emails are sent for example to verify users, to recover accounts, to notify users of events, etc. You will need all the skills you have learned so far, but I promise you that it will be a lot of fun.

[Nodemailer - Send Emails From Your Node.js App](https://www.youtube.com/watch?v=nF9g1825mwk&t=469s)

## **4. PROJECT: HackYourTemperature III**

> This week you'll finish `HackYourTemperature`. Inside the folder `homework`, create a new folder called `hackyourtemperature`.

This week we'll add our external API that we're going to work with: [Open Weather Map](https://openweathermap.org/). The goal this week is to learn how to use data from the frontend to use in an API call from the backend, and then to send the result back to the frontend.

### The API

1. We first have to make an account: do so via [the website](https://openweathermap.org/appid)
2. Go back to your project folder and create a new folder called `sources`. Inside create a file called `keys.json`. Go to your OpenWeatherMap account, find the API Key and copy it into `keys.json`

### The Backend

1. First remove the response from last week
2. Inside of the the `POST` route, bring in `axios` and insert the API endpoint: `https://api.openweathermap.org/data/2.5/weather`. For it to work we first have to add the API Key, like so:

```js
const APIKEY = require('./sources/secrets.json').API_KEY;
axios(`https://api.openweathermap.org/data/2.5/weather?APPID=${API_KEY}`);
```

There are 2 situations that could happen: if the city name is not found, we want to send to the client a response with a message that the city isn't found. Or the city is found, and then we want to return a message that contains the city name and current temperature. Let's take a look at the first one:

3. If the result is not found, we `render()` to the page the `index` (just like in the `/` endpoint). However, also add a second argument, an object: `{ weatherText: "City is not found!" }`
4. If the result is found, we also `render()` to the page the `index`. Also add here the object. Only, instead of just a string dynamically add in the `cityName` and temperature (gotten from the result of the API call). Hint: use template strings to add variables in your strings!

### The Frontend

In the frontend we're going to add one thing:

1. Navigate to `index.handlebars`. Underneath the `<form>`, add a `<p>`. Give it the following content: `{{ weatherText }}` (Notice how the name `weatherText` refers back to the key in the object passed in the `render()`)

Now test out your work to see if it behaves as expected. Run your server with `node server.js`. Open your browser at the right port and fill in the form. On submit there should appear a message underneath the form, that either says that the city isn't found or what the temperature is.

## **SUBMIT YOUR HOMEWORK!**

After you've finished your todo list it's time to show us what you got! Upload all your files to your forked repository (a copy from the teacher's). Then make a pull request to it.

If you need a refresher, take a look at the following [guide](../hand-in-homework-guide.md) to see how it's done.

The homework that needs to be submitted is the following:

1. Node.js exercises
2. Project: HackYourTemperature III

_Deadline Saturday 23.59 CET_
