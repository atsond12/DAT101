"use strict";
import lib2d from "../../common/libs/lib2d_v2.mjs";
import libSprite from "../../common/libs/lib2d_v2.mjs";

export class TColorButton extends libSprite.TSpriteButton{
  constructor(aSpriteCanvas, aSpriteInfo){
    super(aSpriteCanvas, aSpriteInfo, aSpriteInfo.dst);
  }
}//End of TColorButton class