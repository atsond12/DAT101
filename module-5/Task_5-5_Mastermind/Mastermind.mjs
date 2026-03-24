"use strict";

// --------------------------------------------------------------------------------------------------------------------
// 🧠 Mastermind Game - UiA Workshop Edition 🚀
// --------------------------------------------------------------------------------------------------------------------
// Welcome to the main module for our Mastermind game! 🎮
// Your mission: Build the game loop, state logic, and event handlers to make this classic puzzle come to life.
//
// 📜 The Rules:
// - The computer generates a secret code of 4 colors.
// - The player has 10 attempts to guess the exact colors and their correct positions.
// - Available choices: 8 different colors 🎨.
//
// 💡 The Feedback System:
// - Black Peg: Right color, RIGHT position! 🔥
// - White Peg: Right color, WRONG position! 🤔
//
// 🛠️ The Tech Stack:
// - Graphics: We are using a custom Sprite Engine (`libSprite`) to render a sprite sheet on a Canvas.
// - Drawing Order: Think in layers! What gets drawn first goes to the back (just like Photoshop).
// - Game States: You will need a simple state machine to track if the game is "playing", "won", or "lost".
//
// Let's write some clean JavaScript and figure out the architecture together. Good luck! 💻✨
// --------------------------------------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------------------------------------
// 📦 1. Imports
// --------------------------------------------------------------------------------------------------------------------
// We are bringing in the TSpriteCanvas from our custom libSprite engine.
// This is the powerhouse that handles all our drawing and event listening! 🚂

import { TSprite, TSpriteCanvas } from "libSprite";
import { TMenu } from "./menu.js";
import { TColorPicker } from "./colorPicker.js";
import { MastermindBoard } from "./MastermindBoard.mjs";
// --------------------------------------------------------------------------------------------------------------------
// 🗄️ 2. Variables, Constants, and Game Objects
// --------------------------------------------------------------------------------------------------------------------

// 'SpriteInfoList' is our treasure map! 🗺️
// It tells the engine exactly where to find each image on the big SpriteSheet.png file (x, y, width, height, and frames).
// prettier-ignore
export const SpriteInfoList = {
  Board:              { x: 640, y:   0, width: 441, height: 640, count: 1 },
  ButtonNewGame:      { x:   0, y:  45, width: 160, height:  45, count: 4 },
  ButtonCheckAnswer:  { x:   0, y:   0, width: 160, height:  45, count: 4 },
  ButtonCheat:        { x:   0, y: 139, width:  75, height:  49, count: 4 },
  PanelHideAnswer:    { x:   0, y:  90, width: 186, height:  49, count: 1 },
  ColorPicker:        { x:   0, y: 200, width:  34, height:  34, count: 8 },
  ColorHint:          { x:   0, y: 250, width:  19, height:  18, count: 3 },
};

// Grabbing the canvas from the HTML and passing it to our shiny sprite engine! ✨
const cvs = document.getElementById("cvs");
export const spcvs = new TSpriteCanvas(cvs);
export let menu = null;
export let colorPickers = [];
export let computerAnswers = [];

// --------------------------------------------------------------------------------------------------------------------
// ⚙️ 3. Game Functions
// --------------------------------------------------------------------------------------------------------------------

export function newGame() {
  // 🧹 Step 1: Clear the board! We need to purge all old sprites from the canvas.
  spcvs.removeAllGUISprites();

  // 🏗️ Step 2: Set up the new round!
  // TODO: Empty your tracking arrays (like player answers and color hints).
  // TODO: Generate a new secret code for the computer.
  // TODO: Create the draggable color picker pegs for the menu.
  menu = new TMenu();
  createColorPickers();
  createComputerAnswers();
}

function createComputerAnswers() {
  const colors = SpriteInfoList.ColorPicker.count;
  for (let i = 0; i < 4; i++) {
    const colorIndex = Math.floor(Math.random() * colors);
    const x = MastermindBoard.ComputerAnswer[i].x;
    const y = MastermindBoard.ComputerAnswer[i].y;
    const spColor = new TSprite(spcvs, SpriteInfoList.ColorPicker, x, y);
    spColor.index = colorIndex;
    computerAnswers.push(spColor);
  }
}

function createColorPickers() {
  const keys = Object.keys(MastermindBoard.ColorPicker);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const pos = MastermindBoard.ColorPicker[key];
    const newColorPicker = new TColorPicker(pos);
    newColorPicker.index = i;
    colorPickers.push(newColorPicker);
  }
}

function drawColorPickers() {
  for (let i = 0; i < colorPickers.length; i++) {
    const colorPicker = colorPickers[i];
    colorPicker.draw();
  }
}

function drawGame() {
  // 🧽 Wipe the canvas clean every single frame before drawing the new one.
  spcvs.clearCanvas();

  // 🎨 The Painter's Algorithm!
  // Draw your game objects here. Remember: the first thing you draw goes in the BACK.
  // The last thing you draw goes on TOP.
  // Example order: Background -> Computer's Answer -> Player's Pegs -> Menu GUI.

  // TODO: Loop through your arrays and call .draw() on your sprites!

  menu.drawBackground();
  drawComputerAnswers();
  menu.draw();
  drawColorPickers();
}

function drawComputerAnswers(){
  for(let i = 0; i < computerAnswers.length; i++){
    const spColor = computerAnswers[i];
    spColor.draw();
  }
}

// --------------------------------------------------------------------------------------------------------------------
// 🕹️ 4. Initialization & Main Code
// --------------------------------------------------------------------------------------------------------------------

// This runs ONCE when the browser finishes downloading the SpriteSheet.png.
// It sets up the canvas size, starts the first game, and tells the engine what function to use for drawing.
function loadGame() {
  //Set canvas with and height to match the sprite sheet
  cvs.width = SpriteInfoList.Board.width;
  cvs.height = SpriteInfoList.Board.height;
  spcvs.updateBoundsRect();
  newGame();
  spcvs.onDraw = drawGame;
}

// 🚀 Kickoff! Load the image and attach our screen resize listener.
spcvs.loadSpriteImage("./Media/SpriteSheet.png", loadGame);
window.addEventListener("resize", spcvs.updateBoundsRect.bind(spcvs));
