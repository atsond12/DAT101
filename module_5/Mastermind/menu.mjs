"use strict";
import libSprite from "../../common/libs/libSprite_v2.mjs";
import lib2D from "../../common/libs/lib2d_v2.mjs";
import{ GameProps, SpriteInfoList, moveRoundIndicator, newGame} from "./Mastermind.mjs";
import MastermindBoard from "./MastermindBoard.mjs";

//Lag en meny klasse "TMenu", ingen arv, skal ha tre knapper og en sprite
export class TMenu {
  #buttonNewGame;
  #buttonCheckAnswer;
  #buttonCheat;
  #panelCheat;
  #colorHints;
  #spcvs;
  #roundNumber;
  constructor(aSpriteCanvas){
    this.#spcvs = aSpriteCanvas;
    this.#roundNumber = 1;
    this.#buttonNewGame = 
    new libSprite.TSpriteButtonHaptic(
      aSpriteCanvas,
      SpriteInfoList.ButtonNewGame,
      MastermindBoard.ButtonNewGame);
    

    this.#buttonCheckAnswer = 
    new libSprite.TSpriteButtonHaptic(
      aSpriteCanvas,
      SpriteInfoList.ButtonCheckAnswer,
      MastermindBoard.ButtonCheckAnswer);
    
    this.#buttonCheat = 
    new libSprite.TSpriteButtonHaptic(
      aSpriteCanvas,
      SpriteInfoList.ButtonCheat,
      MastermindBoard.ButtonCheat);

    this.#panelCheat = 
      new libSprite.TSprite(
        aSpriteCanvas,
        SpriteInfoList.PanelHideAnswer,
        MastermindBoard.PanelHideAnswer);   
        
    this.#buttonCheat.onClick = this.onButtonCheatClick;
    this.#buttonCheckAnswer.onClick = this.onCheckAnswerClick;
    this.#buttonNewGame.onClick = this.onButtonNewGameClick;
    this.#colorHints = [];
  }//End of constructor

  draw(){
    this.#buttonNewGame.draw();
    this.#buttonCheckAnswer.draw();
    this.#buttonCheat.draw();
    this.#panelCheat.draw();
    for(let i = 0; i < this.#colorHints.length; i++){
      const colorHint = this.#colorHints[i];
      colorHint.draw();
    }
  }

  onButtonCheatClick = () =>{
    this.#panelCheat.visible = !this.#panelCheat.visible;
  }

  onCheckAnswerClick = () =>{
    //Denne sjekker om vi har valgt rett farge
    const answerObject = { color : 0, pos: -1, checkThis: true};
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
      // kontrollere at brukeren har valgt 4 farger
      if(GameProps.playerAnswers[i] === null){
        return; // Avslutt funksjonen, brukeren mangler farger
      }
      const obj = Object.create(answerObject);
      const playerAnswer = GameProps.playerAnswers[i];
      obj.color = playerAnswer.index;
      obj.pos = i;
      playerAnswerList.push(obj);
    }

    //Sjekke om vi har valgt riktig farge på riktig plass
    let answerColorHintIndex = 0;
    let numberOfCorrectColors = 0;
    for(let i = 0; i < 4; i++){
      const computerAnswer = computerAnswerList[i];
      const playerAnswer = playerAnswerList[i];
      if(computerAnswer.color === playerAnswer.color){
        console.log(`Riktig farge på plass ${i + 1}`);
        answerColorHintIndex = this.#createColorHint(answerColorHintIndex, 1);
        //Vi må ikke sjekke disse to fargene igjen
        computerAnswer.checkThis = playerAnswer.checkThis = false;
        //Er alle fargene riktig så er spillet over, og vi må vise fargene fra computeren.
        //Hint: vi må bruke en variabel som forteller om alle farger er riktig
        numberOfCorrectColors++;
      }
    }
    if(numberOfCorrectColors === 4){
      console.log("Gratulerer, du har vunnet!");
      this.#panelCheat.visible = false;
      return; //Trenger ikke å sjekke resten av fargene
    }
    //Sjekke om vi har valgt riktig farge på feil plass.
    // ytre for løkke sjekker spillerens svar
    for(let i = 0; i < 4; i++){
      const playerAnswer = playerAnswerList[i];
      // Hvis denne fargen skal sjekkes, sjekk mot alle computerens svar
      if(playerAnswer.checkThis){
        for(let j = 0; j < 4; j++){
          const computerAnswer = computerAnswerList[j];
          // Test om denne fargen skal sjekkes og at den ikke er på samme plass
          if(computerAnswer.checkThis && (playerAnswer.pos !== computerAnswer.pos)){
            if(playerAnswer.color === computerAnswer.color){
              console.log(`Rett farge på feil plass - ${playerAnswer.pos + 1} , ${computerAnswer.pos + 1}`);
              answerColorHintIndex = this.#createColorHint(answerColorHintIndex, 0);
              // Vi må ikke sjekke disse to fargene igjen
              computerAnswer.checkThis = playerAnswer.checkThis = false;
            }
          }

        }
      } 
    }
    // Gå videre til neste runde
    this.#setNextRound();
  } // End of onCheckAnswerClick

  onButtonNewGameClick = () =>{
    this.#roundNumber = 1;
    this.#colorHints = [];
    newGame();
  }

  //Privat metode, den bruker interne variabler og kan ikke påberopes utenfra
  #createColorHint(posIndex, colorIndex){
    const pos = GameProps.answerHintRow[posIndex++];
    const colorHintSPI = SpriteInfoList.ColorHint;
    const colorHint = new libSprite.TSprite(this.#spcvs, colorHintSPI, pos);
    colorHint.index = colorIndex;
    this.#colorHints.push(colorHint);
    return posIndex; // Vi må returnere den nye indeksen til posisjonen
  } // End of #createColorHint

  // Lag en metode #setNextRound som setter opp neste runde
  #setNextRound(){
    this.#roundNumber++;
    if(this.#roundNumber > 10){
      console.log("Du har tapt, prøv igjen!");
      this.#panelCheat.visible = false;
      return;
    }
    const rowText = `Row${this.#roundNumber}`;
    GameProps.snapTo.positions = MastermindBoard.ColorAnswer[rowText];
    GameProps.answerHintRow = MastermindBoard.AnswerHint[rowText];
    moveRoundIndicator();
    for(let i = 0; i < 4; i++){
      GameProps.playerAnswers[i].disable = true;
      GameProps.playerAnswers[i] = null;
    }
  }

} // End of class TMenu
