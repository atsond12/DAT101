"use strict";
import { TPoint } from "lib2d";
import {TSpriteButton, TSpriteNumber, ESpriteNumberJustifyType} from "libSprite";
import { SpriteInfoList, gameLevel, newGame } from "./Minesweeper.mjs";

//Lag en klasse med navn TScoreBoard
//Klassen har tre private sprites;
// - Øvre venstre hjørne (antall miner). TSpriteNumber
// - Øvre høyre hjørne (tid). TSpriteNumber
// - Øvre midten (smiley). TSpriteButton
//Konstruktørens parameter er : aSpriteCanvas
//klassen trenger en draw metode som tegner alle sprites

export class TScoreBoard {
  #spMines;
  #spTime;
  #spSmiley;
  #hndTime;
  #spcvs;
  constructor(aSpriteCanvas) {
    this.#spcvs = aSpriteCanvas;
    const pos = new TPoint(90, 22);
    this.#spMines = new TSpriteNumber(aSpriteCanvas, SpriteInfoList.Numbers, pos.x, pos.y);
    this.#spMines.justify = ESpriteNumberJustifyType.Center;
    this.#spMines.digits = 3;
    this.#spMines.value = gameLevel.Mines;

    pos.x = aSpriteCanvas.width -92;
    this.#spTime = new TSpriteNumber(aSpriteCanvas, SpriteInfoList.Numbers, pos.x, pos.y);
    this.#spTime.justify = ESpriteNumberJustifyType.Center;
    this.#spTime.digits = 3;
    this.#spTime.value = 0;

    pos.x = aSpriteCanvas.width / 2 - SpriteInfoList.ButtonSmiley.width / 2;
    this.#spSmiley = new TSpriteButton(aSpriteCanvas, SpriteInfoList.ButtonSmiley, pos.x, pos.y);
    this.#spSmiley.onMouseDown = this.onSmileyMouseDown; //Dette må være en pil-funksjon
    this.#spSmiley.onMouseUp = this.onSmileMouseUp; //Dette må være en pil-funksjon
    this.#spSmiley.onClick = this.onSmileyClick; //Dette må være en pil-funksjon

    this.#hndTime = setInterval(this.#increaseTime, 1000);
  }

  draw() {
    this.#spMines.draw();
    this.#spTime.draw();
    this.#spSmiley.draw();
  }

  get spSmiley() {
    return this.#spSmiley;
  }

  //Vi må lage denne som pil-funksjon for å kunne bruke this
  #increaseTime = () => {
    if (this.#spTime.value < 999) {
      this.#spTime.value++;
    } else {
      this.#spTime.value = 999;
    }
  };

  stopTime() {
    clearInterval(this.#hndTime);
  }

  onSmileyMouseDown = () => {
    this.#spSmiley.index++;
  };

  onSmileMouseUp = () => {
    this.#spSmiley.index--;
  };

  onSmileyClick = () => {
    this.#spSmiley.index = 0;
    newGame();
  };

  reset() {
    clearInterval(this.#hndTime);
    this.#spTime.value = 0;
    this.#spMines.value = gameLevel.Mines;

    const pos = new TPoint(112, 22);

    pos.x = this.#spcvs.width / 2 - SpriteInfoList.ButtonSmiley.width / 2;
    this.#spSmiley.x = pos.x;

    pos.x = this.#spcvs.width -92;
    this.#spTime.x = pos.x;
    this.#spTime.value = 0;

    this.#hndTime = setInterval(this.#increaseTime, 1000);
  }

  //Lag en getter og en setter for mineCounter, bruke #spMines.value

  get mineCounter() {
    return this.#spMines.value;
  }

  set mineCounter(aValue) {
    this.#spMines.value = aValue;
  }
} //end class TScoreBoard
