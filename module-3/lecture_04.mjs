"use strict";
import { printOut } from "../../common/script/utils.mjs";
do {
  const d1 = Math.ceil(Math.random() * 6);
  const d2 = Math.ceil(Math.random() * 6);
  const d3 = Math.ceil(Math.random() * 6);
  const d4 = Math.ceil(Math.random() * 6);
  const d5 = Math.ceil(Math.random() * 6);
  const d6 = Math.ceil(Math.random() * 6);
  const diceThrow = "" + d1 + d2 + d3 + d4 + d5 + d6;

  let diceCount = "";
  let c1 = 0,
    c2 = 0,
    c3 = 0,
    c4 = 0,
    c5 = 0,
    c6 = 0;
  for (let i = 0; i < 6; i++) {
    if (diceThrow.charAt(i) == "1") {
      c1++;
    } else if (diceThrow.charAt(i) == "2") {
      c2++;
    } else if (diceThrow.charAt(i) == "3") {
      c3++;
    } else if (diceThrow.charAt(i) == "4") {
      c4++;
    } else if (diceThrow.charAt(i) == "5") {
      c5++;
    } else if (diceThrow.charAt(i) == "6") {
      c6++;
    }
  }
  diceCount = "" + c1 + c2 + c3 + c4 + c5 + c6;
  if (diceCount === "111111") {
    printOut("Dice throw: " + diceThrow);
    printOut("Dice count: " + diceCount);
    printOut("You have rolled a straight!");
  } else if (diceCount.includes("6")) {
    printOut("Dice throw: " + diceThrow);
    printOut("Dice count: " + diceCount);
    printOut("You have rolled maxi yahtzee!");
    break;
  }
} while (1);
