"use strict";
import { computerAnswers } from "./Mastermind.mjs";
import { playerAnswers } from "./colorPicker";

export function checkAnswer() {
  const c = [];
  for(let i = 0; i < computerAnswers.length; i++){
    c.push(computerAnswers[i]);
  }
  const p = [];
  for(let i = 0; i < playerAnswers.length; i++){
    p.push(playerAnswers[i]);
  }
  // 1. Test if color "p" is correctly placed.
  
  // 2. Test if color "p" is correct but wrongly placed.
}
