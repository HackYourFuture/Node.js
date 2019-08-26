# Simple NodeJS Project

## Recap

### NPM and Packages
- [npm](https://www.youtube.com/watch?v=kQ1j0rEI7EI&list=PL4cUxeGkcC9gcy9lrvMJ75z9maRw4byYp&index=20)
- [package.json](https://youtube.com/watch?v=_eRwjuIDJ2Y&list=PL4cUxeGkcC9gcy9lrvMJ75z9maRw4byYp&index=21)
   A note about this video. The author is using an older version of npm which does not save the package to the dependencies list by default. Hence he uses a flag. But these days you don't have to worry about that.

### package.json vs. package-lock.json
- [package-lock.json](https://blog.quigley.codes/everything-you-wanted-to-know-about-package-lock-json/?dr=https://medium.com/p/b81911aa8ab8): A bit dense, if you don't understand something, feel free to ask.

### Semver
- [semver](https://www.youtube.com/watch?v=Fi0CDwQiz6Q)
- [more semver](https://www.youtube.com/watch?v=mpkC6MmKgsQ): This person is even using cowsay!

## Main Features

- Has a package.json and package-lock.json
- Has an entry-point (a "main" defined in package.json)
- Depends on other modules (doesn't always need to be the case, but almost always is)

## Types of Modules
- Pre-installed: These come already installed with NodeJS (like the "http" module we used in class).
- From npm: We can install these using `npm install <module-name>` and they get added to our dependencies list in package.json (like "cowsay")

## Importing Modules

We import these modules by using the `require` funtion: `require('cowsay')`.
Before we can use it, we need to give it a name: `const cowsay = require('cowsay')`

And then we can all functions on it.
```js
cowsay.say({
	text : "Heya, Class5!",
	e: "* *"
})
```

## Running Our Code

- We can run our project by running `node index.js`
- We can also do `node .` in the project folder (the entry point will get automaitcally picked up)
