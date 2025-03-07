"use strict";
import libSprite from "../../common/libs/libSprite_v2.mjs";
import lib2D from "../../common/libs/lib2d_v2.mjs";
import{ GameProps, SpriteInfoList } from "./Mastermind.mjs";
import MastermindBoard from "./MastermindBoard.mjs";

//Lag en meny klasse "TMenu", ingen arv, skal ha tre knapper og en sprite
export class TMenu {
  #buttonNewGame;
  #buttonCheckAnswer;
  #buttonHint;
  #panelHint;
  #colorHints;
  #spcvs;
  constructor(aSpriteCanvas){
    this.#spcvs = aSpriteCanvas;
    this.#buttonNewGame = 
    new libSprite.TSpriteButton(
      aSpriteCanvas,
      SpriteInfoList.ButtonNewGame,
      MastermindBoard.ButtonNewGame);

    this.#buttonCheckAnswer = 
    new libSprite.TSpriteButton(
      aSpriteCanvas,
      SpriteInfoList.ButtonCheckAnswer,
      MastermindBoard.ButtonCheckAnswer);

    this.#buttonHint = 
    new libSprite.TSpriteButton(
      aSpriteCanvas,
      SpriteInfoList.ButtonCheat,
      MastermindBoard.ButtonCheat);

    this.#panelHint = 
      new libSprite.TSprite(
        aSpriteCanvas,
        SpriteInfoList.PanelHideAnswer,
        MastermindBoard.PanelHideAnswer);   
        
    this.#buttonHint.onClick = this.onHintClick;
    this.#buttonCheckAnswer.onClick = this.onCheckAnswerClick;
    this.#colorHints = [];
  }//End of constructor

  draw(){
    this.#buttonNewGame.draw();
    this.#buttonCheckAnswer.draw();
    this.#buttonHint.draw();
    this.#panelHint.draw();
    for(let i = 0; i < this.#colorHints.length; i++){
      const colorHint = this.#colorHints[i];
      colorHint.draw();
    }
  }

  onHintClick = () =>{
    this.#panelHint.visible = !this.#panelHint.visible;
  }

  onCheckAnswerClick = () =>{
    //Denne sjekker om vi har valgt rett farge
    const answerObject = { color : 0, pos: -1};
    //Lage liste over computerens svar
    const computerAnswerList = [];
    for(let i = 0 ; i < 4; i++){
      const obj = Object.create(answerObject);
      const computerAnswer = GameProps.computerAnswers[i];
      obj.color = computerAnswer.index;
      obj.pos = i;
      computerAnswerList.push(obj);
    }
    //Lage liste over spillerens svar
    const playerAnswerList = [];
    for(let i = 0; i < 4; i++){
      const obj = Object.create(answerObject);
      const playerAnswer = GameProps.playerAnswers[i];
      obj.color = playerAnswer.index;
      obj.pos = i;
      playerAnswerList.push(obj);
    }

    console.log("Computer answer", computerAnswerList);
    console.log("Player answer", playerAnswerList);
    //Sjekke om vi har valgt riktig farge på riktig plass
    let answerColorHintIndex = 0;
    for(let i = 0; i < 4; i++){
      const computerAnswer = computerAnswerList[i];
      const playerAnswer = playerAnswerList[i];
      if(computerAnswer.color === playerAnswer.color){
        console.log("Riktig farge på riktig plass");
        console.log("Indeks", i);
        const pos = GameProps.answerHintRow[answerColorHintIndex++];
        // answerColorHintIndex += 1;
        // answerColorHintIndex = answerColorHintIndex + 1;
        // answerColorHintIndex++;
        const colorHintSPI = SpriteInfoList.ColorHint;
        const colorHint = new libSprite.TSprite(this.#spcvs, colorHintSPI, pos);
        colorHint.index = 1;
        this.#colorHints.push(colorHint);
        
      }
    }
  }
}
