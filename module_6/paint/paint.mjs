"use strict";
//------------------------------------------------------------------
//------ Imports ---------------------------------------------------
//------------------------------------------------------------------
import { spcvsMenu, TMenu, EActionType, EColorType, EShapeType, EStrokeSizeType } from "./menu.mjs";
import lib2D from "../../common/libs/lib2d_v2.mjs";

//------------------------------------------------------------------
//------ Variables and objects -------------------------------------
//------------------------------------------------------------------
const cvsPaint = document.getElementById("cvsPaint");
const ctxPaint = cvsPaint.getContext("2d");
let menu = null;
const mousePos = new lib2D.TPoint(0, 0);
//This object will hold the current shape type and its properties, this is also used as default values for the menu buttons
const newShapeType = { ShapeType: EShapeType.Line, FillColor: EColorType.Black, StrokeColor: EColorType.Black, StrokeSize: EStrokeSizeType.Thin };


//------------------------------------------------------------------
//------ Functions -------------------------------------------------
//------------------------------------------------------------------

function menuSheetLoaded() {
  menu = new TMenu(newShapeType);
  requestAnimationFrame(drawMenu); // Start the menu drawing loop
  requestAnimationFrame(drawPaint); // Start the paint drawing loop
}

function drawMenu() {
  menu.draw();
  requestAnimationFrame(drawMenu);
}

function drawPaint() {
  ctxPaint.clearRect(0, 0, cvsPaint.width, cvsPaint.height);
  // Use this function to draw the shapes on the canvas

  requestAnimationFrame(drawPaint);
}

function menyButtonClick(aEvent) {
  console.log("Button clicked:", aEvent.detail);
  if (aEvent.detail.Action) {
    console.log(`Action: ${aEvent.detail.Action.name}, value: ${aEvent.detail.Action.value}`);
    switch (aEvent.detail.Action.value) {
      case EActionType.New:
        console.log("New action clicked");
        break;
      case EActionType.Eraser:
        console.log("Eraser action clicked");
        break;
      case EActionType.MoveUp:
        console.log("Move up action clicked");
        break;
      case EActionType.MoveDown:
        console.log("Move down action clicked");
        break;
    }
  } else {
    // Map all keys from the event to the newShapeType object
    // No need to alter this code, just use it as is
    Object.keys(aEvent.detail).forEach((key) => {
      newShapeType[key] = aEvent.detail[key].value;
    });
    console.log(newShapeType);
  }
}

function mouseDown() {
  // Use this function to create a new shape
}

function mouseMove(aEvent) {
  const rect = cvsPaint.getBoundingClientRect();
  mousePos.x = aEvent.clientX - rect.left;
  mousePos.y = aEvent.clientY - rect.top;
  // use this function to update the mouse position and draw the rubber band effect
}

function mouseUp(aEvent) {
  // Use this function to end the rubber band effect and add the shape to the shapes array
  // You can trap the mouse button (right click) here to close the polygon shape
}

//------------------------------------------------------------------
//------ Main Program ----------------------------------------------
//------------------------------------------------------------------

spcvsMenu.loadSpriteSheet("./media/SpriteSheet.png", menuSheetLoaded);
spcvsMenu.canvas.addEventListener("menuButtonClick", menyButtonClick);
cvsPaint.addEventListener("mousemove", mouseMove);
cvsPaint.addEventListener("mousedown", mouseDown);
cvsPaint.addEventListener("mouseup", mouseUp);
// Disable the context menu on right click
cvsPaint.addEventListener("contextmenu", e => e.preventDefault());
