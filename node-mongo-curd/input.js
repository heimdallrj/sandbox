//input.js

//Importing the relevant module
var readline = require('readline');

//Initializing the reading interface to read from
//stdin and write to stdout
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//Asking for user input and providing a callback to deal with the user input
rl.question("What is your name? ", function(answer){
  console.log("Your name is: " + answer);
  console.log("Press Ctrl+C to end the program");
});