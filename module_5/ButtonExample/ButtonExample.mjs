"use strict";
import lib2d from "../../common/libs/lib2d_v2.mjs";
import libSprite from "../../common/libs/libSprite_v2.mjs";

//--------------- Objects and Variables ----------------------------------//

// prettier-ignore
const SpriteInfoList = {
  buttonGreen: { x: 0, y: 0, width: 188, height: 72, count: 4 }
};

const cvs = document.getElementById("cvs");
const spcvs = new libSprite.TSpriteCanvas(cvs, 800, 600);

const pos = new lib2d.TPosition(0, 100);
const button1 = new libSprite.TSprite(spcvs, SpriteInfoList.buttonGreen, pos);
pos.x = 250;
const button2 = new libSprite.TSprite(spcvs, SpriteInfoList.buttonGreen, pos);

console.log(button1.boundingBox.center);

//--------------- Functions ----------------------------------------------//

function loadApp() {
  drawCanvas();
  setInterval(animateApp, 1);
} // end of loadApp

function drawCanvas() {
  spcvs.clearCanvas();
  button1.draw();
  button2.draw();
  requestAnimationFrame(drawCanvas);
}

let speed = 0.7;

function animateApp() {
  button1.x += speed;
  if(button1.right > cvs.width || button1.left < 0){
    speed *= -1;
  }
  
  if(button1.hasCollided(button2)){
    console.log("Collision detected");
  }
}

//--------------- Event Handlers -----------------------------------------//

//--------------- Main Code ----------------------------------------------//

// Load the sprite sheet and start the app
spcvs.loadSpriteSheet("./Media/button_01.png", loadApp);
