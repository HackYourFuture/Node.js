# Fun with Handlebars

Do you know the game [Cards Against Humanity](https://cardsagainsthumanity.com/)? It's a game where players need to fill blanks in a sentence to make the funniest joke. For example, in the photo below:

![cards against humanity](https://www.snopes.com/tachyon/2015/11/cards-against-humanity.png?resize=865,391)

The resulting phrase reads as: _Hope_ is a slippery slope that leads to a _disappointing birthday party_.

Inspired by the game _you want to write a Node.js function that simulates playing the game_. You'll do this with help of [Handlebars.js](https://handlebarsjs.com/), the templating engine we've been using to build this module's project.

Inside of this function you want to do the following:

- Randomly select 2 words needed to fill in the blanks in the phrase `_______ is great to ________` and print the result to the console.

Follow the steps:

1. Install and require [Handlebars](https://handlebarsjs.com/installation/). Note that it's just `handlebars`, not `express-handlebars`
2. Implement the `getRandomElement` function so that it returns a random element from an array.
3. The `drawCard` function should first define a variable (called `cardData`), which contains an object with 2 keys: `subject` and `punchline`.
4. Randomly assign to these keys values, taken from the corresponding arrays (make use of the `getRandomElement` function!):
5. Create a variable, called `card`, that contains a template literal with the following: `_______ is great to ________`. Replace the `___` with the Handlebars placeholders
6. Compile the `card` using the `compile` method
7. Combine the compiled template with `cardData` to get a complete sentence.
8. Log the result to the console!

Hints:

If you don't know how to use Handlebars, [the documentation has a nice example!](https://www.npmjs.com/package/handlebars#usage)

## Things to think about

- Is this a dynamic webpage or a static one?
- What use cases can you think of that would make a templating engine extremely useful?
- Are there projects you have built in the past that would be made much simpler by using a templating engine?
- Do you think templating can only be done on the backend?
