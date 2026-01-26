"use strict";
import { TSprite } from "libSprite";
import { EGameStatus } from "./FlappyBird.mjs";
import { TSineWave } from "lib2d";

export class THero extends TSprite {
  #gravity;
  #speed;
  #wave;
  constructor(aSpcvs, aSPI) {
    super(aSpcvs, aSPI, 100, 20);
    this.animationSpeed = 20;
    this.#gravity = 9.81 / 100;
    this.#speed = 0;
    this.debug = true;
    this.#wave = new TSineWave(1, 1);
    this.y += this.#wave.value;
  }

  animate() {
    const hasGravity = 
       EGameStatus.state === EGameStatus.gaming || 
       EGameStatus.state === EGameStatus.heroIsDead

    if (hasGravity) {
      if (this.y < 400 - this.height) {
        this.#speed += this.#gravity; // increase speed due to gravity
        this.y += this.#speed; // update position based on speed
        if (this.rotation < 90) {
          // limit max rotation
          this.rotation = this.#speed * 25; // tilt down based on speed
        }
      } else {
        EGameStatus.state = EGameStatus.gameOver;
        this.animationSpeed = 0;
      }
    }else if(EGameStatus.state === EGameStatus.idle){
      this.y += this.#wave.value;
    }
  } // End of animate

  flapTest() {
    this.#speed = -3.5;
    this.rotation = 0;
  }
}
