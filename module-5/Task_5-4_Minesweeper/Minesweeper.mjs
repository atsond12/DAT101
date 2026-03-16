"use strict";
import { TPoint } from "lib2d";
import { TSpriteCanvas } from "libSprite";
import { TGameBoard } from "./GameBoard.mjs";
import { createTiles, drawTiles, createMines} from "./tile.js";
import { TGameInfo } from "./gameInfo.js";

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
  Level_1: { Tiles: { Row: 10, Col: 10 }, Mines: 5, caption: "Level 1" },
  Level_2: { Tiles: { Row: 15, Col: 15 }, Mines: 20, caption: "Level 2" },
  Level_3: { Tiles: { Row: 20, Col: 30 }, Mines: 99, caption: "Level 3" },
};

export let gameLevel = Difficulty.Level_1;
const cvs = document.getElementById("cvs");
const spcvs = new TSpriteCanvas(cvs);
const selectDifficulty = document.getElementById("selectDifficulty");
let gameBoard = null;
export let gameInfo = null;

//-----------------------------------------------------------------------------------------
//----------- functions -------------------------------------------------------------------
//-----------------------------------------------------------------------------------------
function loadGame() {
  newGame();
  spcvs.onDraw = drawGame;
}

//-----------------------------------------------------------------------------------------
export function newGame() {
  cvs.width = gameLevel.Tiles.Col * SpriteInfoList.ButtonTile.width + SpriteInfoList.Board.LeftMiddle.width + SpriteInfoList.Board.RightMiddle.width;
  cvs.height = gameLevel.Tiles.Row * SpriteInfoList.ButtonTile.height + SpriteInfoList.Board.TopMiddle.height + SpriteInfoList.Board.BottomMiddle.height;
  spcvs.updateBoundsRect();
  spcvs.removeAllGUISprites();
  gameBoard = new TGameBoard(spcvs, SpriteInfoList.Board, new TPoint(0, 0));
  createTiles(spcvs, SpriteInfoList.ButtonTile);
  createMines();
  gameInfo = new TGameInfo(spcvs, SpriteInfoList);
}

function drawGame() {
  spcvs.clearCanvas();
  gameBoard.draw();
  drawTiles();
  gameInfo.draw();
}

//-----------------------------------------------------------------------------------------
//----------- Events ----------------------------------------------------------------------
//-----------------------------------------------------------------------------------------

function selectDifficultyChange(e) {
  switch (e.target.value) {
    case "Level_1":
      gameLevel = Difficulty.Level_1;
      break;
    case "Level_2":
      gameLevel = Difficulty.Level_2;
      break;
    case "Level_3":
      gameLevel = Difficulty.Level_3;
      break;
  }
  newGame();
}

//-----------------------------------------------------------------------------------------
//----------- Main Program ----------------------------------------------------------------------
//-----------------------------------------------------------------------------------------

spcvs.loadSpriteImage("./media/spriteSheet.png", loadGame);
//spcvs.showFramerate = true;
selectDifficulty.addEventListener("change", selectDifficultyChange);
