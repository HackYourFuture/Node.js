# Homework Node.js Week 3

## Todo List

1. Practice the concepts
2. Node.js exercises
3. Code along
4. PROJECT: HackYourTemperature III

## 1. Practice the concepts

### 1.1. Chuck Norris programs do not accept input.

Did you you know that there is an API for Chuck Noris jokes. That's incredibly, right?

Write a small node program (not a server) that calls the this API http://www.icndb.com/api/ and prints a random joke to the conole.

Hints:  
* You need to install and require `node-fetch`. 
* Print the entire response to the concole to see how it is structured. 

### 1.2. Authentication

So far all the APIs we used would happily respond to any request. In reality, most APIs hold sensitive information that should not be accessible for everyone. In order to guard the data APIs use some way to authenticate the user. The simplest form of authentication is called *basic*. Similarly to how you log in to a website, the basic authentication expect a username and a password. This is sent in the request as a header `Authorization`. The content of the header is: `Basic <username>:<password>`. There is catch. The username and password are not transimtted as plain text, but need to be encoded in base64.

For this exercise you need to write a program thats calls the api https://restapiabasicauthe-sandbox.mxapps.io/api/books and prints the response to the console.

You need to use the credentials `admin:hvgX8KlVEa` to authenticate.

Hints:  
* use https://www.base64encode.org/ to convert `admin:hvgX8KlVEa` to base64
* to set the authorization header `fetch(<URL>, { headers: { 'Authorization': 'Basic XXXXXX' } }`

_Bonus_ points if you can encode the username and password to base64 using javascript code.

### 1.3. Party time

Write a program that makes a reservation for the biggest party on the planet and prints the response. I will not explain how the API works, instead you should read the documentation - https://reservation100-sandbox.mxapps.io/rest-doc/api#/reservations/post_reservations

Hints:
* to set headers use `fetch(<URL>, { headers: { 'XXXX': 'YYYY' } }`
* the documentation at https://www.npmjs.com/package/node-fetch can be of great help

## 2. Node.js exercises

## 3. Code along

## 4. PROJECT: HackYourTemperature III

## **SUBMIT YOUR HOMEWORK!**

After you've finished your todo list it's time to show us what you got! Upload all your files to a forked repository (a copy from the teacher's). Then make a pull request to it.

If you need a refresher, take a look at the following [guide](../hand-in-homework-guide.md) to see how it's done.

The homework that needs to be submitted is the following:

1. Node.js exercises
2. Project: HackYourTemperature III

_Deadline Saturday 23.59 CET_
