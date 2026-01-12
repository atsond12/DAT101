"use strict";
import { TSprite } from "libSprite";

export class TBackground{
  #spriteBackground;
  #spriteGround;

  constructor(aSpcvs, aSPI){
    this.#spriteBackground = new TSprite(aSpcvs,aSPI.background,0,0);
  }

  draw(){
    this.#spriteBackground.draw();
  }
}


