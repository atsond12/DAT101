"use strict";
import { printOut, newLine } from "../../common/script/utils.mjs";
const txtPhrase = document.getElementById("txtPhrase");
const submitButton = document.getElementById("btnSubmit");
const htmlSpace = "&nbsp;";
submitButton.addEventListener("click", () => {
  let phrase = txtPhrase.value;
  let length = phrase.length;
  while(length < 60){
   phrase = htmlSpace + phrase; 
   length++;
  }
  printOut(phrase);
});
