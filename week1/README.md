# HackYourFuture Node.js Week 1

## Agenda

1. What is backend?
2. What is Node.js?
3. Setting up Node.js
4. Getting started with our first Node.js project

## 1. What is backend?

In software development, we separate the user experience and utility (the `front end`) from the code that actually makes it work (the `back end`). The real world contains many examples of this division: take for example an [ATM](../images/atm.jpg). What you can interact with it (press a button or insert a card), you are dealing with the `user interface`; which is the end result of frontend code. However, everything that's needed to make it work like that is found within the device: this is the hardware and software needed to make it work the way it does.

In web development the term backend can be boiled down to 3 components:

- A `server`: a computer that is connected to other computers, which runs an application (see below) that allows for sharing and managing services (like a calculator or word processor) and resources (like images, text files).
- A `database`: software that manages and saves sensitive data for later use.
- An `application`: software that communicates between the server, database and frontend.

[Basics of backend development](https://www.upwork.com/hiring/development/a-beginners-guide-to-back-end-development/)

When people refer to backend programming, they usually refer to **writing the application** part of the backend: the software that interacts with a server and database, and moves data from one computer to the next. The application consists of code that will be read by a database and/or server, so that they know what to do with the incoming input.

## 2. What is Node.js?

Node.js is software that allows you to use JavaScript to write the `application` part of the backend. The application is written in different _.js_ files, and are then read and executed using the _node_ command in the Command Line. For example, `node script.js`.

Read the following article and code along: [Introduction into Node.js](https://codeburst.io/the-only-nodejs-introduction-youll-ever-need-d969a47ef219)

**Key insight: Software builds on other software**. Node.js is powerful because it allows us to use software others have written to help build our own unique applications. In Node.js these are called `modules`/`packages`/`dependencies` (can be used interchangeably). An easy way to get access to these is by using the Node Package Manager, also known as `npm`.

Read the following article and code along: [A Beginner’s Guide to npm — the Node Package Manager](https://nodesource.com/blog/an-absolute-beginners-guide-to-using-npm/)

It is also powerful because we can use the language we already know, JavaScript, to write backend applications.

## 3. Setting up Node.js

In order to make use of Node.js we have to install the software to our computer. We do this through the following:

1. Go to the [Node.js website](https://nodejs.org/en/)
2. Download and install the `LTS` version, which should be version `10.15.3` (make sure it's the right one for your operating system)
3. Open up your Command Line Interface and verify that it's installed: run the commands `node -v` and `npm -v`

For a more in-depth visualization of this (and to get some practice in immediately), watch the following [video](https://www.youtube.com/watch?v=fBNz5xF-Kx4)

## 4. Structure of these 3 weeks

In the following three weeks you'll be learning about `backend`, using Node.js as a means to that end. Every week you'll be reading about various backend concepts and then have homework that will help you practice what you've learned. This will be done in 2 parts:

1. You'll be doing exercises to practice each concept
2. You'll build a small full-stack application

Now that we've got the theory out of the way, let's get practical. Let's start building our very own Node.js-based full-stack application. We will call it **HackYourTemperature**, an app that allows one to type in a city and get back the real-time temperature. Here's how it will [look](https://quiet-sea-26203.herokuapp.com/).

It might not look like much, but a lot is happening on the backend. Let's get [started](homework/README.md)!

## Homework

Check [README.md](homework/README.md) in `homework` subdirectory and look at the class notes in [lecture](lecture)

## Prepare for next week

Read the [README.md](../week2/README.md) for week 2.
