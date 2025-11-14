"use strict";
import { printOut, newLine } from "../../common/script/utils.mjs";

printOut("--- Part 1 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
printOut("Replace this with you answer!");
printOut(newLine);

printOut("--- Part 2 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
printOut("Replace this with you answer!");
printOut(newLine);

printOut("--- Part 3 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
printOut("Replace this with you answer!");
printOut(newLine);

printOut("--- Part 4 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
printOut("Replace this with you answer!");
printOut(newLine);

printOut("--- Part 5 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
/*
  Fahrenheit = (Kelvin − 273.15) × 9/5 + 32
  Celsius = Kelvin − 273.15
  Celsius = (Fahrenheit − 32) × 5/9
*/
const ETempType = {
  Kelvin: 1,
  Celsius: 2,
  Fahrenheit: 3,
}

function Part5ConvertTemp(aTemp, aTempType){
  let kelvin = 0, celsius = 0, fahrenheit = 0;
  let tempTypeName = "";

  switch(aTempType){
    case ETempType.Kelvin:
      kelvin = aTemp;
      celsius = kelvin - 273.15;
      fahrenheit = (kelvin - 273.15) * 9/5 + 32;
      tempTypeName = "Kelvin";
    break;
    case ETempType.Celsius:
      celsius = aTemp;
      kelvin = celsius + 273.15;
      fahrenheit = (celsius * 9/5) + 32;
      tempTypeName = "Celsius";
    break;
    case ETempType.Fahrenheit:
      fahrenheit = aTemp;
      celsius = (fahrenheit - 32) * 5/9;
      kelvin = celsius + 273.15;
      tempTypeName = "Fahrenheit";
    break;
  }
  printOut(`Convert from ${aTemp} ${tempTypeName}:`);
  printOut(`&nbsp;Kelvin: ${Math.round(kelvin)}`);
  printOut(`&nbsp;Celsius: ${celsius.toFixed(0)}`);
  printOut(`&nbsp;Fahrenheit: ${fahrenheit.toFixed(0)}`);
  printOut("");
}

Part5ConvertTemp(300, ETempType.Kelvin);
Part5ConvertTemp(26.85, ETempType.Celsius);
Part5ConvertTemp(80.33, ETempType.Fahrenheit);
printOut(newLine);

printOut("--- Part 6 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
// Formula: net = (100 * gross) / (vat + 100)
//normal = 25%, food = 15%, hotel, transport, and cinema = 10%
function Part6Calculate(aGrossAmount, aTaxGroup) {
  const taxGroup = aTaxGroup.toLowerCase();
  let taxRate = 0;
  switch (taxGroup) {
    case "normal":
      taxRate = 25;
      break;
    case "food":
      taxRate = 15;
      break;
    case "hotel":
    case "transport":
    case "cinema":
      taxRate = 10;
      break;
    default:
      printOut("Error: Unknown tax group!");
      return;
  }
  const netAmount = (100 * aGrossAmount) / (taxRate + 100);
  printOut(`Gross amount: ${aGrossAmount.toFixed(2)}`);
  printOut(`Tax group: ${aTaxGroup}, Tax rate: ${taxRate}%`);
  printOut(`Net amount: ${netAmount.toFixed(2)}`);
  printOut("");
}

Part6Calculate(100, "Normal");
Part6Calculate(100, "Food");
Part6Calculate(100, "Hotel");
Part6Calculate(100, "Transport");
Part6Calculate(100, "Cinema");
Part6Calculate(100, "Car");

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
