"use strict";
import lib2d from "../../common/libs/lib2d_v2.mjs";
import libSprite from "../../common/libs/libSprite_v2.mjs";
import { TGameBoard } from "./GameBoard.mjs";
import { TTile, forEachTile } from "./Tile.mjs";
import { TScoreBoard } from "./ScoreBoard.mjs";

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
const spcvs = new libSprite.TSpriteCanvas(cvs);

const selectDifficulty = document.getElementById("selectDifficulty");

export const gameProps = {
  gameBoard: null,
  tiles: [],
  ScoreBoard: null,
  openTiles: 0,
};
//-----------------------------------------------------------------------------------------
//----------- functions -------------------------------------------------------------------
//-----------------------------------------------------------------------------------------
function loadGame() {
  newGame();
  gameProps.ScoreBoard = new TScoreBoard(spcvs);
  drawGame();
}

//-----------------------------------------------------------------------------------------
export function newGame() {
  cvs.width = gameLevel.Tiles.Col * SpriteInfoList.ButtonTile.width + SpriteInfoList.Board.LeftMiddle.width + SpriteInfoList.Board.RightMiddle.width;
  cvs.height = gameLevel.Tiles.Row * SpriteInfoList.ButtonTile.height + SpriteInfoList.Board.TopMiddle.height + SpriteInfoList.Board.BottomMiddle.height;
  spcvs.updateBoundsRect();
  spcvs.clearButtons();
  gameProps.tiles = [];
  gameProps.gameBoard = new TGameBoard(spcvs, SpriteInfoList.Board, new lib2d.TPoint(0, 0));
  //Lag ny forekomst av TTile
  for (let row = 0; row < gameLevel.Tiles.Row; row++) {
    const rows = []; //Dette er kolonner i raden av "row"
    for (let col = 0; col < gameLevel.Tiles.Col; col++) {
      rows.push(new TTile(spcvs, SpriteInfoList.ButtonTile, row, col));
    }
    gameProps.tiles.push(rows);
  }
  //Lag alle minene i spillet basert på gameLevel.Mines
  let mineCounter = 1; //Indikerer hvor mange miner som er lagt ut
  do {
    const row = Math.floor(Math.random() * gameLevel.Tiles.Row);
    const col = Math.floor(Math.random() * gameLevel.Tiles.Col);
    const tile = gameProps.tiles[row][col];
    if (!tile.isMine) {
      tile.isMine = true;
      mineCounter++;
    }
  } while (mineCounter <= gameLevel.Mines);
  if (gameProps.ScoreBoard !== null) {
    gameProps.ScoreBoard.reset();
  }
}

function drawGame() {
  spcvs.clearCanvas();
  gameProps.gameBoard.draw();
  //Husk å tegne forekomsten av TTile
  forEachTile(drawTile);
  gameProps.ScoreBoard.draw();
  requestAnimationFrame(drawGame);
}

function drawTile(aTile) {
  aTile.draw();
}

export function setGameOver() {
  //Stoppe Tiden.
  //Åpne alle miner.
  gameProps.ScoreBoard.stopTime();
  forEachTile(openMines);
}

function openMines(aTile) {
  if (aTile.isMine) {
    aTile.reveal();
  }
  aTile.disable = true;
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

spcvs.loadSpriteSheet("./media/spriteSheet.png", loadGame);
selectDifficulty.addEventListener("change", selectDifficultyChange);
