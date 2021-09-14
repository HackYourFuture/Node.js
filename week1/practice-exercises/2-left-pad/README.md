# To the left, to the left...Oh no!

A senior developer from your team Slacks you that he tried to pad some numbers to 8 characters and it was not working at all. He asks you (politely) to fix the bug as soon as possible or face the wrath of management.

When you look at the function code you realize that the function only works up to 5 characters.

```javascript
// This change doesn't satisfy our needs!
function padLeft(val, num, str) {
  return "00000".replace(/0/g, str).slice(0, num - val.length) + val;
}
```

What a stupid function! For a moment, you consider to rename the file to `terrible-function.js`, but realize that will not help your situation in any way. You could add three zeroes so that it works for 8 characters:

```javascript
// This change doesn't do much for us either...
function padLeft(val, num, str) {
  return "00000000".replace(/0/g, str).slice(0, num - val.length) + val;
}
```

Then it would be just a matter of time before someone tries to use it for 9 characters and you get the same issue. You scour StackOverflow for related questions and discover that there is already a function that pads numbers, available through NPM: [left-pad](https://www.npmjs.com/package/left-pad).

_Note: this package is deprecated which means that it is not being developed anymore but it can be used in the current state. The reason is that in modernJS we now have the function `padStart()` which does the same and makes this package obsolete. The goal of the exercise is to learn to use packages so we will still use it in this case, but in general we do not want to use deprecated packages!_

Perfect! Let's use this module instead. Follow the steps:

1. Open the folder `/2-left-pad`
2. Initialize NPM using `npm init`, to create a `package.json` file
3. Copy and paste your code from the previous exercise in `script.js`
4. Follow the instructions on the website - from https://www.npmjs.com/package/left-pad on how to install and require the `left-pad` package inside of `script.js`
5. Replace the call to function `padLeft` to use this new NPM package called `left-pad` instead
6. Pad the numbers to 8 characters and check if everything works correctly

Tips:

- Make sure you're in the correct directory when running `npm install left-pad`
