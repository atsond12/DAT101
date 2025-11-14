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
let grade1 = ((Math.ceil(Math.random() * 236) / 236) * 100).toFixed(2);
let grade2 = ((Math.ceil(Math.random() * 236) / 236) * 100).toFixed(2);
let grade3 = ((Math.ceil(Math.random() * 236) / 236) * 100).toFixed(2);
let grade4 = ((Math.ceil(Math.random() * 236) / 236) * 100).toFixed(2);
let grade5 = ((Math.ceil(Math.random() * 236) / 236) * 100).toFixed(2);
let textPart6 = "";
if (grade1 >= 89) {
  textPart6 += "Student 1: " + grade1 + "% - A";
} else if (grade1 >= 77) {
  textPart6 += "Student 1: " + grade1 + "% - B";
} else if (grade1 >= 65) {
  textPart6 += "Student 1: " + grade1 + "% - C";
} else if (grade1 >= 53) {
  textPart6 += "Student 1: " + grade1 + "% - D";
} else if (grade1 >= 41) {
  textPart6 += "Student 1: " + grade1 + "% - E";
} else {
  textPart6 += "Student 1: " + grade1 + "% - F";
}
printOut(textPart6);
textPart6 = "Student 2: ";
if (grade2 >= 89) {
  textPart6 += grade2 + "% - A";
} else if (grade2 >= 77) {
  textPart6 += grade2 + "% - B";
} else if (grade2 >= 65) {
  textPart6 += grade2 + "% - C";
} else if (grade2 >= 53) {
  textPart6 += grade2 + "% - D";
} else if (grade2 >= 41) {
  textPart6 += grade2 + "% - E";
} else {
  textPart6 += grade2 + "% - F";
}
printOut(textPart6);
textPart6 = "Student 3: ";
if (grade3 >= 89) {
  textPart6 += grade3 + "% - A";
} else if (grade3 >= 77) {
  textPart6 += grade3 + "% - B";
} else if (grade3 >= 65) {
  textPart6 += grade3 + "% - C";
} else if (grade3 >= 53) {
  textPart6 += grade3 + "% - D";
} else if (grade3 >= 41) {
  textPart6 += grade3 + "% - E";
} else {
  textPart6 += grade3 + "% - F";
}
printOut(textPart6);

textPart6 = "Student 4: ";
if (grade4 >= 89) {
  textPart6 += grade4 + "% - A";
} else if (grade4 >= 77) {
  textPart6 += grade4 + "% - B";
} else if (grade4 >= 65) {
  textPart6 += grade4 + "% - C";
} else if (grade4 >= 53) {
  textPart6 += grade4 + "% - D";
} else if (grade4 >= 41) {
  textPart6 += grade4 + "% - E";
} else {
  textPart6 += grade4 + "% - F";
}
printOut(textPart6);

textPart6 = "Student 5: ";
if (grade5 >= 89) {
  textPart6 += grade5 + "% - A";
} else if (grade5 >= 77) {
  textPart6 += grade5 + "% - B";
} else if (grade5 >= 65) {
  textPart6 += grade5 + "% - C";
} else if (grade5 >= 53) {
  textPart6 += grade5 + "% - D";
} else if (grade5 >= 41) {
  textPart6 += grade5 + "% - E";
} else {
  textPart6 += grade5 + "% - F";
}
printOut(textPart6);

//Print out the grades in descending order
for (let i = 1; i < students; i++) {
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
  let j = 0;
  do {
    let gradeCompare = 0;
    switch (j) {
      case 1:
        // swap with grade1
        if (grade < grade1) {
          let temp = grade;
          grade = grade1;
          grade1 = temp;
        }
        break;
      case 2:
        if (grade < grade2) {
          let temp = grade;
          grade = grade2;
          grade2 = temp;
        }
        break;
      case 3:
        if (grade < grade3) {
          let temp = grade;
          grade = grade3;
          grade3 = temp;
        }
        break;
      case 4:
        if (grade < grade4) {
          let temp = grade;
          grade = grade4;
          grade4 = temp;
        }
        break;
      case 5:
        if (grade < grade5) {
          let temp = grade;
          grade = grade5;
          grade5 = temp;
        }
        break;
    }
    j++;
  } while (j < students);
}

printOut("Grades sorted descending:");
printOut("Grade 1: " + grade1 + "%");
printOut("Grade 2: " + grade2 + "%");
printOut("Grade 3: " + grade3 + "%");
printOut("Grade 4: " + grade4 + "%");
printOut("Grade 5: " + grade5 + "%");

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

function matchNumber(aText, aNumber) {
  let count = 0;
  for (let i = 0; i < aText.length; i++) {
    if (aText.charAt(i) === aNumber.toString()) {
      count++;
    }
  }
  return count;
}
let throws = 0;
let fullStraight = false;
let yahtzee = false;
let tower = false; // 2 + 4 of a kind
let threePairs = false; // 3 pairs e.g., 112233
do {
  const d1 = Math.ceil(Math.random() * 6);
  const d2 = Math.ceil(Math.random() * 6);
  const d3 = Math.ceil(Math.random() * 6);
  const d4 = Math.ceil(Math.random() * 6);
  const d5 = Math.ceil(Math.random() * 6);
  const d6 = Math.ceil(Math.random() * 6);
  throws++;
  const t = d1.toString() + d2.toString() + d3.toString() + d4.toString() + d5.toString() + d6.toString();

  let c1 = matchNumber(t, 1);
  let c2 = matchNumber(t, 2);
  let c3 = matchNumber(t, 3);
  let c4 = matchNumber(t, 4);
  let c5 = matchNumber(t, 5);
  let c6 = matchNumber(t, 6);
  const t2 = c1.toString() + c2.toString() + c3.toString() + c4.toString() + c5.toString() + c6.toString();

  const cm1 = matchNumber(t2, 1); // count of numbers that appear once, used for full straight
  const cm2 = matchNumber(t2, 2); // count of numbers that appear twice, used for three pairs and tower
  const cm4 = matchNumber(t2, 4); // count of numbers that appear four times, used for tower
  const cm6 = matchNumber(t2, 6); // count of numbers that appear six times
  // Check for full straight
  if (cm1 === 6 && !fullStraight) {
    // We have a full straight
    fullStraight = true;
    printOut("Full straight: " + t + " (throws: " + throws + ")");
  }
  // Check for yahtzee
  if (cm6 === 1 && !yahtzee) {
    // We have yahtzee
    yahtzee = true;
    printOut("Yahtzee: " + t + " (throws: " + throws + ")");
  }
  //check for tower
  if (cm4 === 1 && cm2 === 1 && !tower) {
    // We have a tower
    tower = true;
    printOut("Tower: " + t + " (throws: " + throws + ")");
  }
  //check for three pairs
  if (cm2 === 3 && !threePairs) {
    // We have three pairs
    threePairs = true;
    printOut("Three pairs: " + t + " (throws: " + throws + ")");
  }
} while (!fullStraight || !yahtzee || !tower || !threePairs);
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
