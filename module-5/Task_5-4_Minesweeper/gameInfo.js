"use strict";
import { TSpriteButton, TSpriteNumber, ESpriteNumberJustifyType } from "libSprite";
import { TPoint } from "lib2d";
import { gameLevel, newGame } from "./Minesweeper.mjs";

export class TGameInfo {
  #leftNumber;
  #rightNumber;
  #smiley;
  #hndTimer;

  constructor(aSpcvs, aSPI) {
    const pos = new TPoint();
    pos.x = aSPI.Board.LeftMiddle.width;
    pos.y = 22;
    this.#leftNumber = new TSpriteNumber(aSpcvs, aSPI.Numbers, pos.x, pos.y);
    this.#leftNumber.digits = 3;
    this.#leftNumber.value = gameLevel.Mines;
    pos.x = aSpcvs.width - 24;
    this.#rightNumber = new TSpriteNumber(aSpcvs, aSPI.Numbers, pos.x, pos.y);
    this.#rightNumber.justify = ESpriteNumberJustifyType.Right;
    this.#rightNumber.digits = 3;
    pos.x = (aSpcvs.width / 2) - (aSPI.ButtonSmiley.width / 2)
    this.#smiley = new TSpriteButton(aSpcvs, aSPI.ButtonSmiley, pos.x, pos.y);
    this.#hndTimer = setInterval(this.onTime.bind(this), 1000);
    this.#smiley.addEventListener("mousedown", this.#smileyMouseDown.bind(this));
    this.#smiley.addEventListener("mouseup", this.#smileyMouseUp.bind(this))
  }

  #smileyMouseDown(){
    this.#smiley.index++;
  }

  #smileyMouseUp(){
    this.#smiley.index--;
    newGame();
  }


  get flagCount(){
    return this.#leftNumber.value;
  }

  set flagCount(aValue){
    this.#leftNumber.value = aValue;
  }

  stopTimer(){
    clearInterval(this.#hndTimer);
    this.#hndTimer = null;
  }

  setSmileyIndex(aIndex){
    this.#smiley.index = aIndex;
  }

  draw(){
    this.#leftNumber.draw();
    this.#rightNumber.draw();
    this.#smiley.draw();
  }

  onTime(){
    this.#rightNumber.value++;
  }

} // End of TGameInfo
