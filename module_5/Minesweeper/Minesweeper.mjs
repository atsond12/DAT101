"use strict";
import lib2d from "../../common/libs/lib2d_v2.mjs";
import libSprite from "../../common/libs/libSprite_v2.mjs";
import { TGameBoard } from "./GameBoard.mjs";

//-----------------------------------------------------------------------------------------
//----------- variables and object --------------------------------------------------------
//-----------------------------------------------------------------------------------------
export const SpriteInfoList = {
  Board: {
    TopLeft: { x: 0, y: 0, width: 163, height: 133, count: 1 },
    TopMiddle: { x: 163, y: 0, width: 134, height: 133, count: 1 },
    TopRight: { x: 297, y: 0, width: 163, height: 133, count: 1 },
    LeftMiddle: { x: 0, y: 133, width: 21, height: 243, count: 1 },
    RightMiddle: { x: 439, y: 133, width: 21, height: 243, count: 1 },
    BottomLeft: { x: 0, y: 377, width: 21, height: 21, count: 1 },
    BottomMiddle: { x: 21, y: 377, width: 417, height: 21, count: 1 },
    BottomRight: { x: 439, y: 377, width: 21, height: 21, count: 1 },
  },
  ButtonTile: { x: 0, y: 482, width: 50, height: 50, count: 8 },
  ButtonSmiley: { x: 0, y: 532, width: 82, height: 82, count: 6 },
  Numbers: { x: 0, y: 398, width: 46, height: 84, count: 10 },
};

const Difficulty = {
  Level_1: { Tiles: { Row: 10, Col: 10 }, Mines: 3, caption: "Level 1" },
  Level_2: { Tiles: { Row: 15, Col: 15 }, Mines: 50, caption: "Level 2" },
  Level_3: { Tiles: { Row: 20, Col: 30 }, Mines: 5, caption: "Level 3" },
};


let gameLevel = Difficulty.Level_1;

const cvs = document.getElementById("cvs");
const spcvs = new libSprite.TSpriteCanvas(cvs);

const gameProps = {
  gameBoard: new TGameBoard(spcvs, SpriteInfoList.Board),
}
//-----------------------------------------------------------------------------------------
//----------- functions -------------------------------------------------------------------
//-----------------------------------------------------------------------------------------
function loadGame() {

  newGame();
  drawGame();
}

//-----------------------------------------------------------------------------------------
function newGame() {
  cvs.width = gameLevel.Tiles.Col * SpriteInfoList.ButtonTile.width + SpriteInfoList.Board.LeftMiddle.width + SpriteInfoList.Board.RightMiddle.width;
  cvs.height = gameLevel.Tiles.Row * SpriteInfoList.ButtonTile.height + SpriteInfoList.Board.TopMiddle.height + SpriteInfoList.Board.BottomMiddle.height;
}


function drawGame() {
  spcvs.clearCanvas();
  gameProps.gameBoard.draw();
  requestAnimationFrame(drawGame);
}

//-----------------------------------------------------------------------------------------
//----------- Events ----------------------------------------------------------------------
//-----------------------------------------------------------------------------------------


//-----------------------------------------------------------------------------------------
//----------- Main Program ----------------------------------------------------------------------
//-----------------------------------------------------------------------------------------

spcvs.loadSpriteSheet("./media/spriteSheet.png", loadGame);


