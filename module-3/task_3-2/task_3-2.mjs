"use strict";
import { printOut, newLine } from "../../common/script/utils.mjs";

printOut("--- Part 1 ----------------------------------------------------------------------------------------------");
printOut(
  `
Use "for" loops to generate two lines on the HTML page.<br>
One should count from 1 to 10, and the other should count from 10 to 1. <br>
Use only two lines to print the rows<br>
`
);

let textPart1Line1 = "";
let textPart1Line2 = "";
for (let i = 1, j = 10; i <= 10; i++, j--) {
  textPart1Line1 += " " + i;
  textPart1Line2 += " " + j;
}
printOut(textPart1Line1);
printOut(textPart1Line2);

printOut(newLine);

printOut("--- Part 2 ----------------------------------------------------------------------------------------------");
printOut(
  `
Create a program that can guess a number between 1 and 60. <br>
Declare a variable and assign it a value, for example, 45. <br>
Let the computer "guess" by generating a random number. <br>
Use a "while" loop and the "random" function. <br>
Keep the "while" loop running as long as the "guessed number" is incorrect. <br>
Print the number once the "while" loop has completed. <br>
You do not need to print anything while the "while" loop is in progress. <br>  
  `
);

const part1GuessNumber = 45;
let part1Random = Math.floor(Math.random() * 60) + 1;
while (part1Random !== part1GuessNumber) {
  part1Random = Math.floor(Math.random() * 60) + 1;
}
printOut("Yes! you guessed correct: " + part1Random);

printOut(newLine);

printOut("--- Part 3 ----------------------------------------------------------------------------------------------");
printOut(
  `
Take the program from part 2 and expand it to guess a number between 1 and one million. <br />
Print the number of guesses as well as the number of milliseconds it took to guess the number. <br />
HINT: Use the Date.now() function to measure time <br />
`
);

const part3Time = Date.now();
const part3GuessNumber = 654321;
let part3Random;
let part3Count = 0;
do {
  part3Random = Math.floor(Math.random() * 1000000) + 1;
  part3Count++;
} while (part3Random !== part3GuessNumber);

printOut("number of guesses: " + part3Count);
const part3DeltaTime = Date.now() - part3Time;
printOut("number of mSec: " + part3DeltaTime);

printOut("Replace this with you answer!");
printOut(newLine);

printOut("--- Part 4 ----------------------------------------------------------------------------------------------");
printOut(`Use a "for" loop and a "while" loop to find all prime numbers greater than 1 and less than 200.`);

let textPart4Primes = ""; // Store all prime numbers here
for (let i = 1; i < 200; i++) {
  let j = i - 1; // Divisor
  let isPrime = true; // Assume i is prime
  while (j > 1 && isPrime) { // Check divisors from i-1 down to 2
    let rest = i % j; // Remainder of i divided by j
    isPrime = rest != 0; // If remainder is 0, i is not prime
    j--; // Decrease divisor
  }
  if (isPrime) { // If i is prime, add it to the list
    textPart4Primes += " " + i; // Add prime number to the list
  }
}
printOut(textPart4Primes); // Print all prime numbers found
printOut(newLine);

printOut("--- Part 5 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
printOut("Replace this with you answer!");
printOut(newLine);

printOut("--- Part 6 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
printOut("Replace this with you answer!");
printOut(newLine);

printOut("--- Part 7 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
printOut("Replace this with you answer!");
printOut(newLine);

printOut("--- Part 8 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
printOut("Replace this with you answer!");
printOut(newLine);

printOut("--- Part 9 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
printOut("Replace this with you answer!");
printOut(newLine);

/* Task 10*/
printOut("--- Part 10 ---------------------------------------------------------------------------------------------");
/* Put your code below here!*/
printOut("Replace this with you answer!");
printOut(newLine);
