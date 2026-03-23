"use strict";
import { TSpriteDraggable } from "libSprite";
import { spcvs, SpriteInfoList, colorPickers } from "./Mastermind.mjs";
import { MastermindBoard } from "./MastermindBoard.mjs";

export class TColorPicker extends TSpriteDraggable {
  constructor(aPos) {
    super(spcvs, SpriteInfoList.ColorPicker, aPos.x, aPos.y);
		this.canDrop = false;
  }

  onStartDrag() {
    const index = colorPickers.indexOf(this);
    colorPickers.splice(index, 1);
		colorPickers.push(this);
  }
}
