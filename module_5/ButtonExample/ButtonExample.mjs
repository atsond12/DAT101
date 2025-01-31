"use strict";
import lib2d from "../../common/libs/lib2d_v2.mjs";
import libSprite from "../../common/libs/libSprite_v2.mjs";

//--------------- Classes ------------------------------------------------//


//--------------- Objects and Variables ----------------------------------//

// prettier-ignore
const SpriteInfoList = {
  buttonGreen: { x: 0, y: 0, width: 188, height: 72, count: 4 }
};

const cvs = document.getElementById("cvs");
const ctx = cvs.getContext("2d");
const spcvs = new libSprite.TSpriteCanvas(cvs, 800, 600);
const cvsCenter = new lib2d.TPoint(cvs.width / 2, cvs.height / 2);

const pos = new lib2d.TPosition(0, 0);
const button1 = new libSprite.TSpriteButtonHaptic(spcvs, SpriteInfoList.buttonGreen, pos);
button1.scale = 0.5;
//set the pivot point to the right center of the button
button1.pivot = cvsCenter;//{x: button1.right, y: (button1.bottom + button1.height / 2)};
button1.onClick = () => {console.log("Button 1 clicked");};
button1.debug = true;


pos.x = 250;
pos.y = 150;
const button2 = new libSprite.TSpriteDraggable(spcvs, SpriteInfoList.buttonGreen, pos, lib2d.TOval);
button2.onClick = () => {console.log("Button 2 clicked");};
button2.scale = 0.5;
button2.visible = true;
button2.snapDistance = 10;
button2.snapTo = {points:[{x: 50, y: 300}, {x: 100, y: 300}, {x: 150, y: 300}, {x: 200, y: 300}], distance: 10};
button2.debug = true;

console.log(button1.shape.center);
console.log(button2.shape.center);

//--------------- Functions ----------------------------------------------//

function loadApp() {
  drawCanvas();
  setInterval(animateApp, 1);
} // end of loadApp

function drawCanvas() {
  spcvs.clearCanvas();
  // Draw the button2 snap position as a circle
  button2.snapTo.points.forEach((aPoint) => {
    ctx.beginPath();
    ctx.arc(aPoint.x, aPoint.y, 5, 0, 2 * Math.PI);
    ctx.stroke();
  });

  button1.draw();
  button2.draw();
  requestAnimationFrame(drawCanvas);
}

let speed = 0.7;


function animateApp() {
  /*
  button1.x += speed;
  if(button1.right > cvs.width || button1.left < 0){
    speed *= -1;
  }
  */
  button1.rotation += 0.5;

  /*
  button2.rotation += 1;
  */
  if(button1.hasCollided(button2)){
    console.log("Collision detected");
  }
}

//--------------- Event Handlers -----------------------------------------//

//--------------- Main Code ----------------------------------------------//

// Load the sprite sheet and start the app
spcvs.loadSpriteSheet("./Media/button_01.png", loadApp);
