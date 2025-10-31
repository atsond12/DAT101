"use strict";
import { printOut, newLine } from "../../common/script/utils.mjs";

printOut("--- Part 1 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
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
const part2Text = part1Array.join(", ");
printOut(part2Text);
printOut(newLine);

printOut("--- Part 3 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
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
const girls = ["Anne", "Inger", "Kari", "Marit", "Ingrid", "Liv", "Eva", "Berit", "Astrid", "Bjørg", "Hilde", "Anna", "Solveig", "Marianne", "Randi", "Ida", "Nina", "Maria", "Elisabeth", "Kristin"];

function removeNameFromArray(aArray, aName){
  let deleteIndex = -1;
  for(let i = 0; i < aArray.length; i++){
    const name = aArray[i];
    if(name === aName){
      // Her kan vi slette elementet for eksempel "Hilde"
      // Dette gjør vi ikke her! Her løper vi igjen, og må slette senere!
      // Vi må lagre indeksen i en variable.
      deleteIndex = i;
      break; // 
    }
  }
  // Teste om jeg kan slette
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
