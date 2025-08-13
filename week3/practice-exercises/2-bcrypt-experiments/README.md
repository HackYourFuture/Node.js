# Bcrypt Experiments
In this exercise, we will use and test the bcrypt library to understand how it works.

## Experiment 1
### Question
What will happen if we hash the same password twice?

### Experiment 
Use bcrypt's `hash` function twice with the same input string and hash rounds. Print both hashes to the console.

### Analyze
* Are the hashes similar or different? Why do you think this is the case?
* What is the advantage of this kind of design?


## Experiment 2

### Question
Do different string lengths affect the hash length?

### Experiment 
Hash different strings with different lengths: 1, 10, 100, and 1000 characters. Print the output hashes.

_Hint: use `crypto.randomBytes(1000).toString('base64').slice(0,1000)` to create a large random string._

### Analyze
* Is there a difference between the output hash lengths?
* Is it possible for two different strings to have the same bcrypt hash?

## Experiment 3
### Question
How do salt rounds affect performance?

### Experiment 
Use bcrypt's `hash` function to hash the same password with different salt rounds: 1, 2, 3, ... 18. Use a for loop for this. Inside the for loop, use `console.time` to measure the duration of the operation:
```
console.time("Hashing time");
// Hash
console.timeEnd("Hashing time");
```
Print the output hash for each salt round.

### Analyze
* How long did it take to hash with 18 salt rounds?
* Does increasing the salt rounds make the hash longer?
* Why is it important for the hashing process to be slow?
* Would you use 18 rounds in your production application?
* Do a quick research to find the recommended number of salt rounds these days.
