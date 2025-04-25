"use strict";
import lib2D from "../../common/libs/lib2d_v2.mjs";
import libSprite from "../../common/libs/libSprite_v2.mjs";
import { SpriteInfoList, GameProps } from "./BrickBreaker.mjs";

export class THero {
  #sprites;
  #paddleIndex = 0;
  #spcvs;
  constructor(aSpriteCanvas) {
    this.#spcvs = aSpriteCanvas;
    const pos = new lib2D.TPoint(300, 650);
    this.#sprites = [new libSprite.TSprite(aSpriteCanvas, SpriteInfoList.PaddleSmall, pos), new libSprite.TSprite(aSpriteCanvas, SpriteInfoList.PaddleLarge, pos)];
    this.#spcvs.onMouseMove = this.#onMouseMove;
  }

  #onMouseMove = (aEvent) => {
    const pos = this.#spcvs.mousePos;
    const centerX = this.#sprites[this.#paddleIndex].width / 2;
    this.#sprites[this.#paddleIndex].x = pos.x - centerX;
    const bounds = GameProps.bounds;
    // Test om helten er innenfor spilleområdet
    const currentSprite = this.#sprites[this.#paddleIndex];
    if (currentSprite.x < bounds.left){
      currentSprite.x = bounds.left;
    }else if (currentSprite.right > bounds.right){
      currentSprite.x = bounds.right - currentSprite.width;
    }
  }

  draw() {
    this.#sprites[this.#paddleIndex].draw();
  }

  get shape() {
    return this.#sprites[this.#paddleIndex].shape;
  }
}
