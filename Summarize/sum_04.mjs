"use strict";
import { printOut, newLine } from "../../common/script/utils.mjs";
const txtGuessNumber = document.getElementById("txtGuessNumber");
const btnSubmit = document.getElementById("btnSubmit");

btnSubmit.addEventListener("click", () => {
  const guessNumber = parseInt(txtGuessNumber.value);
  printOut(`Number to guess: ${guessNumber}`);
  let isCorrect = false; //Kun for å gi den en verdi, har ingen formål her!
  let guess = 0;
  let guessCount = 0;
  do{
    guess = Math.ceil(Math.random() * 1000000);
    guessCount++;
    isCorrect = guess === guessNumber;
  }while(!isCorrect);
  
  printOut(`Correct guess: ${guess}, in ${guessCount} tries!`);
});
