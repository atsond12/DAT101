"use strict";
// Import necessary modules
import { TSpriteCanvas } from "libSprite";
import { TBackground } from "./background.js";
import { THero } from "./hero.js";
import { TObstacle } from "./obstacle.js";
import { TBait } from "./bait.js";
import { TMenu } from "./menu.js";

//--------------- Objects and Variables ----------------------------------//
const chkMuteSound = document.getElementById("chkMuteSound");
const rbDayNight = document.getElementsByName("rbDayNight");
const cvs = document.getElementById("cvs");
const spcvs = new TSpriteCanvas(cvs);

// prettier-ignore
const SpriteInfoList = {
  hero1:        { x: 0   , y: 545 , width: 34   , height: 24  , count: 4  },
  hero2:        { x: 0   , y: 569 , width: 34   , height: 24  , count: 4  },
  hero3:        { x: 0   , y: 593 , width: 34   , height: 24  , count: 4  },
  obstacle:     { x: 0   , y: 0   , width: 52   , height: 320 , count: 4  },
  background:   { x: 246 , y: 0   , width: 576  , height: 512 , count: 2  },
  flappyBird:   { x: 0   , y: 330 , width: 178  , height: 50  , count: 1  },
  ground:       { x: 246 , y: 512 , width: 1152 , height: 114 , count: 1  },
  numberSmall:  { x: 681 , y: 635 , width: 14   , height: 20  , count: 10 },
  numberBig:    { x: 422 , y: 635 , width: 24   , height: 36  , count: 10 },
  buttonPlay:   { x: 1183, y: 635 , width: 104  , height: 58  , count: 1  },
  gameOver:     { x: 0   , y: 384 , width: 226  , height: 114 , count: 1  },
  infoText:     { x: 0   , y: 630 , width: 200  , height: 55  , count: 2  },
  food:         { x: 0   , y: 696 , width: 70   , height: 65  , count: 34 },
  medal:        { x: 985 , y: 635 , width: 44   , height: 44  , count: 4  },
};

export const EGameStatus = { idle: 0, countDown: 1, gaming: 2, heroIsDead: 3, gameOver: 4, state: 0 };
const background = new TBackground(spcvs, SpriteInfoList);
export const hero = new THero(spcvs, SpriteInfoList.hero1);
const obstacles = [];
const baits = [];
const menu = new TMenu(spcvs, SpriteInfoList);

//--------------- Functions ----------------------------------------------//
export function startGame() {
  EGameStatus.state = EGameStatus.gaming;
  setTimeout(spawnObstacle, 1000);
  setTimeout(spawnBait, 1000);
}

function spawnBait() {
  if (EGameStatus.state === EGameStatus.gaming) {
    const bait = new TBait(spcvs, SpriteInfoList.food);
    baits.push(bait);
    const nextTime = Math.ceil(Math.random() * 3) + 1;
    setTimeout(spawnBait, nextTime * 1000);
  }
}

function spawnObstacle() {
  if (EGameStatus.state === EGameStatus.gaming) {
    const obstacle = new TObstacle(spcvs, SpriteInfoList.obstacle);
    obstacles.push(obstacle);
    const nextTime = Math.ceil(Math.random() * 3) + 1;
    setTimeout(spawnObstacle, nextTime * 1000);
  }
}

function animateGame() {
  hero.animate();
  let eaten = -1;
  for (let i = 0; i < baits.length; i++) {
    const bait = baits[i];
    bait.animate();
    if (bait.distanceTo(hero.center) < 20) {
      eaten = i;
    }
  }
  if (eaten >= 0) {
    console.log("Eaten!");
    baits.splice(eaten, 1);
  }

  if (EGameStatus.state === EGameStatus.gaming) {
    background.animate();
    let deleteObstacle = false;
    for (let i = 0; i < obstacles.length; i++) {
      const obstacle = obstacles[i];
      obstacle.animate();
      if (obstacle.x < -50) {
        deleteObstacle = true;
      }
    }
    if (deleteObstacle) {
      obstacles.splice(0, 1);
    }
  }
}

function drawGame() {
  background.drawBackground();
  for (let i = 0; i < baits.length; i++) {
    const bait = baits[i];
    bait.draw();
  }

  for (let i = 0; i < obstacles.length; i++) {
    const obstacle = obstacles[i];
    obstacle.draw();
  }
  hero.draw();
  background.drawGround();
  menu.draw();
}

function loadGame() {
  console.log("Game Loaded");
  // Set canvas size to background size
  cvs.width = SpriteInfoList.background.width;
  cvs.height = SpriteInfoList.background.height;

  // Overload the spcvs draw function here!
  spcvs.onDraw = drawGame;

  //Start animate engine
  setInterval(animateGame, 10);
} // end of loadGame

function onKeyDown(aEvent) {
  switch (aEvent.code) {
    case "Space":
      console.log("Space key pressed, flap the hero!");
      if (EGameStatus.state !== EGameStatus.heroIsDead) {
        hero.flap();
      }
      break;
  }
} // end of onKeyDown

function setSoundOnOff() {
  // Mute or unmute the game sound based on checkbox
} // end of setSoundOnOff

function setDayNight(aEvent) {
  // Set day or night mode based on radio buttons
  // Day mode is when value is 1, night mode is 0, you can use this as a boolean, 1=true, 0=false
  // e.g., isDayMode = (aEvent.target.value == 1);
  console.log(`Day/Night mode changed: ${aEvent.target.value}`);
} // end of setDayNight

//--------------- Main Code ----------------------------------------------//
chkMuteSound.addEventListener("change", setSoundOnOff);
rbDayNight[0].addEventListener("change", setDayNight);
rbDayNight[1].addEventListener("change", setDayNight);

// Load the sprite sheet
spcvs.loadSpriteImage("./Media/FlappyBirdSprites.png", loadGame);
document.addEventListener("keydown", onKeyDown);
