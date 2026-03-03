"use strict";
import { TSprite } from "libSprite";
import { TPoint } from "lib2d";

export class TGameBoard {
  #sps = [];
  #spcvs;
  constructor(aSpriteCanvas, aSpriteInfo) {
    const spi = aSpriteInfo;
    this.#spcvs = aSpriteCanvas;

    // Top Left
    const pos = new TPoint(0, 0);
    let sp = new TSprite(aSpriteCanvas, spi.TopLeft, pos.x, pos.y);
    this.#sps.push(sp);

    // Top Right
    pos.x = this.#spcvs.width - spi.TopRight.width;
    sp = new TSprite(aSpriteCanvas, spi.TopRight, pos.x, pos.y);
    this.#sps.push(sp);

    // Top Middle
    pos.x = spi.TopLeft.x + spi.TopLeft.width;
    sp = new TSprite(aSpriteCanvas, spi.TopMiddle, pos.x, pos.y);
    const noneUniformScale = { x: 1, y: 1 };
    noneUniformScale.x = (this.#spcvs.width - (spi.TopLeft.width + spi.TopRight.width)) / spi.TopMiddle.width;
    sp.noneUniformScale = noneUniformScale;
    this.#sps.push(sp);

    // Bottom Left
    pos.x = 0;
    pos.y = this.#spcvs.height - spi.BottomLeft.height;
    sp = new TSprite(aSpriteCanvas, spi.BottomLeft, pos.x, pos.y);
    this.#sps.push(sp);

    // Bottom Right
    pos.x = this.#spcvs.width - spi.BottomRight.width;
    pos.y = this.#spcvs.height - spi.BottomRight.height;
    sp = new TSprite(aSpriteCanvas, spi.BottomRight, pos.x, pos.y);
    this.#sps.push(sp);

    // Bottom Middle
    pos.x = spi.BottomLeft.width;
    pos.y = this.#spcvs.height - spi.BottomMiddle.height;
    sp = new TSprite(aSpriteCanvas, spi.BottomMiddle, pos.x, pos.y);
    noneUniformScale.x = (this.#spcvs.width - (spi.BottomLeft.width + spi.BottomRight.width)) / spi.BottomMiddle.width;
    sp.noneUniformScale = noneUniformScale;
    this.#sps.push(sp);

    // Left Middle
    pos.x = 0;
    pos.y = spi.TopLeft.height;
    sp = new TSprite(aSpriteCanvas, spi.LeftMiddle, pos.x, pos.y);
    noneUniformScale.x = 1;
    noneUniformScale.y = (this.#spcvs.height - (spi.TopLeft.height + spi.BottomLeft.height)) / spi.LeftMiddle.height;
    sp.noneUniformScale = noneUniformScale;
    this.#sps.push(sp);

    // Right Middle
    pos.x = this.#spcvs.width - spi.RightMiddle.width;
    pos.y = spi.TopRight.height;
    sp = new TSprite(aSpriteCanvas, spi.RightMiddle, pos.x, pos.y);
    noneUniformScale.y = (this.#spcvs.height - (spi.TopRight.height + spi.BottomRight.height)) / spi.RightMiddle.height;
    sp.noneUniformScale = noneUniformScale;
    this.#sps.push(sp);
  }

  draw() {
    this.#sps.forEach((sp) => sp.draw());
  }

  get center() {
    return new TPoint(this.#spcvs.width / 2, this.#spcvs.height / 2);
  }

  get size() {
    return { width: this.#spcvs.width, height: this.#spcvs.height };
  }
}
