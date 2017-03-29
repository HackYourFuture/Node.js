
> Please help us improve and share your feedback! If you find better tutorials or links, please share them by opening a Pull Request.

# HackYourFuture - Node.js
This 3 week HYF Module is about Node.JS. We can think of Node.JS as "Javascript not running in a browser". This is what we mean by "backend", as in "backend developer".

## Planning
| Week | Topic | Read | Homework |
| ---- | ----- | ---- | -------- |
| 1. | Node.js, NPM, http | [Week 1 Reading](week1/README.md) | [Week 1 Homework](week1/MAKEME.md) |
| 2. | fs, process | [Week 2 Reading](week2/README.md) | [Week 2 Homework](week2/MAKEME.md) |
| 3. | express, REST | [Week 3 Reading](week3/README.md) | [Week 3 Homework](week3/MAKEME.md) |


## Pre-requisites
We will build on knowledge from the following HYF (sub)modules. If we feel we have gaps we should review the curriculum ourselves or ask a teacher to help.
- [JavaScript](https://github.com/HackYourFuture/JavaScript)
- [Git](https://github.com/HackYourFuture/Git)
- [Bash/CommandLineInterface](https://github.com/HackYourFuture/CommandLine)

## What will we learn?
- What is Node.js?
- Using Node Package Manager (NPM)
- Using `require` to include modules
- Using `http` to handle http requests and respond
- Using `fs` to read from and write to files.
- Using `process` to read arguments from the CLI
- Using `express` to make a RESTful API

## Why Node.js?
For almost any web application, it is essential to have a backend. The backend is a place where we, the developers, can store our data, communicate with users and let the users communicate with us, do smart things like calculations, data processing etc.

There are many languages for this. We might've heard of Java, C, C++, Go, Python, Ruby, PHP and the [list goes on](https://blog.newrelic.com/2016/08/18/popular-programming-languages-2016-go/). 

There are two reasons why we at HYF choose Node.JS over others:
1) You already know JavaScript, so it's easier to get started than other languages
2) Node.js is great for making web APIs because it is asynchronous by nature and thus allows for high input/output. By this we mean that it allows many users to make very light requests at the same time.