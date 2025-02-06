"use strict";
import libSprite from "../../common/libs/libSprite_v2.mjs";
import lib2d from "../../common/libs/lib2d_v2.mjs";
import { gameProps } from "./Minesweeper.mjs";  

export class TGameBoard {
  #sps = [];
  #cvs;
  constructor(aSpriteCanvas, aSpriteInfo){
    const spi = aSpriteInfo;
    this.#cvs = aSpriteCanvas.canvas;
    
    // Top Left
    const pos = new lib2d.TPoint(0, 0);
    let sp = new libSprite.TSprite(aSpriteCanvas, spi.TopLeft, pos);
    this.#sps.push(sp);

    // Top Right
    pos.x = cvs.width - spi.TopRight.width;
    sp = new libSprite.TSprite(aSpriteCanvas, spi.TopRight, pos);
    this.#sps.push(sp);

    // Top Middle
    pos.x = spi.TopLeft.x + spi.TopLeft.width;
    sp = new libSprite.TSprite(aSpriteCanvas, spi.TopMiddle, pos);
    const noneUniformScale = {x: 1, y: 1};
    noneUniformScale.x = (cvs.width - (spi.TopLeft.width + spi.TopRight.width)) / spi.TopMiddle.width;
    sp.noneUniformScale = noneUniformScale;
    this.#sps.push(sp);

    // Bottom Left
    pos.x = 0;
    pos.y = cvs.height - spi.BottomLeft.height; 
    sp = new libSprite.TSprite(aSpriteCanvas, spi.BottomLeft, pos);
    this.#sps.push(sp);

    // Bottom Right
    pos.x = cvs.width - spi.BottomRight.width;
    pos.y = cvs.height - spi.BottomRight.height;
    sp = new libSprite.TSprite(aSpriteCanvas, spi.BottomRight, pos);
    this.#sps.push(sp);
    
    // Bottom Middle
    pos.x = spi.BottomLeft.width;
    pos.y = cvs.height - spi.BottomMiddle.height;
    sp = new libSprite.TSprite(aSpriteCanvas, spi.BottomMiddle, pos);
    noneUniformScale.x = (cvs.width - (spi.BottomLeft.width + spi.BottomRight.width)) / spi.BottomMiddle.width;
    sp.noneUniformScale = noneUniformScale;
    this.#sps.push(sp);

    // Left Middle
    pos.x = 0;
    pos.y = spi.TopLeft.height;
    sp = new libSprite.TSprite(aSpriteCanvas, spi.LeftMiddle, pos);
    noneUniformScale.x = 1;
    noneUniformScale.y = (cvs.height - (spi.TopLeft.height + spi.BottomLeft.height)) / spi.LeftMiddle.height;
    sp.noneUniformScale = noneUniformScale;
    this.#sps.push(sp);

    // Right Middle
    pos.x = cvs.width - spi.RightMiddle.width;
    pos.y = spi.TopRight.height;
    sp = new libSprite.TSprite(aSpriteCanvas, spi.RightMiddle, pos);
    noneUniformScale.y = (cvs.height - (spi.TopRight.height + spi.BottomRight.height)) / spi.RightMiddle.height;
    sp.noneUniformScale = noneUniformScale;
    this.#sps.push(sp);
  }

  draw(){
    this.#sps.forEach(sp => sp.draw());
  }

  get center (){
    return new lib2d.TPoint(this.#cvs.width / 2, this.#cvs.height / 2);
  }

  get size(){
    return {width: this.#cvs.width, height: this.#cvs.height};
  }

}