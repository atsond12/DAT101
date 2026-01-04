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

printOut(newLine);

printOut("--- Part 4 ----------------------------------------------------------------------------------------------");
printOut(`Use a "for" loop and a "while" loop to find all prime numbers greater than 1 and less than 200.`);

let textPart4Primes = ""; // Store all prime numbers here
for (let i = 1; i < 200; i++) {
  let j = i - 1; // Divisor
  let isPrime = true; // Assume i is prime
  while (j > 1 && isPrime) {
    // Check divisors from i-1 down to 2
    let rest = i % j; // Remainder of i divided by j
    isPrime = rest != 0; // If remainder is 0, i is not prime
    j--; // Decrease divisor
  }
  if (isPrime) {
    // If i is prime, add it to the list
    textPart4Primes += " " + i; // Add prime number to the list
  }
}
printOut(textPart4Primes); // Print all prime numbers found
printOut(newLine);

printOut("--- Part 5 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
printOut(`
Create two loops that print 9 columns and 7 rows with the text "K1, R1" for the first cell, <br>
"K2, R1" for the second cell, and so on. <br>
 * Hint: Use what we call nested loops. This is a "for" loop within another "for" loop.<br>
Use the provided printOut function to print each row with its sets of columns;<br>
remember to place this in the right level of the nested for loops.<br>
The output should look like this:<br>
K1R1 K2R1 K3R1 K4R1 K5R1 K6R1 K7R1 K8R1 K9R1<br>
K1R2 K2R2 K3R2 K4R2 K5R2 K6R2 K7R2 K8R2 K9R2<br>
K1R3 K2R3 K3R3 K4R3 K5R3 K6R3 K7R3 K8R3 K9R3<br>
K1R4 K2R4 K3R4 K4R4 K5R4 K6R4 K7R4 K8R4 K9R4<br>
K1R5 K2R5 K3R5 K4R5 K5R5 K6R5 K7R5 K8R5 K9R5<br>
K1R6 K2R6 K3R6 K4R6 K5R6 K6R6 K7R6 K8R6 K9R6<br>
K1R7 K2R7 K3R7 K4R7 K5R7 K6R7 K7R7 K8R7 K9R7<br>
`);

let textPart5 = "";
for (let row = 1; row <= 7; row++) {
  let line = "";
  for (let col = 1; col <= 9; col++) {
    line += "K" + col + "R" + row + " ";
  }
  textPart5 += line + newLine;
}
printOut(textPart5);
printOut(newLine);

printOut("--- Part 6 ----------------------------------------------------------------------------------------------");
printOut(`
Simulate 5 student grades using the Math.random() function, from 1 to 236 (inclusive).<br>
For each grade, print the student's grade (A to F) based on the point distribution provided:<br>
<ul>
<li>A: 89% - 100%</li>
<li>B: 77% - 88%</li>
<li>C: 65% - 76%</li>
<li>D: 53% - 64%</li>
<li>E: 41% - 52%</li>
<li>F: &nbsp;0% - 40%</li>
</ul>
`);
const students = 5;
// Lagre som numbers — ikke strings
let grade1 = (Math.ceil(Math.random() * 236) / 236) * 100;
let grade2 = (Math.ceil(Math.random() * 236) / 236) * 100;
let grade3 = (Math.ceil(Math.random() * 236) / 236) * 100;
let grade4 = (Math.ceil(Math.random() * 236) / 236) * 100;
let grade5 = (Math.ceil(Math.random() * 236) / 236) * 100;

let textPart6 = "Student 1: ";
if (grade1 >= 89) {
  textPart6 += grade1.toFixed(2) + "% - A";
} else if (grade1 >= 77) {
  textPart6 += grade1.toFixed(2) + "% - B";
} else if (grade1 >= 65) {
  textPart6 += grade1.toFixed(2) + "% - C";
} else if (grade1 >= 53) {
  textPart6 += grade1.toFixed(2) + "% - D";
} else if (grade1 >= 41) {
  textPart6 += grade1.toFixed(2) + "% - E";
} else {
  textPart6 += grade1.toFixed(2) + "% - F";
}
printOut(textPart6);
textPart6 = "Student 2: ";
if (grade2 >= 89) {
  textPart6 += grade2.toFixed(2) + "% - A";
} else if (grade2 >= 77) {
  textPart6 += grade2.toFixed(2) + "% - B";
} else if (grade2 >= 65) {
  textPart6 += grade2.toFixed(2) + "% - C";
} else if (grade2 >= 53) {
  textPart6 += grade2.toFixed(2) + "% - D";
} else if (grade2 >= 41) {
  textPart6 += grade2.toFixed(2) + "% - E";
} else {
  textPart6 += grade2.toFixed(2) + "% - F";
}
printOut(textPart6);
textPart6 = "Student 3: ";
if (grade3 >= 89) {
  textPart6 += grade3.toFixed(2) + "% - A";
} else if (grade3 >= 77) {
  textPart6 += grade3.toFixed(2) + "% - B";
} else if (grade3 >= 65) {
  textPart6 += grade3.toFixed(2) + "% - C";
} else if (grade3 >= 53) {
  textPart6 += grade3.toFixed(2) + "% - D";
} else if (grade3 >= 41) {
  textPart6 += grade3.toFixed(2) + "% - E";
} else {
  textPart6 += grade3.toFixed(2) + "% - F";
}
printOut(textPart6);

textPart6 = "Student 4: ";
if (grade4 >= 89) {
  textPart6 += grade4.toFixed(2) + "% - A";
} else if (grade4 >= 77) {
  textPart6 += grade4.toFixed(2) + "% - B";
} else if (grade4 >= 65) {
  textPart6 += grade4.toFixed(2) + "% - C";
} else if (grade4 >= 53) {
  textPart6 += grade4.toFixed(2) + "% - D";
} else if (grade4 >= 41) {
  textPart6 += grade4.toFixed(2) + "% - E";
} else {
  textPart6 += grade4.toFixed(2) + "% - F";
}
printOut(textPart6);

textPart6 = "Student 5: ";
if (grade5 >= 89) {
  textPart6 += grade5.toFixed(2) + "% - A";
} else if (grade5 >= 77) {
  textPart6 += grade5.toFixed(2) + "% - B";
} else if (grade5 >= 65) {
  textPart6 += grade5.toFixed(2) + "% - C";
} else if (grade5 >= 53) {
  textPart6 += grade5.toFixed(2) + "% - D";
} else if (grade5 >= 41) {
  textPart6 += grade5.toFixed(2) + "% - E";
} else {
  textPart6 += grade5.toFixed(2) + "% - F";
}
printOut(textPart6);

let bigOCount = 0; // Count of operations for sorting

//Print out the grades in descending order
printOut("Grades sorted descending:");
for (let i = 1; i < students; i++) {
  // Outer loop to select the grade to compare
  let grade = 0;
  switch (i) {
    case 1:
      grade = grade1;
      break;
    case 2:
      grade = grade2;
      break;
    case 3:
      grade = grade3;
      break;
    case 4:
      grade = grade4;
      break;
    case 5:
      grade = grade5;
      break;
  }
  let j = i + 1; // Set the inner loop counter to the next grade
  let foundHighest = false;
  do {
    // Inner loop to compare with the other grades, until we find a higher one
    let nextGrade = 0;
    // Get the next grade to compare
    switch (j) {
      case 1:
        nextGrade = grade1;
        break;
      case 2:
        nextGrade = grade2;
        break;
      case 3:
        nextGrade = grade3;
        break;
      case 4:
        nextGrade = grade4;
        break;
      case 5:
        nextGrade = grade5;
        break;
    }
    if (nextGrade > grade) {
      // We have a new highest grade, swap them, but store current grade in temp
      let temp;
      switch (i) {
        case 1:
          temp = grade1;
          grade1 = nextGrade;
          break;
        case 2:
          temp = grade2;
          grade2 = nextGrade;
          break;
        case 3:
          temp = grade3;
          grade3 = nextGrade;
          break;
        case 4:
          temp = grade4;
          grade4 = nextGrade;
          break;
        case 5:
          temp = grade5;
          grade5 = nextGrade;
          break;
      }
      // put temp in the position of nextGrade
      switch (j) {
        case 1:
          grade1 = temp;
          break;
        case 2:
          grade2 = temp;
          break;
        case 3:
          grade3 = temp;
          break;
        case 4:
          grade4 = temp;
          break;
        case 5:
          grade5 = temp;
          break;
      }
      // You have done a swap.
      // reset outer loop to start over
      i = 0; // Remember the for loop will increment i, on next pass it will be 1
      foundHighest = true;
      bigOCount++; // Count the operation O(n^2)
    }
    j++;
  } while (j <= students && !foundHighest);
}

// Students number is now lost, but grades are sorted
printOut("Grade #1: " + grade1.toFixed(2) + "%");
printOut("Grade #2: " + grade2.toFixed(2) + "%");
printOut("Grade #3: " + grade3.toFixed(2) + "%");
printOut("Grade #4: " + grade4.toFixed(2) + "%");
printOut("Grade #5: " + grade5.toFixed(2) + "%");
printOut("");
printOut(`Big O operations count for sorting: O(n^2) = ${bigOCount}, worst case scenario for bubble sort with ${students} students is 25 operations.`);
printOut(newLine);

printOut("--- Part 7 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
printOut(`
Part 7 Dice Rolling Extravaganza (20 points)<br>
Simulate 6 dice and print how many "throws" it takes to get:<br>
<ul>
<li>1 2 3 4 5 6 (full straight)</li>
<li>3 pairs</li>
<li>2 of a kind and 4 of a kind (tower)</li>
<li>All the same (Yahtzee)</li>
</ul>
`);
// This part has least two possible solutions, one using strings and one using numbers.

const solveWithStrings = true; // Set to true to solve with strings, false to solve with numbers

if(solveWithStrings) {
  printOut("Solving with strings");
} else {
  printOut("Solving with numbers");
}

function matchNumber(aN1, aN2, aN3, aN4, aN5, aN6, aNumber) {
  let count = 0;
  if (aN1 === aNumber) count++;
  if (aN2 === aNumber) count++;
  if (aN3 === aNumber) count++;
  if (aN4 === aNumber) count++;
  if (aN5 === aNumber) count++;
  if (aN6 === aNumber) count++;
  return count;
}

function matchString(aString, aNumber) {
  // Count how many times aNumber appears in aString
  let count = 0;
  for (let i = 0; i < aString.length; i++) {
    if (parseInt(aString.charAt(i), 10) === aNumber) {
      count++;
    }
  }
  return count;
}

let throws = 0; // Number of throws
let fullStraight = false; // 1 2 3 4 5 6
let yahtzee = false; // All the same
let tower = false; // 2 + 4 of a kind
let threePairs = false; // 3 pairs e.g., 112233
do {
  const d1 = Math.ceil(Math.random() * 6); // Roll dice 1
  const d2 = Math.ceil(Math.random() * 6); // Roll dice 2
  const d3 = Math.ceil(Math.random() * 6); // Roll dice 3
  const d4 = Math.ceil(Math.random() * 6); // Roll dice 4
  const d5 = Math.ceil(Math.random() * 6); // Roll dice 5
  const d6 = Math.ceil(Math.random() * 6); // Roll dice 6
  throws++;
  // Do the matching, and check for the combinations
  let c1, c2, c3, c4, c5, c6;
  if (solveWithStrings) {
    const diceString = "" + d1 + d2 + d3 + d4 + d5 + d6;
    c1 = matchString(diceString, 1);
    c2 = matchString(diceString, 2);
    c3 = matchString(diceString, 3);
    c4 = matchString(diceString, 4);
    c5 = matchString(diceString, 5);
    c6 = matchString(diceString, 6);
  } else {
    c1 = matchNumber(d1, d2, d3, d4, d5, d6, 1);
    c2 = matchNumber(d1, d2, d3, d4, d5, d6, 2);
    c3 = matchNumber(d1, d2, d3, d4, d5, d6, 3);
    c4 = matchNumber(d1, d2, d3, d4, d5, d6, 4);
    c5 = matchNumber(d1, d2, d3, d4, d5, d6, 5);
    c6 = matchNumber(d1, d2, d3, d4, d5, d6, 6);
  }
  // Now check for the combinations
  let cm1, cm2, cm4, cm6;
  if (solveWithStrings) {
    const matchingString = "" + c1 + c2 + c3 + c4 + c5 + c6;
    cm1 = matchString(matchingString, 1);
    cm2 = matchString(matchingString, 2);
    cm4 = matchString(matchingString, 4);
    cm6 = matchString(matchingString, 6);
  } else {
    cm1 = matchNumber(c1, c2, c3, c4, c5, c6, 1); // Count of numbers that appear once, used for full straight
    cm2 = matchNumber(c1, c2, c3, c4, c5, c6, 2); // Count of numbers that appear twice, used for three pairs
    cm4 = matchNumber(c1, c2, c3, c4, c5, c6, 4); // Count of numbers that appear four times, used for tower
    cm6 = matchNumber(c1, c2, c3, c4, c5, c6, 6); // Count of numbers that appear six times, used for yahtzee
  }
  // Check for full straight
  if (cm1 === 6 && !fullStraight) {
    // We have a full straight
    fullStraight = true;
    printOut(`Full straight: ${d1}${d2}${d3}${d4}${d5}${d6} (throws: ${throws})`);
  }
  // Check for yahtzee
  if (cm6 === 1 && !yahtzee) {
    // We have yahtzee
    yahtzee = true;
    printOut(`Yahtzee: ${d1}${d2}${d3}${d4}${d5}${d6} (throws: ${throws})`);
  }
  //check for tower
  if (cm4 === 1 && cm2 === 1 && !tower) {
    // We have a tower
    tower = true;
    printOut(`Tower: ${d1}${d2}${d3}${d4}${d5}${d6} (throws: ${throws})`);
  }
  //check for three pairs
  if (cm2 === 3 && !threePairs) {
    // We have three pairs
    threePairs = true;
    printOut(`Three pairs: ${d1}${d2}${d3}${d4}${d5}${d6} (throws: ${throws})`);
  }
} while (!fullStraight || !yahtzee || !tower || !threePairs);
printOut(newLine);
