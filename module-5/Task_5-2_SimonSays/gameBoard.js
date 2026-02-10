"use strict";
import { TPoint, TCircle } from "lib2d";
import { ESpriteNumberJustifyType, TSprite, TSpriteButton, TSpriteNumber} from "libSprite";
import { TColorButton } from "./colorButton.js";
import { activateAudioContext } from "libSound";
import { spawnColorButton } from "./SimonSays.mjs";

export class TGameBoard extends TSprite{
  #colorButtons;
  #gameInfo;
  #isSoundEnabled;
  #spFinalScore;
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

    this.#gameInfo = new TSpriteButton(aSpcvs, aSPI.ButtonStartEnd, posX, posY, TCircle);
    this.#gameInfo.debug = true;
    this.#gameInfo.onClick = this.#gameInfoClick.bind(this);
    this.#disableColorButtons(true);
    this.#isSoundEnabled = false;
    this.spRound = new TSpriteNumber(aSpcvs, aSPI.number, 405, 385);
    this.spRound.justify = ESpriteNumberJustifyType.Right;
    this.spRound.value = 0;
    this.#spFinalScore = new TSpriteNumber(aSpcvs, aSPI.number, 400, 440);
    this.#spFinalScore.justify = ESpriteNumberJustifyType.Center;
    this.#spFinalScore.visible = false;
  }

  get colorButtons(){
    return this.#colorButtons;
  }

  gameOver(){
    this.#disableColorButtons(true);
    this.#gameInfo.index = 1;
    this.#gameInfo.hidden = false;
    this.#gameInfo.disabled = false;
    this.#spFinalScore.value = this.spRound.value;
    this.#spFinalScore.visible = true;
  }

  draw(){
    super.draw();
    for(let i = 0; i < this.#colorButtons.length; i++){
      const colorButton = this.#colorButtons[i];
      colorButton.draw();
    }
    this.spRound.draw();
    this.#gameInfo.draw();
    this.#spFinalScore.draw();
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
    spawnColorButton(); // This activates the sequence when we start the game.
  }
}
//Test