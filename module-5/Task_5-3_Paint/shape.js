"use strict";
import { TPoint } from "lib2d";
import { newShapeType } from "./paint.mjs";
import { EShapeType } from "./menu.js";

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

  draw(){ } //Abstract function

} // End of TShape


export class TLineShape extends TShape{
  constructor(aX, aY){
    super(aX, aY)

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

} // End of TLineShape
            
export class TCircleShape extends TShape{
  #radius;
  constructor(aX, aY){
    super(aX, aY)
    this.#radius = 0;
  }
  draw(){
    ctxPaint.beginPath();
    //ctxPaint.moveTo(this.posStart.x, this.posStart.y);
    if(!this.posEnd){
      this.#calcRadius();
    }
    ctxPaint.arc(this.posStart.x, this.posStart.y, this.#radius, 0, 2*Math.PI);
    ctxPaint.stroke();
  }

  #calcRadius(){
    const dx = mousePos.x - this.posStart.x;
    const dy = mousePos.y - this.posStart.y;
    let hyp = Math.pow(dx,2) + Math.pow(dy,2);
    hyp = Math.sqrt(hyp);
    this.#radius = hyp;
  }

} // End TCircleShape

export class TEllipseShape extends TShape{
  #radius1;
  #radius2;
  constructor(aX, aY){
    super(aX, aY)
    this.#radius1 = 0;
    this.#radius2 = 0;
  }
  draw(){
    ctxPaint.beginPath();
    if(!this.posEnd){
      this.#calcRadius();
    }
    ctxPaint.ellipse(
      this.posStart.x, this.posStart.y,
      this.#radius1, this.#radius2, 0, 0, 2*Math.PI);
    ctxPaint.stroke();
  }

  #calcRadius(){
    const dx = Math.abs(mousePos.x - this.posStart.x);
    const dy = Math.abs(mousePos.y - this.posStart.y);
    //let hyp = Math.pow(dx,2) + Math.pow(dy,2);
    //hyp = Math.sqrt(hyp);
    this.#radius1 = dx;
    this.#radius2 = dy;
  }

} // End TCircleShape

export class TRectangleShape extends TShape{
  #width;
  #height;
  constructor(aX, aY){
    super(aX, aY)
    this.#width = 0;
    this.#height = 0;
  }

  draw(){
    ctxPaint.beginPath();
    ctxPaint.moveTo(this.posStart.x, this.posStart.y);
    if(!this.posEnd){
      this.#calcSize();
    }
    ctxPaint.rect(this.posStart.x, this.posStart.y, this.#width, this.#height)
    ctxPaint.stroke();
  }

  #calcSize(){
    this.#width = Math.abs(mousePos.x - this.posStart.x);
    this.#height = Math.abs(mousePos.y - this.posStart.y);
  }


} // End of TRectangleShape
            


function updateMousePos(aEvent){
  const rect = cvsPaint.getBoundingClientRect();
  mousePos.x = Math.round(aEvent.clientX - rect.left);
  mousePos.y = Math.round(aEvent.clientY - rect.top);
}

function mouseDown(aEvent){
  updateMousePos(aEvent);
  if(shape === null){
    switch(newShapeType.ShapeType){
      case EShapeType.Line:
          shape = new TLineShape(mousePos.x, mousePos.y);
        break;
      case EShapeType.Circle:
        shape = new TCircleShape(mousePos.x, mousePos.y);
        break;
      case EShapeType.Oval:
        shape = new TEllipseShape(mousePos.x, mousePos.y);
        break;
      case EShapeType.Rectangle:
        shape = new TRectangleShape(mousePos.x, mousePos.y);
    }
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