> If you are following the HackYourFuture curriculum we recommend you to start with module 1: [HTML/CSS/GIT](https://github.com/HackYourFuture/HTML-CSS). To get a complete overview of the HackYourFuture curriculum first, click [here](https://github.com/HackYourFuture/curriculum).

> Please help us improve and share your feedback! If you find better tutorials or links, please share them by [opening a pull request](https://github.com/HackYourFuture/JavaScript1/pulls).

# Module #5 - Understand backend: creating web servers with JavaScript using Node.js (Backend)

![NodeJS](./assets/nodejs.png)

So far you've learned about the fundamentals of what makes up a webpage in your browser. We call this `frontend`: the HTML that gives structure to our pages, the CSS that give it a nice look, and the JavaScript that makes our page interactive. Everything you can "see" and "interact" with is made out of these technologies.

However, there is a whole part of applications that you might not be aware of. Have you ever wondered how data moves from one place to another, from one page to another?

This is where `backend` comes into play: all the parts of an application that can't directly be accessed by the user, but happen "behind the screen". Well here's the secret: there is code that tells the computer how to move and manipulate data. This code is hidden away from the user, because there is no need for them to know about it.

During the following 3 weeks you'll be learning all about this. As a tool to illustrate these concepts we will be using `Node.js`: software that allows us to use the language of JavaScript to write backend applications.

## Learning goals

In this module you will get familiar with the world of backend development. By the end of it you have learned:

- What is meant by the term `backend`
- The `client-server` model
- What `HTTP` and `REST` mean
- How to `create your own web servers` with Node.js, using `Express.js`
- What a `templating engine` is.
- How to use the `Node Package Manager (NPM)`.
- How to use Express.js to make a `RESTful API`
- How to build a small `full-stack application`

## Before you start

Before you start you need to install a very important software: Node.js! We're going to use the latest stable version of it, which is **v10.x**. Click on the following link to download it to your computer:

- For [Ubuntu](https://github.com/nodesource/distributions#debinstall)
- For [macOS](https://nodejs.org/en/download/)
- For [Windows](https://nodejs.org/en/download/)

Verify the installation by running `node -v` (-v is short for version) from the Command Line. It should say: `v12.13.0` or a later version than that.

## How to use this repository

This repository consists of 3 essential parts:

1. `Reading materials`: this document contains all the required theory you need to know _**while**_ you're coding. It's meant as both study material and as a reference to understand what you're doing.
2. `Homework`: this document contains the instructions for each week's homework.
3. `Lesson Plans`: this part is meant for teachers as a reference. However, as a student don't be shy to take a look at it as well!

After your first class you should start off with checking the `reading materials` for that week. At the beginning that would be the [Week 1 Reading](/Week1/README.md). Study all the concepts and try to get the gist of everything. After, you can get started with the `homework` for that week.

Before you start with the homework, make sure you've made a `fork` of the right repository: [HackYourHomework/Node.js](https://www.github.com/hackyourhomework/Node.js). Once you've cloned it to your computer you can proceed by making `GIT` branches for each week. Start at the `master` branch and execute the following (note that they're 3 different commands):

```console
foo@bar:~$ git branch week1-YOURNAME
foo@bar:~$ git branch week2-YOURNAME
foo@bar:~$ git branch week3-YOURNAME
```

Then execute `git checkout week1-YOURNAME` and you can get started!

If you have any questions or if something is not entirely clear ¯\\\_(ツ)\_/¯, please ask/comment on Slack!

## Planning

| Week | Topic                               | Readings                       | Homework                       | Lesson Plan                           |
| ---: | ----------------------------------- | ------------------------------ | ------------------------------ | ------------------------------------- |
|   1. | Client-server model, HTTP & Express | [Readings W1](week1/README.md) | [Homework W1](week1/MAKEME.md) | [Lesson Plan W1](week1/LESSONPLAN.md) |
|   2. | REST, CRUD & API                    | [Readings W2](week2/README.md) | [Homework W2](week2/MAKEME.md) | [Lesson Plan W2](week2/LESSONPLAN.md) |
|   3. | Templating engines, API calls       | [Readings W3](week3/README.md) | [Homework W3](week3/MAKEME.md) | [Lesson Plan W3](week3/LESSONPLAN.md) |

## Finished?

Did you finish the module? You're a rockstar!

If you feel ready for the next challenge, click [here](https://www.github.com/HackYourFuture/databases) to go to Databases!

_The HackYourFuture curriculum is subject to CC BY copyright. This means you can freely use our materials, but just make sure to give us credit for it :)_

<a rel="license" href="http://creativecommons.org/licenses/by/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International License</a>.
