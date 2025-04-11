"use strict";
import lib2d from "../../common/libs/lib2d_v2.mjs";
import libSprite from "../../common/libs/libSprite_v2.mjs";
import { SpriteInfoList, GameProps } from "./BrickBreaker.mjs";


export class TBrick extends libSprite.TSprite {
  constructor(aSpriteCanvas){
    const bounds = GameProps.bounds;
    const pos = new lib2d.TPoint(0, 0);
    pos.x = bounds.x;
    pos.y = bounds.y;
    super(aSpriteCanvas, SpriteInfoList.BrickBlue, pos);
  }
}