"use strict";
import libSprite from "../../common/libs/libSprite_v2.mjs";
import lib2d from "../../common/libs/lib2d_v2.mjs";

export class TGameBoard {
  #sptl = null; // TopLeft
  #sptm = null; // TopMiddle
  #sptr = null; // TopRight
  #sprm = null; // RightMiddle
  #sprb = null; // RightBottom
  #spbm = null; // BottomMiddle
  #spbl = null; // BottomLeft
  #splm = null; // LeftMiddle
  constructor(aSpcvs, aSpriteInfo){
    const pos = new lib2d.TPoint(0, 0);
    this.#sptl = new libSprite.TSprite(aSpcvs, aSpriteInfo.TopLeft, pos);
    pos.x = aSpriteInfo.TopLeft.width;
    this.#sptm = new libSprite.TSprite(aSpcvs, aSpriteInfo.TopMiddle, pos);
    pos.x += aSpriteInfo.TopMiddle.width;
    this.#sptr = new libSprite.TSprite(aSpcvs, aSpriteInfo.TopRight, pos);
  }

  draw(){
    this.#sptl.draw();
    this.#sptm.draw();
    this.#sptr.draw();
  }
}