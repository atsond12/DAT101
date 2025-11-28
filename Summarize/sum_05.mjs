"use strict";
import { printOut, newLine } from "../../common/script/utils.mjs";

function calcArea(aLength, aHeight) {
  const length = aLength;
  const height = aHeight;
  const calc = length * height;
  return calc;
}

function ButtonCalcClick(eEvent) {
  let area1 = calcArea(10, 5);
  let area2 = calcArea(7, 3);
  let area3 = calcArea(5, 2);
  let area4 = calcArea(6, 4);
  let total = area1 + area2 + area3 + area4;
  printOut(`total area: ${area1} + \${area2} + ${area3} + ${area4} = ${total}`);
}

const cmbCalc = document.getElementById("cmbCalc");
cmbCalc.addEventListener("click", ButtonCalcClick);
