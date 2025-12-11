"use strict";
import { printOut, newLine } from "../../common/script/utils.mjs";

printOut("--- Part 1 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
printOut(`
Create an array where you hard-code all the numbers from 1 to 20.<br>Use a for loop to "run through" the array and print all the elements in the array.<br>
<ul>
  <li style="list-style: none;">👉 Hint: Look at the learning outcomes to find the solutions to the task.</li>
<ul>
`);
const part1Array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
printOut("Lengde = " + part1Array.length + ", Verdi = " + part1Array[part1Array.length - 1]);
let part1Text = "";
for (let i = 0; i < /*20*/ part1Array.length; /*i++*/ i = i + 1) {
  const value = part1Array[i]; // -> Every index of part1Array
  if (i === part1Array.length - 1) {
    part1Text += value.toString() + ".";
  } else {
    part1Text += value.toString() + ", ";
  }
}
printOut(part1Text);
printOut(newLine);

printOut("--- Part 2 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
printOut(`
Take the array from task 1<br>
Use a built-in method found in the array object to print all the elements<br>
Use a custom defined character separating all the elements.
<ul>
  <li style="list-style: none;">👉 Hint: You should be able to do it with just one line of code 😃</li>
<ul>
`);
const part2Text = part1Array.join(", ");
printOut(part2Text);
printOut(newLine);

printOut("--- Part 3 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
printOut(`
  Create a constant that contains the text<br>
  "Hei på deg, hvordan har du det?" (Hello there, how are you?)<br>
  Take this text and convert it into an array that contains all the words in the text, i.e.,<br>
  each element should contain only one word from the text.<br>
  Use a loop to traverse (run through) this array so that you can print which word number,<br>
  which index the word is at, and the word itself.
  <br>
`);
const part3Greeting = "Hello there, how are you?";
const greetingArray = part3Greeting.split(" ");
let part3Text = "";
for(let i = 0; i < greetingArray.length; i++){
  const word = greetingArray[i];
  // Here you can remove any unwanted characters e.g: , ? et.
  part3Text += "Index: " + i.toString() + " = " + word + newLine;
}
printOut(part3Text);
printOut(newLine);

printOut("--- Part 4 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
printOut(`
  Create an array with these names:<br>
  "Anne", "Inger", "Kari", "Marit", "Ingrid", "Liv", "Eva", "Berit", "Astrid", "Bjørg", "Hilde", "Anna",<br>
  "Solveig", "Marianne", "Randi", "Ida", "Nina", "Maria", "Elisabeth" and "Kristin".<br>
Then create a function that will remove an element from an array.<br>
Let the function have two parameters.<br>
<ul>
<li>Parameter number one is the array from which you will remove the element.</li>
<li>Parameter number two is the text that should be removed from the array.</li>
</ul>
Check if the element exists in the array so that you can inform whether the element exists or not in the array.
<br>
`);
const girls = ["Anne", "Inger", "Kari", "Marit", "Ingrid", "Liv", "Eva", "Berit", "Astrid", "Bjørg", "Hilde", "Anna", "Solveig", "Marianne", "Randi", "Ida", "Nina", "Maria", "Elisabeth", "Kristin"];

function removeNameFromArray(aArray, aName){
  let deleteIndex = -1;
  for(let i = 0; i < aArray.length; i++){
    const name = aArray[i];
    if(name === aName){
      deleteIndex = i;
      break; // 
    }
  }
  if(deleteIndex >= 0){
    printOut(aName + " is found, and deleted.");
    aArray.splice(deleteIndex, 1);
  }else{
    printOut(aName + " is not found!");
  }
}

removeNameFromArray(girls, "Hilde");
printOut(girls);

printOut(newLine);

printOut("--- Part 5 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
printOut(`
Create a new array with these names:<br>
"Jakob", "Lucas", "Emil", "Oskar", "Oliver", "William", "Filip", "Noah", "Elias", "Isak", "Henrik", "Aksel",<br>
"Kasper", "Mathias", "Jonas", "Tobias", "Liam", "Håkon", "Theodor"and "Magnus"<br>
Merge the arrays with girl names and boy names into a new array with all the names.
Hints:
<ul>
  <li style="list-style: none;">👉 You can solve this with two lines of code.</li>
  <li style="list-style: none;">👉 Remember that an empty array also has properties and methods 😃</li>
<ul>
<br>
`);
const boys = ["Jakob", "Lucas", "Emil", "Oskar", "Oliver", "William", "Filip", "Noah", "Elias", "Isak", "Henrik", "Aksel", "Kasper", "Mathias", "Jonas", "Tobias", "Liam", "Håkon", "Theodor", "Magnus"];
const allNames = girls.concat(boys);
printOut(allNames);
printOut(newLine);

printOut("--- Part 6 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
printOut(`
Create a class named TBook.<br>
TBook: private Tile, private Author, private ISBN, constructor(aTitle, aAuthor, aISBN), public toString() <br>
Let the constructor fill in the three attributes (title, author, and ISBN number).<br>
Create a public function "toString" in the class,<br>
it should return a text string that contains the three attributes of the class.<br>
<br>
Create an array that contains three instances of the TBook class.<br>
Use a loop to print out the books that are in the list.
<br>
`);
class TBook {
  #title;
  #author;
  #isbn;
  constructor(aTitle, aAuthor, aISBN){
    this.#title = aTitle;
    this.#author = aAuthor;
    this.#isbn = aISBN;
  }
  toString(){
    return `Title: ${this.#title}, Author: ${this.#author}, ISBN: ${this.#isbn}`;
  }
}

const book1 = new TBook("The Great Gatsby", "F. Scott Fitzgerald", "9780743273565");
const book2 = new TBook("To Kill a Mockingbird", "Harper Lee", "9780061120084");
const book3 = new TBook("1984", "George Orwell", "9780451524935");
const bookArray = [book1, book2, book3];
let part6Text = "";
for (const book of bookArray) {
  part6Text += book.toString() + "<br>";
}
printOut(part6Text);

printOut(newLine);

printOut("--- Part 7 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
printOut(`
Create an enumeration named EWeekDays.<br>
The enumeration should contain these values:<br>
<ul>
  <li>WeekDay1 = 0x01 (Monday)</li>
  <li>WeekDay2 = 0x02 (Tuesday)</li>
  <li>WeekDay3 = 0x04 (Wednesday)</li>
  <li>WeekDay4 = 0x08 (Thursday)</li>
  <li>WeekDay5 = 0x10 (Friday)</li>
  <li>WeekDay6 = 0x20 (Saturday)</li>
  <li>WeekDay7 = 0x40 (Sunday)</li>
</ul>
Also, add these two combined values:<br>
<ul>
  <li>Workdays = 0x01 + 0x02 + 0x04 + 0x08 + 0x10</li>
  <li>Weekends = 0x20 + 0x40</li>
</ul>
<br>
Use this function:<br>
Object.keys(EWeekDays) to create an array with the "keys" that exist in the EWeekDays object.<br>
Create a loop that traverses this "key" array and prints all the elements that exist in the EWeekDays object<br>
with both the name and the value of each element.<br>
<ul>
  <li style="list-style: none;">👉 Hint: Use W3Schools as I have shown you, here you see good examples of exactly this!</li>
<ul>
<br>
`);
const EWeekDays = {
    WeekDay1: { value: 0x01, name: "Mandag" },
    WeekDay2: { value: 0x02, name: "Tirsdag" },
    WeekDay3: { value: 0x04, name: "Onsdag" },
    WeekDay4: { value: 0x08, name: "Torsdag" },
    WeekDay5: { value: 0x10, name: "Fredag" },
    WeekDay6: { value: 0x20, name: "Lørdag" },
    WeekDay7: { value: 0x40, name: "Søndag" },

    Workdays: {
        value: 0x01 + 0x02 + 0x04 + 0x08 + 0x10,
        name: "Arbeidsdager"
    },

    Weekends: {
        value: 0x20 + 0x40,
        name: "Helg"
    },
};

const weekDayKeys = Object.keys(EWeekDays);
let part7Text = "";
for (const key of weekDayKeys) {
    const day = EWeekDays[key];
    part7Text += `${key}: Value = ${day.value}, Name = ${day.name}` + newLine;
}
printOut(part7Text);
printOut(newLine);

printOut("--- Part 8 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
printOut(`
Create an array that contains 35 random numbers from 1 to 20 (inclusive).<br>
Sort these arrays in ascending and descending order.<br>
To get full credit for this task.<br>
<strong>it must be solved with "callback" functions that you use in the .sort(...) method of this array.</strong>
<br>
 `);

const randomNumbers = [];
for (let i = 0; i < 35; i++) {
    const randomNum = Math.floor(Math.random() * 20) + 1;
    randomNumbers.push(randomNum);
}
function ascending(a, b) {
    return a - b;
}
function descending(a, b) {
    return b - a;
}
const ascendingNumbers = [...randomNumbers].sort(ascending);
const descendingNumbers = [...randomNumbers].sort(descending);
printOut("Original Array: " + randomNumbers.join(", "));
printOut("Ascending Order: " + ascendingNumbers.join(", "));
printOut("Descending Order: " + descendingNumbers.join(", "));
printOut(newLine);

printOut("--- Part 9 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
printOut(`
  Based on part 8:<br>
  Print out how many times the different numbers occur in the array.<br>
  <ul>
    <li>First, print the numbers and their frequency</li>
    <li>Then print the frequencies and which numbers they correspond to.</li>
  </ul>
   You must print the most frequent ones first,<br>and if there are multiple numbers where the frequency is the same,<br>then it should again be sorted from the smallest to the largest number.<br>
   Do not use maps or other advanced data structures for this task!<br>
<br>
  `);

const frequency = {};
for(let i = 0; i < randomNumbers.length; i++){
  if(frequency[randomNumbers[i]]){
    frequency[randomNumbers[i]] += 1;
  }else{
    frequency[randomNumbers[i]] = 1;
  }
}
let part9Text1 = "Number Frequencies:" + newLine;
for(const number in frequency){
  part9Text1 += `Number ${number} occurs ${frequency[number]} times.` + newLine;
}
printOut(part9Text1);
printOut(newLine);

function frequencySort(a, b){
  if(frequency[b] === frequency[a]){
    return a - b; // Ascending order for numbers
  }
  return frequency[b] - frequency[a]; // Descending order for frequency
}

const frequencyKeys = Object.keys(frequency);
frequencyKeys.sort(frequencySort);
const frequencyValues = [];
for(let i = 0; i < frequencyKeys.length; i++){
  const value = parseInt(frequencyKeys[i]);
  frequencyValues.push(value);
}
let part9Text2 = "Frequencies Sorted:" + newLine;
for(let i = 0; i < frequencyValues.length; i++){
  const num = frequencyValues[i];
  part9Text2 += `Number ${num} occurs ${frequency[num]} times.` + newLine;
}
printOut(part9Text2);
printOut(newLine);

/* Task 10*/
printOut("--- Part 10 ---------------------------------------------------------------------------------------------");
/* Put your code below here!*/
printOut(`
Create an array that contains rows and columns (2 dimensions, 5x9).<br>
Start with an empty array. Use "for" loops to create rows and columns, respectively.<br>
In each "cell," create a text that shows which row and column the "cell" is in.<br>
Then create two new sets of "for" loops to print the array itself.
Hint: For each round in the loop for the rows, you create a column.<br>
And for each round in the columns, you write the "cell" value.
<br>`);
const rows = 5;
const cols = 9;
const matrix = [];
for(let i = 0; i < rows; i++){
  const rowArray = [];
  for(let j = 0; j < cols; j++){
    rowArray.push(`Row ${i + 1}, Col ${j + 1}`);
  }
  matrix.push(rowArray);
}
let part10Text = "";
for(let i = 0; i < rows; i++){
  for(let j = 0; j < cols; j++){
    part10Text += matrix[i][j] + " | ";
  }
  part10Text += newLine;
}
printOut(part10Text);
printOut(newLine);
