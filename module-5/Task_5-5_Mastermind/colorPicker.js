"use strict";
import { TSpriteDraggable, TSnapTo } from "libSprite";
import { spcvs, SpriteInfoList, colorPickers, menu } from "./Mastermind.mjs";
import { MastermindBoard } from "./MastermindBoard.mjs";
import { TPoint } from "lib2d";

let playerAnswerRow = MastermindBoard.PlayerAnswer.Row1;
export let playerAnswers = [null, null, null, null];

class TSnapping extends TSnapTo {
  constructor() {
    super(playerAnswerRow, 30);
  }
}

export class TColorPicker extends TSpriteDraggable {
  constructor(aPos) {
    super(spcvs, SpriteInfoList.ColorPicker, aPos.x, aPos.y);
    this.snapTo = new TSnapping();
    this.initPos = new TPoint(aPos.x, aPos.y);
  }

  duplicate() {
    const newColorPicker = new TColorPicker(this.initPos);
    newColorPicker.index = this.index;
    return newColorPicker;
  }

  onDrop(aPos) {
    const dup = this.duplicate();
    colorPickers.push(dup);
    for(let i = 0; i < playerAnswerRow.length; i++){
      const pos = playerAnswerRow[i];
      if((aPos.x === pos.x) && (aPos.y === pos.y)){
        playerAnswers[i] = this;
      }
    }
    let count = 0;
    for(let i = 0; i < playerAnswers.length; i++){
      if(playerAnswers[i] !== null){
        count++;
      }
    }
    if(count >= 4){
      console.log("We must enable the check answer button.");
      menu.SetCheckAnswerDisabled(false);
    }
  }

  canDrop(aPos) {
    for (let i = 0; i < playerAnswerRow.length; i++) {
      const pos = playerAnswerRow[i];
      if (aPos.x === pos.x && aPos.y === pos.y) {
        return true;
      }
    }
    return false;
  }

  onStartDrag() {
    const index = colorPickers.indexOf(this);
    colorPickers.splice(index, 1);
    colorPickers.push(this);
  }
}
