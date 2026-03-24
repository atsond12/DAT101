"use strict";
import { computerAnswers, menu } from "./Mastermind.mjs";
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
  const correct = [];
  for(let i = 0; i < p.length; i++){
    if( p[i].index === c[i].index ){
      correct.push(i); // We save the correct index
    }
  }
  // We need to remove the correct ones from the list P and C
  for(let i = 0; i < correct.length; i++){
    p.splice(correct[i], 1);
    c.splice(correct[i], 1);
  }
  menu.createHints(correct.length, 0);
  // 2. Test if color "p" is correct but wrongly placed.
}
