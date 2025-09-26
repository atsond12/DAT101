"use strict";
import { printOut, newLine } from "../../common/script/utils.mjs";


printOut("--- Part 1 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
const part1Ans = (2 + 3) * 2 - 4 * 6;
printOut("(2 + 3) * 2 - 4 * 6 = " + part1Ans);
printOut(newLine);

printOut("--- Part 2 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
const millimeters = 25000 + 340;
const inchPrMillimeters = 25.4;
let sumPart2 = millimeters / inchPrMillimeters;
sumPart2 = sumPart2.toFixed(2);
printOut("25 metres and 34 centimeters is " + sumPart2 + " inches");
printOut(newLine);

printOut("--- Part 3 ----------------------------------------------------------------------------------------------");
/*Convert 3 days, 12 hours, 14 minutes, and 45 seconds to minutes*/
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
/* Convert 6,322.52 minutes to days, hours, minutes, and seconds*/
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