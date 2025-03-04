"use strict";
import libSprite from "../../common/libs/libSprite_v2.mjs";
import lib2D from "../../common/libs/lib2d_v2.mjs";
import{ SpriteInfoList } from "./Mastermind.mjs";
import MastermindBoard from "./MastermindBoard.mjs";

//Lag en meny klasse "TMenu", ingen arv, skal ha tre knapper og en sprite
export class TMenu {
  #buttonNewGame;
  #buttonCheckAnswer;
  #buttonHint;
  #panelHint;
  constructor(aSpriteCanvas){
    this.#buttonNewGame = 
    new libSprite.TSpriteButton(
      aSpriteCanvas,
      SpriteInfoList.ButtonNewGame,
      MastermindBoard.ButtonNewGame);
  }

  draw(){
    this.#buttonNewGame.draw();
  }
}
