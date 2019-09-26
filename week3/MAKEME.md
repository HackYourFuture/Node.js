# Homework Node.js Week 3

## Todo List

1. Practice the concepts
2. Node.js exercises
3. Code along
4. PROJECT: HackYourTemperature III

## 1. Practice the concepts

> The problems in the *practice the concepts* section are designed to get you warmed up for the real exercises below. You do not have to submit your code, but you have to finish all the exercises.

This week you'll finish the command line exercises. Go back to `learnyounode` and start doing **exercises 11 (HTTP FILE SERVER ) until 13 (HTTP JSON API SERVER)**

## 2. Node.js exercises

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

So far all the APIs we used would happily respond to any request. In reality, most APIs hold sensitive information that should not be accessible for everyone. In order to guard the data APIs use some way to authenticate the user. The simplest form of authentication is called _basic_. Similarly to how you log in to a website, the basic authentication expect a username and a password. This is sent in the request as part of the header, under the type: `Authorization`. The content of the header is: `Basic <username>:<password>`. There is catch. The username and password are not transimtted as plain text, but need to be encoded in base64.

For this exercise you need to write a program thats calls the API https://restapiabasicauthe-sandbox.mxapps.io/api/books and prints the response to the console.

You need to use the credentials `admin:hvgX8KlVEa` to authenticate.

Step 1. Feel free to copy and modify the code from the previous exercise.
Step 2. Visit https://www.base64encode.org/ to convert `admin:hvgX8KlVEa` to base64
Step 3. Set the authorization header in the GET request - `fetch(<URL>, { headers: { 'Authorization': 'Basic XXXXXX' } }`
Step 4. Print the response

_Bonus_ points if you can encode the username and password to base64 using javascript code.

### **Exercise 3: Party time**

Write a program that makes a reservation for the biggest party on the planet and prints the response. I will not explain how the API works, instead you should read the documentation - https://reservation100-sandbox.mxapps.io/rest-doc/api#/reservations/post_reservations

Step 1. Feel free to copy and modify the code from the previous exercise.
Step 2. Read the documentation  https://reservation100-sandbox.mxapps.io/rest-doc/api#/reservations/post_reservations . Find out
    * which methods are available (GET or POST)
    * what is the URL
    * what headers are expected, and 
    * what should the request contain
Step 3. Print the response

Hints:

- to set headers use `fetch(<URL>, { headers: { 'XXXX': 'YYYY' } }`
- the documentation at https://www.npmjs.com/package/node-fetch can be of great help

### **Exercise 4: Fun with Mustache**

Do you know the game [Cards against humanity](https://cardsagainsthumanity.com/). It's a game where players need to fill blanks in a sentence to make the funniest joke:

![cards against humanity](https://www.snopes.com/tachyon/2015/11/cards-against-humanity.png?resize=865,391)

Inspired by the game you want to write a program that simulates playing the game.  
The program needs to fill in the blanks in the `_______ is great to ________` and print the result to the console.

For the first blank select a random word from `subjects = ["shark", "popcorn", "poison", "fork", "cherry", "toothbrush", "cannon"]`
For the second blank select a random word from `punchlines = ["watch movie with", "spread some love", "put on cake", "clean toilets", "go to the moon", "achieve world piece", "help people learn programing"]`

You have to use Mustache to replace the words - https://github.com/janl/mustache.js

Step 1. Install and require handlebar
Step 2. copy the subjects amd punchlines to javascript
Step 3. write code that picks a `subject` and `puncline` at random
Step 4. replace the blanks in `phrase` with the random `subject` and `punchline` using handlebars

Hints:

- To get a random number between 0 and 6 use `Math.floor(Math.random()*7)`
- Remember to install and require handlebars before you use it in code
- [The documentation on mustache has a very nice example, try it out!](https://github.com/janl/mustache.js#usage)

## 3. Code along

> The *code along* section is designed to give you an idea of how different concepts fit together. You do not have to submit your code, but you have to finish the code along.

This time you will build an application that sends emails. I dont have to explain how important this is. Almost every web application needs to send emails. Emails are sent for example to verify users, to recover accounts, to notify users of events, etc. You will need all the skills you have learned so far, but I promise you that it will be a lot of fun.

[Nodemailer - Send Emails From Your Node.js App](https://www.youtube.com/watch?v=nF9g1825mwk&t=469s)

## 4. PROJECT: HackYourTemperature III

## **SUBMIT YOUR HOMEWORK!**

After you've finished your todo list it's time to show us what you got! Upload all your files to a forked repository (a copy from the teacher's). Then make a pull request to it.

If you need a refresher, take a look at the following [guide](../hand-in-homework-guide.md) to see how it's done.

The homework that needs to be submitted is the following:

1. Node.js exercises
2. Project: HackYourTemperature III

_Deadline Saturday 23.59 CET_
