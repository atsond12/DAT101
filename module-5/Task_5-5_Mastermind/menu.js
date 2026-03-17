"use strict";
import { spcvs, SpriteInfoList } from "./Mastermind.mjs";
import { MastermindBoard } from "./MastermindBoard.mjs";
import { TSprite, TSpriteButtonHaptic } from "libSprite";
/*
1. Importer MastermindBard
2. Lag en klasse TMenu
3. Lag bakgrunnen.
4. Lag alle meny elementene
5. Lag to tegne funksjoner: draw, drawBackground
*/ 
export class TMenu{
  #background;
  #newGame;

  constructor(){
    this.#background = new TSprite(spcvs, SpriteInfoList.Board, 0, 0);
    let x = MastermindBoard.ButtonNewGame.x;
    let y = MastermindBoard.ButtonNewGame.y;
    this.#newGame = new TSpriteButtonHaptic(spcvs, SpriteInfoList.ButtonNewGame, x, y);
  }

  drawBackground(){
    this.#background.draw();
  }

  draw(){
    this.#newGame.draw();
  }

}// End of TMenu

