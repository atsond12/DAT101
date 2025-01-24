"use strict";
import lib2d from "../../common/libs/lib2d.mjs";
import libSprite from "../../common/libs/libSprite.mjs";
import { SpriteInfoList, GameProps, EGameStatus } from "./FlappyBird.mjs";

export class TMenu{
  #spFlappyBird;

  constructor(aSpriteCanvas){
    const pos = new lib2d.TPosition(0, 0);
    this.#spFlappyBird = new libSprite.TSprite(aSpriteCanvas, SpriteInfoList.flappyBird, pos);
  }

  draw(){
    switch(GameProps.status){
      case EGameStatus.idle:
        this.#spFlappyBird.draw();
        break;
    }
    this.#spFlappyBird.draw();
  }
}