"use strict";
import { newGame, spcvs, SpriteInfoList } from "./Mastermind.mjs";
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
  #checkAnswer;
  #cheat;
  #hideAnswer;

  constructor(){
    this.#background = new TSprite(spcvs, SpriteInfoList.Board, 0, 0);
    let x = MastermindBoard.ButtonNewGame.x;
    let y = MastermindBoard.ButtonNewGame.y;
    this.#newGame = new TSpriteButtonHaptic(spcvs, SpriteInfoList.ButtonNewGame, x, y);
    x = MastermindBoard.ButtonCheckAnswer.x;
    y = MastermindBoard.ButtonCheckAnswer.y;
    this.#checkAnswer = new TSpriteButtonHaptic(spcvs, SpriteInfoList.ButtonCheckAnswer, x, y);
    x = MastermindBoard.ButtonCheat.x;
    y = MastermindBoard.ButtonCheat.y;
    this.#cheat = new TSpriteButtonHaptic(spcvs, SpriteInfoList.ButtonCheat, x, y);
    x = MastermindBoard.PanelHideAnswer.x;
    y = MastermindBoard.PanelHideAnswer.y;
    this.#hideAnswer = new TSprite(spcvs, SpriteInfoList.PanelHideAnswer, x, y);

    this.#checkAnswer.disabled = true;
    this.#cheat.onClick = this.#cheatOnClick.bind(this);
    this.#newGame.onClick = this.#newGameOnClick.bind(this);
    this.#checkAnswer.onClick = this.#checkAnswerOnClick.bind(this);
  }

  #checkAnswerOnClick(){
    // TODO: Check player answer!
  }

  #newGameOnClick(){
    newGame();
  }

  #cheatOnClick(){
    this.#hideAnswer.hidden = !this.#hideAnswer.hidden;
  }

  drawBackground(){
    this.#background.draw();
  }

  draw(){
    this.#newGame.draw();
    this.#checkAnswer.draw();
    this.#cheat.draw();
    this.#hideAnswer.draw();
  }

  SetCheckAnswerDisabled(aDisabled){
    this.#checkAnswer.disabled = aDisabled;
  }

}// End of TMenu

