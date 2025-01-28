"use strict";
import lib2d from "../../common/libs/lib2d.mjs";
import libSound from "../../common/libs/libSound.mjs";
import libSprite from "../../common/libs/libSprite.mjs";
import { SpriteInfoList, GameProps, EGameStatus, startGame } from "./FlappyBird.mjs";

/*
Dere skal flytte FlappyBird Spriten til en fornuftig plass på skjermen.
Lage en play knapp som kan starte spillet.
*/

export class TMenu {
  #spFlappyBird;
  #spButtonPlay;
  #spNumber;
  #spInfoText;
  //Hint spGameOver, spMedal, spScore osv.
  #spGameOver;
  #spMedal;
  #spcvs;
  #activeSprite;
  constructor(aSpriteCanvas) {
    this.#spcvs = aSpriteCanvas;
    /* 
    Bruk denne koden for jukse litt og starte spillet direkte 
    i en annen status enn EGameStatus.idle
    */
    GameProps.status = EGameStatus.gameOver;
    const pos = new lib2d.TPosition(210, 180);
    this.#spFlappyBird = new libSprite.TSprite(aSpriteCanvas, SpriteInfoList.flappyBird, pos);
    
    pos.y = 260;
    pos.x = 245;
    this.#spButtonPlay = new libSprite.TSprite(aSpriteCanvas, SpriteInfoList.buttonPlay, pos);

    pos.x = 200;
    pos.y = 70;
    this.#spInfoText = new libSprite.TSprite(aSpriteCanvas, SpriteInfoList.infoText, pos);

    pos.x = 285;
    pos.y = 180;
    this.#spNumber = new libSprite.TSprite(aSpriteCanvas, SpriteInfoList.numberBig, pos);
    this.#spNumber.index = 3; //Nedtelling starter på 3
    
    pos.x = 185;
    pos.y = 130;
    this.#spGameOver = new libSprite.TSprite(aSpriteCanvas, SpriteInfoList.gameOver, pos);
    
    pos.x = 211;
    pos.y = 173;
    this.#spMedal = new libSprite.TSprite(aSpriteCanvas, SpriteInfoList.medal, pos);
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
      case EGameStatus.gameOver:
        this.#spInfoText.index = 1; //Endre teksten til "Game Over"
        this.#spInfoText.draw();
        this.#spGameOver.draw();
        this.#spMedal.draw();
        this.#spButtonPlay.draw();
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
      startGame();
    }
   }

}// End of TMenu class
