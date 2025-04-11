"use strict";
import lib2d from "../../common/libs/lib2d_v2.mjs";
import libSprite from "../../common/libs/libSprite_v2.mjs";
import { SpriteInfoList, GameProps } from "./BrickBreaker.mjs";


export class TBrick extends libSprite.TSprite {
  constructor(aSpriteCanvas){
    const bounds = GameProps.bounds;
    let centerX = (bounds.right - bounds.left) / 2;
    centerX -= (SpriteInfoList.BrickBlue.width / 2);
    const pos = new lib2d.TPoint(centerX, bounds.top + 200);
  
    super(aSpriteCanvas, SpriteInfoList.BrickBlue, pos);
  }
}