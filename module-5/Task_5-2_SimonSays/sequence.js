"use strict";
import { EGameStatusType } from "./SimonSays.mjs";

let colorButton = null;
let sequence = [];

export function addRandomButton(aColorButtons){
 const index = Math.floor(Math.random() * aColorButtons.length);
 colorButton = aColorButtons[index];
 sequence.push(colorButton);
 setTimeout(setButtonDown, 1000); // This is the wait time before seq. start
}

export function testOfUserInput(aColorButton){
  if(aColorButton === colorButton){
    console.log("YES!");
  }else{
    console.log("Oh no!");
  }
}

function setButtonDown(){
  colorButton.onMouseDown();
  setTimeout(setButtonUp, 1500);
}

function setButtonUp(){
  colorButton.onMouseUp();
  EGameStatusType.state = EGameStatusType.Gamer;
}

