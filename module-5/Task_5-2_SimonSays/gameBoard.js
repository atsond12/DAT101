"use strict";
import { TPoint } from "lib2d";
import { TSprite, TSpriteButton } from "libSprite";
import { TColorButton } from "./colorButton.js";
import { activateAudioContext } from "libSound";

export class TGameBoard extends TSprite{
  #colorButtons;
  #gameInfo;
  #isSoundEnabled;
  constructor(aSpcvs, aSPI){
    super(aSpcvs, aSPI.Background, 0, 0);
    const center = new TPoint(
      aSPI.Background.width / 2,
      aSPI.Background.height / 2);

    this.#colorButtons = [
      new TColorButton(aSpcvs, aSPI.ButtonRed, center),
      new TColorButton(aSpcvs, aSPI.ButtonBlue, center),
      new TColorButton(aSpcvs, aSPI.ButtonGreen, center),
      new TColorButton(aSpcvs, aSPI.ButtonYellow, center)
    ];

    let posX = center.x - aSPI.ButtonStartEnd.width / 2;
    let posY = center.y - aSPI.ButtonStartEnd.height / 2;

    this.#gameInfo = new TSpriteButton(aSpcvs, aSPI.ButtonStartEnd, posX, posY);
    this.#gameInfo.debug = true;
    this.#gameInfo.onClick = this.#gameInfoClick.bind(this);
    this.#disableColorButtons(true);
    this.#isSoundEnabled = false;
  }

  draw(){
    super.draw();
    for(let i = 0; i < this.#colorButtons.length; i++){
      const colorButton = this.#colorButtons[i];
      colorButton.draw();
    }
    this.#gameInfo.draw();
  }

  #disableColorButtons(aDisable){
    for(let i = 0; i < this.#colorButtons.length; i++){
      const colorButton = this.#colorButtons[i];
      colorButton.disabled = aDisable;
    }
  }

  #gameInfoClick(){
    this.#gameInfo.disabled = true;
    this.#gameInfo.hidden = true;
    this.#disableColorButtons(false);
    if(this.#isSoundEnabled === false){
      activateAudioContext();
      this.#isSoundEnabled = true;
      for(let i = 0; i < this.#colorButtons.length; i++){
        const colorButton = this.#colorButtons[i];
        colorButton.createSound(i);
      }
    }
  }
}
//Test