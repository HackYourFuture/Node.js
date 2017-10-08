> Please help us improve and share your feedback! If you find better tutorials or links, please share them by opening a Pull Request.

# HackYourFuture Node.js - Homework week 1

## Assignment for this week

Beginning from the [code demonstrated in the class](../class_contact_list), add the following functionality:

 * Convert into a node project with `npm init`.
 * Add babel into the setup. (You can check if the setup is good if you can `import` instead of `require`, for example.)
 * There's a new class called `Contact` which is based on the (previous homework)[../../week0/homework/]. Import this class in the `ContactList` class and edit the `addContact` method so that a new `Contact` is added instead of an object.
 * You may add a contraint on `addContact` method to only accept a `Contact` object by using `instanceof` operator.
 * Also show if you can use array methods like `contacts.push()` and `contacts.splice()`.
 * Add a setter for `phone` in `Contact` which converts string input to number (stores `_phone` as number) and validates that the number is 8 digits long (non-negative, doesn't start with 0).
 * Read the `_search` interface provided in the `ContactList` class and show examples of it working.

## Related reading

 * More about babel at https://babeljs.io/ and see the setup @pmcalabrese demonstrated in class at https://github.com/pmcalabrese/node-babel
 * [`intanceof` operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof)