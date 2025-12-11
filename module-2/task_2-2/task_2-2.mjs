"use strict";
import { printOut, newLine } from "../../common/script/utils.mjs";


printOut("--- Part 1 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
printOut(`
Use JavaScript to calculate the following expression, ensuring the result is -34:
2 + 3 * 2 - 4 * 6 
Display both the original expression and the modified expression (with parentheses) along with their results on the HTML page.  
`);
const originalExpression = 2 + 3 * 2 - 4 * 6;
const modifiedExpression = 2 + 3 * (2 - 4) * 6;
printOut("Original expression 2 + 3 * 2 - 4 * 6 = " + originalExpression);
printOut("Modified expression 2 + 3 * (2 - 4) * 6 = " + modifiedExpression);
printOut(newLine);

printOut("--- Part 2 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
printOut(`
  Convert 25 metres and 34 centimeters to inches. An inch is 25.4 millimeters (maximum 2 decimal places in the answer).
`);
const millimeters = 25000 + 340;
const inchPrMillimeters = 25.4;
let sumPart2 = millimeters / inchPrMillimeters;
sumPart2 = sumPart2.toFixed(2);
printOut(`25 metres and 34 centimeters is ${sumPart2} inches`);
printOut(newLine);

printOut("--- Part 3 ----------------------------------------------------------------------------------------------");
printOut(`
  Convert 3 days, 12 hours, 14 minutes, and 45 seconds to minutes. (Not allowed to use date objects). The task must be solved with primitives.
`);
const part3Days = 3, part3Hours = 14, part3Minutes = 14, part3Seconds = 34;
let part3Answer = 
  (part3Days * 24 * 60) +
  (part3Hours * 60) + 
  part3Minutes +
  (part3Seconds / 60)
part3Answer = part3Answer.toFixed(2);
printOut("3 days, 12 hours, 14 minutes, and 45 seconds is " + part3Answer + "minutes");
printOut(newLine);

printOut("--- Part 4 ----------------------------------------------------------------------------------------------");
printOut(`
  Convert 6,322.52 minutes to days, hours, minutes, and seconds. (Not allowed to use date objects). The task must be solved with primitives.
  `);
const part4Minutes = 6322.52;
let part4Rest = part4Minutes / (24 * 60);
const part4Days = Math.floor(part4Rest);
part4Rest = part4Rest - part4Days;
part4Rest = part4Rest * 24;
const part4Hours = Math.floor(part4Rest);
part4Rest = part4Rest - part4Hours;
part4Rest = part4Rest * 60;
const part4Minute = Math.floor(part4Rest);
part4Rest -= part4Minute;
part4Rest *= 60;
const part4Seconds = Math.floor(part4Rest);

printOut("6,322.52 minutes is " + 
  part4Days + " days, " + 
  part4Hours + " hours, " +
  part4Minute + " minutes, " +
  part4Seconds + " seconds"

);

  printOut(newLine);

printOut("--- Part 5 ----------------------------------------------------------------------------------------------");
printOut(`
Convert 54 dollars to Norwegian kroner, and print the price for both: <br>
NOK → USD and USD → NOK.<br>
Use 76 NOK = 8.6 USD as the exchange rate.<br>
The answer must be in whole "Kroner" and whole "dollars"<br>
`);

const NOKRate = 76 / 8.6
let USD = 54;
let NOK = USD * NOKRate;
printOut("USD -> NOK = " + NOK.toFixed(2));
const USDRate = 8.6 / 76;
USD = NOK * USDRate;
printOut("NOK -> USD = " + USD.toFixed(2));


printOut(newLine);

printOut("--- Part 6 ----------------------------------------------------------------------------------------------");
printOut(`
Create a variable that contains the following text:
   "There is much between heaven and earth that we do not understand."
 Print the number of characters in the text.
  <ul>
   <li>Print the character at position number 19.</li>
   <li>Print the characters starting at position number 35 and 8 characters forward.</li>
   <li>Print the index at which "earth" starts in the text.</li>
  </ul>
`);
const part6Text = "There is much between heaven and earth that we do not understand.";
printOut(part6Text);
printOut("Number of characters: " + part6Text.length);
printOut("Character at position 19: " + part6Text.charAt(19));
printOut("Characters from position 35, 8 characters forward: " + part6Text.substring(35, 35 + 8));
printOut("Index at which 'earth' starts: " + part6Text.indexOf("earth"));

printOut(newLine);

printOut("--- Part 7 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
printOut(`
Comparison, print the values for the following expressions (evaluate whether the statements are true):
<ul>
 <li>Is 5 greater than 3?</li>
 <li>Is 7 greater than or equal to 7?</li>
<li>Is "a" greater than "b"?</li>
<li>Is 7 greater than or equal to 7?</li>
<li>Is "a" greater than "b"?</li>
<li>Is "1" less than "a"?</li>
<li>Is "2500" less than "abcd"?</li>
<li>"arne" is not equal to "thomas".</li>
<li>(2 equals 5) is this statement true?</li>
<li>("abcd" is greater than "bcd") is this statement false?</li>
</ul>
`);
printOut(`Is 5 greater than 3? : ${5 > 3}`);
printOut(`Is 7 greater than or equal to 7? : ${7 >= 7}`);
printOut(`Is "a" greater than "b"? : ${"a" > "b"}`);
printOut(`Is "1" less than "a"? : ${"1" < "a"}`);
printOut(`Is "2500" less than "abcd"? : ${"2500" < "abcd"}`);
printOut(`"arne" is not equal to "thomas". : ${"arne" != "thomas"}`);
printOut(`(2 equals 5) is this statement true? : ${(2 === 5) === true}`);
printOut(`("abcd" is greater than "bcd") is this statement false? : ${("abcd" > "bcd") === false}`);
printOut(newLine);

printOut("--- Part 8 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
printOut(`
Convert and print the following expressions:
<ul>
  <li>from text "254" to a number</li>
  <li>from text "57.23" to a number</li>
  <li>from text "25 kroner" to a number</li>
</ul>  
`);
printOut("Convert and print the following expressions: using Number()");
printOut(`From text "254" to a number: ${Number("254")}`);
printOut(`From text "57.23" to a number: ${Number("57.23")}`);
printOut(`From text "25 kroner" to a number: ${Number("25 kroner")}${newLine}`);

printOut("Convert and print the following expressions: using parseInt() and parseFloat()");
printOut(`From text "254" to a number: ${parseInt("254")}`);
printOut(`From text "57.23" to a number: ${parseFloat("57.23")}`);
printOut(`From text "25 kroner" to a number: ${parseInt("25 kroner")}`);

printOut(newLine);

printOut("--- Part 9 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
printOut(`
  Create a variable "r" and randomly generate a number from 1 to 360 (1 >= r <= 360).
`);
let r = Math.floor(Math.random() * 360) + 1;
printOut("Random number between 1 and 360 using floor: " + r);
printOut("Random number between 1 and 360 using ceil: " + (Math.ceil(Math.random() * 360)));
printOut(newLine);

/* Task 10*/
printOut("--- Part 10 ---------------------------------------------------------------------------------------------");
/* Put your code below here!*/
printOut(`Use modulus (%) to calculate how many weeks and days are in 131 days.`);
const totalDays = 131;
const weeks = Math.floor(totalDays / 7);
const days = totalDays % 7;
printOut("131 days is " + weeks + " weeks and " + days + " days.");
printOut(newLine);