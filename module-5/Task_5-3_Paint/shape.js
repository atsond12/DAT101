"use strict";
import { TPoint } from "lib2d";

// 🖼️ Access the paint canvas and drawing context, move this to your new JavaScript file.
const cvsPaint = document.getElementById("cvsPaint");
const ctxPaint = cvsPaint.getContext("2d");

let mousePos = new TPoint();
let shape = null;
let shapes = [];

class TShape{
  
  constructor(aX, aY){
    
    this.posStart = new TPoint(aX, aY);
    this.posEnd = null;
  }

  setEndPos(aX, aY){
    this.posEnd = new TPoint(aX, aY);
  }

  draw(){
    ctxPaint.beginPath();
    ctxPaint.moveTo(this.posStart.x, this.posStart.y);
    if(this.posEnd){
      ctxPaint.lineTo(this.posEnd.x, this.posEnd.y);
    }else{
      ctxPaint.lineTo(mousePos.x, mousePos.y);
    }
    ctxPaint.stroke();
  }

}

function updateMousePos(aEvent){
  const rect = cvsPaint.getBoundingClientRect();
  mousePos.x = Math.round(aEvent.clientX - rect.left);
  mousePos.y = Math.round(aEvent.clientY - rect.top);
}

function mouseDown(aEvent){
  updateMousePos(aEvent);
  if(shape === null){
    shape = new TShape(mousePos.x, mousePos.y);
  }
}

function mouseMove(aEvent){
  updateMousePos(aEvent);
}

function mouseUp(aEvent){
  updateMousePos(aEvent);
  if(shape){
    shape.setEndPos(mousePos.x, mousePos.y);
    shapes.push(shape);
    shape = null;
  }
}

function drawCanvas(){
  ctxPaint.clearRect(0, 0, cvsPaint.width, cvsPaint.height);
  for(let i = 0; i < shapes.length; i++){
    shapes[i].draw();
  }
  if(shape){
    shape.draw();
  }
  requestAnimationFrame(drawCanvas);
}

cvsPaint.addEventListener("mousedown", mouseDown);
cvsPaint.addEventListener("mouseup", mouseUp);
cvsPaint.addEventListener("mousemove", mouseMove);
drawCanvas();