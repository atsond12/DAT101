"use strict";
import lib2d from "../../common/libs/lib2d.mjs";
import libSound from "../../common/libs/libSound.mjs";
import libSprite from "../../common/libs/libSprite.mjs";
import { SpriteInfoList, GameProps, EGameStatus } from "./FlappyBird.mjs";

/*
Dere skal flytte FlappyBird Spriten til en fornuftig plass på skjermen.
Lage en play knapp som kan starte spillet.
*/

export class TMenu {
  #spFlappyBird;
  #spButtonPlay;
  #spNumber;
  #spInfoText;
  #spcvs;
  #activeSprite;
  constructor(aSpriteCanvas) {
    this.#spcvs = aSpriteCanvas;
    const pos = new lib2d.TPosition(200, 100);
    //GameProps.status = EGameStatus.getReady;

    this.#spFlappyBird = new libSprite.TSprite(aSpriteCanvas, SpriteInfoList.flappyBird, pos);
    pos.y = 200;
    pos.x = 230;

    this.#spButtonPlay = new libSprite.TSprite(aSpriteCanvas, SpriteInfoList.buttonPlay, pos);

    pos.x = 200;
    pos.y = 100;
    this.#spInfoText = new libSprite.TSprite(aSpriteCanvas, SpriteInfoList.infoText, pos);

    pos.x = 285;
    pos.y = 180;
    this.#spNumber = new libSprite.TSprite(aSpriteCanvas, SpriteInfoList.numberBig, pos);
    this.#spNumber.index = 3; //Nedtelling starter på 3
    this.#spcvs.addEventListener("mousemove", this.#onMouseMove);
    this.#spcvs.addEventListener("click", this.#onClick);
    this.#activeSprite = null; //Vi har ingen aktive sprite enda, når musen er over en sprite setter vi denne til den aktive sprite
  }

  draw() {
    switch (GameProps.status) {
      case EGameStatus.idle:
        this.#spFlappyBird.draw();
        this.#spButtonPlay.draw();
        break;
      case EGameStatus.getReady:
        this.#spInfoText.draw();
        this.#spNumber.draw();
        break;
    }
  } // end of draw

  //Ikke eksamensrelevant kode, men viktig for eventer i canvas
  #onMouseMove = (aEvent) => {
    const pos = this.#spcvs.getMousePos(aEvent);
    const boundRect = this.#spButtonPlay.boundingBox;
    switch(GameProps.status){
      case EGameStatus.idle:
        if (boundRect.isPositionInside(pos)) {
          this.#spcvs.style.cursor = "pointer";
          this.#activeSprite = this.#spButtonPlay;
        } else {
          this.#spcvs.style.cursor = "default";
          this.#activeSprite = null; //Ingen sprite er aktiv
        }
        break;
    }
  };

  #onClick = () => {
    if (this.#activeSprite === this.#spButtonPlay) {
      GameProps.status = EGameStatus.getReady;
      this.#spcvs.style.cursor = "default";
      setTimeout(this.#onCountDown, 1000);
    }
  };

   #onCountDown = () =>{
    if(this.#spNumber.index > 1){
      this.#spNumber.index--;      
      setTimeout(this.#onCountDown, 1000);
    }else{
      GameProps.status = EGameStatus.playing;
    }
   }

}// End of TMenu class
