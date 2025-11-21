"use strict";
import { printOut, newLine } from "../../common/script/utils.mjs";
const ageInput = document.getElementById("txtAge");
const submitButton = document.getElementById("btnSubmit");

const ages = [];

submitButton.addEventListener("click", () => {
  let text = "";
  const sep = " ";
  const age = parseInt(ageInput.value, 10);
  ages.push(age);
  // ages.length -> maks indeks + 1.
  // [12, 10, 15, 25, 40, 9]

  for (let i = 0; i < ages.length; i++) {
    text += `${ages[i]}${sep}`;
  }
  printOut(text);
});
