"use strict";
import lib2D from "../../common/libs/lib2d_v2.mjs";
import libSprite from "../../common/libs/libSprite_v2.mjs";
import MastermindBoard from "./MastermindBoard.mjs";

const Positions = MastermindBoard.ColorPicker;


export class TColorPicker extends libSprite.TSprite {
  constructor(spcvs, spriteInfo, color, index){
    super(spcvs, spriteInfo,Positions[color]);
  }
} 