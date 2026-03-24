"use strict";
import { newGame, spcvs, SpriteInfoList } from "./Mastermind.mjs";
import { MastermindBoard } from "./MastermindBoard.mjs";
import { TSprite, TSpriteButtonHaptic } from "libSprite";
import { checkAnswer } from "./checkAnswer.js";

let hintRow = MastermindBoard.AnswerHint.Row1;

export class TMenu {
  #background;
  #newGame;
  #checkAnswer;
  #cheat;
  #hideAnswer;
  #hints;

  constructor() {
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
    this.#hints = [];
  }

  #checkAnswerOnClick() {
    checkAnswer();
  }

  #newGameOnClick() {
    newGame();
  }

  #cheatOnClick() {
    this.#hideAnswer.hidden = !this.#hideAnswer.hidden;
  }

  drawBackground() {
    this.#background.draw();
  }

  draw() {
    this.#newGame.draw();
    this.#checkAnswer.draw();
    this.#cheat.draw();
    this.#hideAnswer.draw();
    for (let i = 0; i < this.#hints.length; i++) {
      const hintPeg = this.#hints[i];
      hintPeg.draw();
    }
  }

  SetCheckAnswerDisabled(aDisabled) {
    this.#checkAnswer.disabled = aDisabled;
  }

  createHints(aCorrectCount, aWrongCount) {
    // Create a black hint peg
    // Push this to hints.
    let hintIndex = 0;
    for (let i = 0; i < aCorrectCount; i++) {
      const pos = hintRow[i];
      const blackPeg = new TSprite(spcvs, SpriteInfoList.ColorHint, pos.x, pos.y);
      blackPeg.index = 1;
      this.#hints.push(blackPeg);
      hintIndex++;
    }
    for (let i = 0; i < aWrongCount; i++) {
      const pos = hintRow[hintIndex];
      const whitePeg = new TSprite(spcvs, SpriteInfoList.ColorHint, pos.x, pos.y);
      whitePeg.index = 0;
      this.#hints.push(whitePeg);
      hintIndex++;
    }
  }
} // End of TMenu
