"use strict";
import { printOut, newLine } from "../../common/script/utils.mjs";

printOut("--- Part 1, 2, 3 ----------------------------------------------------------------------------------------");
/* Put your code below here!*/
/*
Part 1 (5 points)
Complete the given "if" in the task_3-3.mjs file at part 1, statement so that it matches this: If I wake up at exactly 7 o'clock then I can catch the bus to school. Run the program with different values ​​of wake-up time (6, 7, 8).
Print out to the HTML page the expression statement you made.
Part 2 (7 points)
Extend part 1 to match this "if" and "else" statement: "If I wake up at exactly 7 o'clock, I can take the bus to school, otherwise I have to take the car to school". Run the program with different values ​​of wake-up time (6, 7, 8).
Part 3 (10 points)
Extend part 2 to expand more options: “If I wake up at exactly 7 o'clock, I can take the bus to school, otherwise if I wake up exactly at 8 o'clock, I can take the train to school, otherwise I have to take the car to school”. Run the program with a different value of wake-up time (7, 8).
*/
printOut("Task 1, 2 and 3");
let wakeUpTime = 2;
if (wakeUpTime === 7) {
    printOut("I can catch the bus to school.");
} else if (wakeUpTime === 8) {
    printOut("I can take the train to school.");
} else {
    printOut("I have to take the car to school.");
}
printOut(newLine);

printOut("--- Part 4, 5 --------------------------------------------------------------------------------------------");
/* Put your code below here!*/
/*
Part 4 (7 points)
Write an if statement that checks whether an integer variable is negative or positive, print the text "Positive" or "Negative" accordingly. Run the program with different types of values ​​for the variable to check the if statement.
Part 5 (8 points)
Change part 4 to print “Positive”, “Negative” or “Zero” accordingly. Run the program with different types of values ​​for the variable to check the "if" statement.
*/
printOut("Task 4 and 5");
const part4Number = -5;
if (part4Number > 0) {
    printOut("Positive");
} else if (part4Number < 0) {
    printOut("Negative");
} else {
    printOut("Zero");
}
printOut(newLine);

printOut("--- Part 6 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
/*
Part 6 (10 points)
Imagine you have a photo editing profession. And you have a website where people can upload pictures for you to work on. However, the images must be 4MP or larger, if they are smaller, you cannot use them. Create a variable that holds a generated random integer between 1 and 8 (inclusive). Use this variable to simulate the uploaded image size and print it. Then create an if statement that prints out “Thank you” if the size is equal to or greater than the limit. Otherwise, print out "The image is too small".
*/
const imageSize = Math.floor(Math.random() * 8) + 1;
printOut(`Uploaded image size: ${imageSize}MP`);
if (imageSize >= 4) {
    printOut("Thank you");
} else {
    printOut("The image is too small");
}
printOut(newLine);

printOut("--- Part 7 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
/*
Part 7 (12 points)
Expand part 6 to exclude if the image size is larger or equal to 6MP, then print out “Image is too large”.
*/
if (imageSize >= 6) {
    printOut("Image is too large");
} else if (imageSize >= 4) {
    printOut("Thank you");
} else {
    printOut("The image is too small");
}
printOut(newLine);

printOut("--- Part 8 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
/*
Part 8 (10 points)
Use this code:
const monthList =["January", "February", "Mars", "April", "Mai", 
"Jun", "Juli", "August", "September", "October", "November", "December"];
const noOfMonth = monthList.length;
const monthName = monthList[Math.floor(Math.random() * noOfMonth)];
Print if monthName contains “r”: “You must take vitamin D” else “You do not need to take vitamin D”
*/
const monthList = ["January", "February", "Mars", "April", "Mai", "Jun", "Juli", "August", "September", "October", "November", "December"];
const noOfMonth = monthList.length;
const monthName = monthList[Math.floor(Math.random() * noOfMonth)];
printOut(`Current month: ${monthName}`);
if (monthName.includes("r")) {
    printOut("You must take vitamin D");
} else {
    printOut("You do not need to take vitamin D");
}
printOut("Replace this with you answer!");
printOut(newLine);

printOut("--- Part 9 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
/*
Part 9 (15 points)
Expand exercise 8 to print how many days there are in the current month. And do not use date objects.
*/
let daysInMonth;
switch (monthName) {
    case "January":
    case "Mars":
    case "May":
    case "July":
    case "August": 
    case "October":
    case "December":
        daysInMonth = 31;
        break;
    case "April":
    case "June":
    case "September":
    case "November":
        daysInMonth = 30;
        break;
    case "February":
        daysInMonth = 28;
        break;
    default:
        daysInMonth = "unknown";
}
printOut(`Number of days in ${monthName}: ${daysInMonth}`);
printOut(newLine);

/* Task 10*/
printOut("--- Part 10 ---------------------------------------------------------------------------------------------");
/* Put your code below here!*/
/*
Part 10 (16 points)
Imagine you have an art gallery, but you need to refurbish the premises, so you close the gallery from March through May, but in April you have temporary premises in the building next door. Use the month constant in exercise 8 to inform the status of your gallery in that month.
*/
printOut(`Current month: ${monthName}`);
switch (monthName) {
    case "March":
    case "May":
        printOut("The art gallery is closed for refurbishment.");
        break;
    case "April":
        printOut("The art gallery is open in temporary premises next door.");
        break;
    default:
        printOut("The art gallery is open as usual.");
}
// Or with if-else:
if (monthName === "March" || monthName === "May") {
    printOut("The art gallery is closed for refurbishment.");
} else if (monthName === "April") {
    printOut("The art gallery is open in temporary premises next door.");
} else {
    printOut("The art gallery is open as usual.");
}
printOut(newLine);
