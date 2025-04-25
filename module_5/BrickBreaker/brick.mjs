"use strict";
import lib2d from "../../common/libs/lib2d_v2.mjs";
import libSprite from "../../common/libs/libSprite_v2.mjs";
import { SpriteInfoList, GameProps } from "./BrickBreaker.mjs";

const NoOfBricksInRow = 7;

export class TBrick extends libSprite.TSprite {
  #lifeLeft;
  #spi;
  constructor(aSpriteCanvas, aIndex){
    const bounds = GameProps.bounds;
    const column = aIndex % NoOfBricksInRow;
    const row = Math.floor(aIndex / NoOfBricksInRow);
    let spi = SpriteInfoList.BrickBlue;
    switch(row){
      case 1:
        spi = SpriteInfoList.BrickPurple;
        break;
      case 2:
        spi = SpriteInfoList.BrickRed;
        break;
      case 3:
        spi = SpriteInfoList.BrickYellow;
        break;
    }

    let posX = column * (spi.width + 10) + bounds.left + 40;
    let posY = row * (spi.height + 10) + bounds.top + 100;
    const pos = new lib2d.TPoint(posX, posY);
    super(aSpriteCanvas, spi, pos);
    this.#lifeLeft = spi.count;
    this.#spi = spi;
  }   

  reduceLife(){
    this.#lifeLeft--;
    if(this.#lifeLeft <= 0){
      const index = GameProps.bricks.indexOf(this);
      GameProps.bricks.splice(index, 1);
    }else{
      this.index = this.#spi.count - this.#lifeLeft;
    }
 }

}