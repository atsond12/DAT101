"use strict";
import lib2d from "../../common/libs/lib2d.mjs";
import libSprite from "../../common/libs/libSprite.mjs";

//--------------- Objects and Variables ----------------------------------//

// prettier-ignore
const SpriteInfoList = {
  buttonGreen: { x: 0, y: 0, width: 188, height: 72, count: 4 }
};


const cvs = document.getElementById("cvs");
const spcvs = new libSprite.TSpriteCanvas(cvs, 800, 600);

//--------------- Functions ----------------------------------------------//


function loadApp() {

  drawCanvas();
  setInterval(animateApp, 1);
}// end of loadApp

function drawCanvas() {
  spcvs.clearCanvas();
  requestAnimationFrame(drawCanvas);
}


function animateApp() {
}


//--------------- Event Handlers -----------------------------------------//


//--------------- Main Code ----------------------------------------------//

// Load the sprite sheet and start the app
spcvs.loadSpriteSheet("./Media/button_01.png", loadApp);
