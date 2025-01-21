"use strict";
import libSprite from "../../common/libs/libSprite.mjs";
import { GameProps, EGameStatus } from "./FlappyBird.mjs";

class THero extends libSprite.TSprite {
  #spi;
  #gravity = 9.81 / 100;
  #velocity = 0;
  constructor(aSpriteCanvas, aSpriteInfo, aPosition) {
    super(aSpriteCanvas, aSpriteInfo, aPosition);
    this.#spi = aSpriteInfo;
    this.animateSpeed = 10;
    this.isDead = false;
    this.rotation = 45;
  }

  draw() {
    super.draw();
  }

  update() {
    const groundY = GameProps.ground.posY;
    const bottomY = this.posY + this.#spi.height;
    if (bottomY < groundY) {
      if (this.posY < 0) {
        this.posY = 0;
        this.#velocity = 0;
      }
      this.translate(0, this.#velocity);
      this.rotation = this.#velocity* 10;
      this.#velocity += this.#gravity;
    } else {
      this.posY = groundY - this.#spi.height;
      GameProps.status = EGameStatus.gameOver;
      this.animateSpeed = 0;
    }
  }

  flap() {
    this.#velocity = -3;
  }

}

export default THero;
