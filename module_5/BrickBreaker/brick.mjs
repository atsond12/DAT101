"use strict";
import lib2d from "../../common/libs/lib2d_v2.mjs";
import libSprite from "../../common/libs/libSprite_v2.mjs";
import { SpriteInfoList, GameProps } from "./BrickBreaker.mjs";


export class TBrick extends libSprite.TSprite {
  constructor(aSpriteCanvas, aIndex){
    const bounds = GameProps.bounds;
    const spi = SpriteInfoList.BrickBlue;
    //let centerX = (bounds.right - bounds.left) / 2;
    let posX = aIndex * (spi.width + 10) + bounds.left + 40;
    const pos = new lib2d.TPoint(posX, bounds.top + 200);
  
    super(aSpriteCanvas, SpriteInfoList.BrickBlue, pos);
  }
}