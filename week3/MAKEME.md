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

## **3. Code alongs **

> Remember to upload the end code of all code alongs to your Github profile so that you can refer back to it anytime!

### 3.1 Templating

This week we introduced a new concept: the `templating engine`. In this small application a user will be able to add people's basic information to a page. This is done **dynamically**, meaning that new information can get loaded in the page without having to do a page refresh.

You'll learn how to use a templating engine called [Handlebars](https://handlebarsjs.com/).

Have fun!

- [Express JS Crash Course - Member App](https://www.youtube.com/watch?v=L72fhGm1tfE)

### 3.2 Mailer

Something that pretty much all applications have is the ability to send emails so I dont have to explain how important this is. Emails are sent for example to verify users, to recover accounts, to notify users of events, etc. You will need all the skills you have learned so far, but I promise you that it will be a lot of fun.

[Nodemailer - Send Emails From Your Node.js App](https://www.youtube.com/watch?v=nF9g1825mwk&t=469s)

## **4. PROJECT: HackYourTemperature III**

> This week you'll finish `HackYourTemperature`. Continue working from `/homework/hackyourtemperature`

### 4.2 The Backend

We will need to integrate the templating engine into our backend.

### 4.3 The Frontend

In the frontend we're going to add one thing:

1. Navigate to `index.handlebars`. Underneath the `<form>`, add a `<p>`. Give it the following content: `{{ weatherText }}` (Notice how the name `weatherText` refers back to the key in the object passed in the `render()`)

Now test out your work to see if it behaves as expected. Run your server with `node server.js`. Open your browser at the right port and fill in the form. On submit there should appear a message underneath the form, that either says that the city isn't found or what the temperature is.

**YOU JUST BUILT YOUR VERY FIRST FULL STACK APPLICATION!**

![Success Kid](https://i.pinimg.com/474x/ef/c9/9b/efc99bd36587b1f8acc8a51cd2f9f861--kidney-surgery-kid-memes.jpg)

## **SUBMIT YOUR HOMEWORK?**

There is no homework to submit this week. You _will_ have a test, however!

Have a look at your class channel to see what is expected, there will be a post up at the beginning of the week!
