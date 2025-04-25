"use strict";

//--------------------------------------------------------------------------------------------------------------------
//------ Imports
//--------------------------------------------------------------------------------------------------------------------
import lib2D from "../../common/libs/lib2d_v2.mjs";
import libSprite from "../../common/libs/libSprite_v2.mjs";
import { THero } from "./hero.mjs";
import { TBall } from "./ball.mjs";
import { TBrick } from "./brick.mjs";

//--------------------------------------------------------------------------------------------------------------------
//------ Variables, Constants and Objects
//--------------------------------------------------------------------------------------------------------------------

// prettier-ignore
export const SpriteInfoList = {
  Background:         { x: 1392, y:    0, width: 1187, height: 771, count:  1 },
  BrickPurple:        { x:    0, y:  717, width:  140, height:  41, count:  3 },
  BrickRed:           { x:    0, y:  778, width:  140, height:  41, count:  3 },
  BrickYellow:        { x:    0, y:  843, width:  140, height:  41, count:  3 },
  BrickBlue:          { x:    0, y:  906, width:  140, height:  41, count:  3 },
  Buttons:            { x:    0, y:  146, width:   55, height:  55, count:  4 },
  StartBtn:           { x:    0, y:   76, width:  186, height:  56, count:  5 },
  PaddleSmall:        { x:    0, y:  285, width:  158, height:  17, count:  1 },
  PaddleLarge:        { x:  159, y:  285, width:  226, height:  17, count:  1 },
  Ball:               { x:   79, y:  220, width:   30, height:  30, count:  1 },
  NumberSmall:        { x:    0, y: 1329, width:   23, height:  29, count: 10 },
  NumberLarge:        { x:    0, y: 1373, width:   50, height:  60, count: 10 },
  Menu:               { x: 1572, y:  780, width:  830, height: 671, count:  1 },
  NoOfCrushedBricks:  { x:    0, y:  217, width:   35, height:  34, count:  1 },
  
};

const cvs = document.getElementById("cvs");
const spcvs = new libSprite.TSpriteCanvas(cvs);
let hndUpdateGame = null;

export const GameProps = {
  bounds : new lib2D.TRectangle({x: 26, y: 110}, SpriteInfoList.Background.width - 52, SpriteInfoList.Background.height - 195),
  background: new libSprite.TSprite(spcvs, SpriteInfoList.Background),
  hero: null,
  ball: null,
  bricks: [],
}
  

//--------------------------------------------------------------------------------------------------------------------
//------ Functions
//--------------------------------------------------------------------------------------------------------------------

function newGame() {
  // Create dynamic game properties here:
  
  GameProps.hero = new THero(spcvs);
  GameProps.ball = new TBall(spcvs);
  createBricks();
  if(hndUpdateGame !== null) {
    clearInterval(hndUpdateGame);
  }
  hndUpdateGame = setInterval(updateGame, 1);
}

function drawBounds() {
  const ctx = spcvs.context; 
  const oldStrokeStyle = ctx.strokeStyle;
  const oldLineWidth = ctx.lineWidth;
  ctx.strokeStyle = "red";
  ctx.lineWidth = 4;
  ctx.strokeRect(GameProps.bounds.x, GameProps.bounds.y, GameProps.bounds.width, GameProps.bounds.height);
  ctx.strokeStyle = oldStrokeStyle;
  ctx.lineWidth = oldLineWidth;
}

function drawGame() {
  spcvs.clearCanvas();
  GameProps.background.draw(0, 0);
  drawBounds();
  GameProps.hero.draw();
  drawBricks();
  GameProps.ball.draw();
  requestAnimationFrame(drawGame);
}

function updateGame() {
  // Update game properties here:
  GameProps.ball.update();
}

function createBricks() {
  for( let i = 0; i < 28; i++) {// Lager en mursten for å teste først
    const brick = new TBrick(spcvs, i);
    GameProps.bricks.push(brick);
  }
}

function drawBricks() {
  for( let i = 0; i < GameProps.bricks.length; i++){
    const brick = GameProps.bricks[i];
    brick.draw();
  }
}

//--------------------------------------------------------------------------------------------------------------------
//------ Event Handlers
//--------------------------------------------------------------------------------------------------------------------

//loadGame runs once when the sprite sheet is loaded
function loadGame() {
  //Set canvas with and height to match the sprite sheet
  cvs.width = SpriteInfoList.Background.width;
  cvs.height = SpriteInfoList.Background.height;
  spcvs.updateBoundsRect(); // The size of the canvas has changed, update the bounds rect.

  newGame();
  requestAnimationFrame(drawGame); // Start the animation loop
}

function windowResize() {
  spcvs.updateBoundsRect();
}

//--------------------------------------------------------------------------------------------------------------------
//------ Main Code
//--------------------------------------------------------------------------------------------------------------------

window.addEventListener("resize", windowResize);
spcvs.loadSpriteSheet("./Media/spriteSheet.png", loadGame);
