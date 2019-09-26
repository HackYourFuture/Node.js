# Homework Node.js Week 3

## Todo List

1. Practice the concepts
2. Node.js exercises
3. Code along
4. PROJECT: HackYourTemperature III

## 1. Practice the concepts

This week you'll finish the command line exercises. Go back to `learnyounode` and start doing **exercises 11 (HTTP FILE SERVER ) until 13 (HTTP JSON API SERVER)**

## 2. Node.js exercises

### **Exercise 1: Chuck Norris programs do not accept input**

Did you know that there is an API for Chuck Noris jokes. That's incredible, right?

Write a small node program (not a server) that calls the this API http://www.icndb.com/api/ and prints a random joke to the conole.

Hints:

- You need to install and require `node-fetch`.
- Print the entire response to the concole to see how it is structured.

### **Exercise 2: Authentication**

So far all the APIs we used would happily respond to any request. In reality, most APIs hold sensitive information that should not be accessible for everyone. In order to guard the data APIs use some way to authenticate the user. The simplest form of authentication is called _basic_. Similarly to how you log in to a website, the basic authentication expect a username and a password. This is sent in the request as part of the header, under the type: `Authorization`. The content of the header is: `Basic <username>:<password>`. There is catch. The username and password are not transimtted as plain text, but need to be encoded in base64.

For this exercise you need to write a program thats calls the API https://restapiabasicauthe-sandbox.mxapps.io/api/books and prints the response to the console.

You need to use the credentials `admin:hvgX8KlVEa` to authenticate.

Hints:

- use https://www.base64encode.org/ to convert `admin:hvgX8KlVEa` to base64
- to set the authorization header `fetch(<URL>, { headers: { 'Authorization': 'Basic XXXXXX' } }`

_Bonus_ points if you can encode the username and password to base64 using javascript code.

### **Exercise 3: Party time**

Write a program that makes a reservation for the biggest party on the planet and prints the response. I will not explain how the API works, instead you should read the documentation - https://reservation100-sandbox.mxapps.io/rest-doc/api#/reservations/post_reservations

Hints:

- to set headers use `fetch(<URL>, { headers: { 'XXXX': 'YYYY' } }`
- the documentation at https://www.npmjs.com/package/node-fetch can be of great help

### **Exercise 4: Fun with Mustache**

Do you know the game [Cards against humanity](https://cardsagainsthumanity.com/). It's a game where players need to fill blanks in a sentence to make the funniest joke:

![cards against humanity](https://www.snopes.com/tachyon/2015/11/cards-against-humanity.png?resize=865,391)

Inspired by the game you want to write a program that simulates playing the game.  
The program needs to fill in the blanks in the phrase: `_______ is great to ________` and print the result to the console.

For the first blank select a random word from `subjects = ["shark", "popcorn", "poison", "fork", "cherry", "toothbrush", "cannon"]`
For the second blank select a random word from `punchlines = ["watch movie with", "spread some love", "put on cake", "clean toilets", "go to the moon", "achieve world piece", "help people learn programing"]`

You have to use Mustache to replace the words - https://github.com/janl/mustache.js

Hints:

- To get a random number between 0 and 6 use `Math.floor(Math.random()*7)`
- Remember to install and require mustache before you use it in code
- [The documentation on mustache has a very nice example, try it out!](https://github.com/janl/mustache.js#usage)

## 3. Code along

In the final week of this module you'll learn how to build your own version of a "user login system". You'll do it using Node.js and Express.js, technologies you're already familiar with. What you're probably not familiar with is is certain technologies (MongoDB/Mongoose and EJS) and processes (`authentication`, `validation` and `protected routes`).

Don't worry too much about not understanding everything. Most of what you're doing here will be repeated continuously. Just follow along and learn a lot!

- [Basic Login System, with Node.js and Passport](https://www.youtube.com/watch?v=6FOq4cUdH8k)

## 4. PROJECT: HackYourTemperature III

## **SUBMIT YOUR HOMEWORK!**

After you've finished your todo list it's time to show us what you got! Upload all your files to a forked repository (a copy from the teacher's). Then make a pull request to it.

If you need a refresher, take a look at the following [guide](../hand-in-homework-guide.md) to see how it's done.

The homework that needs to be submitted is the following:

1. Node.js exercises
2. Project: HackYourTemperature III

_Deadline Saturday 23.59 CET_
