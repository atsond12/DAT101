"use strict";

//--------------------------------------------------------------------------------------------------------------------
//------ Imports
//--------------------------------------------------------------------------------------------------------------------
import lib2D from "../../common/libs/lib2d_v2.mjs";
import libSprite from "../../common/libs/libSprite_v2.mjs";
import { TColorPicker } from "./ColorPicker.mjs";
import MastermindBoard from "./MastermindBoard.mjs";
import { TMenu } from "./menu.mjs";


//--------------------------------------------------------------------------------------------------------------------
//------ Variables, Constants and Objects
//--------------------------------------------------------------------------------------------------------------------

// prettier-ignore
export const SpriteInfoList = {
  Board:              { x: 320, y:   0, width: 441, height: 640, count: 1 },
  ButtonNewGame:      { x:   0, y:  45, width: 160, height:  45, count: 2 },
  ButtonCheckAnswer:  { x:   0, y:   0, width: 160, height:  45, count: 2 },
  ButtonCheat:        { x:   0, y: 139, width:  75, height:  49, count: 2 },
  PanelHideAnswer:    { x:   0, y:  90, width: 186, height:  49, count: 1 },
  ColorPicker:        { x:   0, y: 200, width:  34, height:  34, count: 8 },
  ColorHint:          { x:   0, y: 250, width:  19, height:  18, count: 3 },
};

const cvs = document.getElementById("cvs");
const spcvs = new libSprite.TSpriteCanvas(cvs);

//Add all you game objects here
export const GameProps = {
  board: null,
  colorPickers:[],
  snapTo:{
    positions: MastermindBoard.ColorAnswer.Row10,
    distance: 20
  },
  computerAnswers: [],
  roundIndicator: null,
  menu: null
}


//--------------------------------------------------------------------------------------------------------------------
//------ Functions
//--------------------------------------------------------------------------------------------------------------------

function newGame() {
  generateComputerAnswer();
}

function drawGame(){
  spcvs.clearCanvas();
  //Draw all game objects here, remember to think about the draw order (layers in PhotoShop for example!)
  GameProps.board.draw();
  for(let i = 0; i < GameProps.colorPickers.length; i++){
    const colorPicker = GameProps.colorPickers[i];
    colorPicker.draw();
  }

  for(let i = 0; i < GameProps.computerAnswers.length; i++){
    const computerAnswer = GameProps.computerAnswers[i];
    computerAnswer.draw();
  }
  
  GameProps.roundIndicator.draw();

  GameProps.menu.draw();

  requestAnimationFrame(drawGame);
}

function generateComputerAnswer(){
  //Først må vi genere 4 tilfeldige farger
  //Deretter må vi plassere disse fargene i computerAnswers
  //Vi må bruke libSprite.TSprite for å lage en sprite for hver farge
  for(let i = 0; i < 4 ; i++){
    const colorIndex = Math.floor(Math.random() * SpriteInfoList.ColorPicker.count);
    const pos = MastermindBoard.ComputerAnswer[i];
    const sprite = new libSprite.TSprite(spcvs, SpriteInfoList.ColorPicker,pos);
    sprite.index = colorIndex;
    GameProps.computerAnswers.push(sprite);
  }

}

function moveRoundIndicator(){
  const pos = GameProps.snapTo.positions[0];
  GameProps.roundIndicator.x = pos.x - 84;
  GameProps.roundIndicator.y = pos.y + 7;
}

//--------------------------------------------------------------------------------------------------------------------
//------ Event Handlers
//--------------------------------------------------------------------------------------------------------------------

//loadGame runs once when the sprite sheet is loaded
function loadGame() {
  //Set canvas with and height to match the sprite sheet
  cvs.width = SpriteInfoList.Board.width;
  cvs.height = SpriteInfoList.Board.height;
  spcvs.updateBoundsRect();
  let pos = new lib2D.TPoint(0, 0);
  GameProps.board = new libSprite.TSprite(spcvs, SpriteInfoList.Board, pos);
 
  const ColorKeys = Object.keys(MastermindBoard.ColorPicker);
  console.log(ColorKeys);
  for(let i = 0; i < ColorKeys.length; i++){
    const colorName = ColorKeys[i]; //Color name
    const colorPicker = new TColorPicker(spcvs, SpriteInfoList.ColorPicker, colorName, i);
    GameProps.colorPickers.push(colorPicker);
  }

  pos = GameProps.snapTo.positions[0];
  GameProps.roundIndicator = new libSprite.TSprite(spcvs, SpriteInfoList.ColorHint, pos);
  GameProps.roundIndicator.index = 2;
  moveRoundIndicator();

  GameProps.menu = new TMenu(spcvs);

  newGame();
  requestAnimationFrame(drawGame); // Start the animation loop
}


//--------------------------------------------------------------------------------------------------------------------
//------ Main Code
//--------------------------------------------------------------------------------------------------------------------


spcvs.loadSpriteSheet("./Media/SpriteSheet.png", loadGame);
window.addEventListener("resize", spcvs.updateBoundsRect.bind(spcvs));