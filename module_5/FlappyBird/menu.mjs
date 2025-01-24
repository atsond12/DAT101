"use strict";
import lib2d from "../../common/libs/lib2d.mjs";
import libSprite from "../../common/libs/libSprite.mjs";
import { SpriteInfoList, GameProps, EGameStatus } from "./FlappyBird.mjs";

/*
Dere skal flytte FlappyBird Spriten til en fornuftig plass på skjermen.
Lage en play knapp som kan starte spillet.
*/


export class TMenu{
  #spFlappyBird;
  #spButtonPlay;
  #spcvs;
  constructor(aSpriteCanvas){
    this.#spcvs = aSpriteCanvas;
    const pos = new lib2d.TPosition(200, 100);
    this.#spFlappyBird = new libSprite.TSprite(aSpriteCanvas, SpriteInfoList.flappyBird, pos);
    pos.y = 200;
    pos.x = 230;
    this.#spButtonPlay = new libSprite.TSprite(aSpriteCanvas, SpriteInfoList.buttonPlay, pos);
    this.#spcvs.addEventListener("mousemove", this.#onMouseMove);
  }


  draw(){
    switch(GameProps.status){
      case EGameStatus.idle:
        this.#spFlappyBird.draw();
        this.#spButtonPlay.draw();
        break;
    }
  }// end of draw

  //Ikke eksamensrelevant kode, men viktig for eventer i canvas
  #onMouseMove = (aEvent) => {
    const pos = this.#spcvs.getMousePos(aEvent);
  }

}