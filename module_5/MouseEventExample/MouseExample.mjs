"use strict";

const cvs = document.getElementById("cvs");
const ctx = cvs.getContext("2d");

const rect = {
  x: 100,
  y: 100,
  width: 100,
  height: 50,
}

function drawRect() {
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
  ctx.stroke();
}

drawRect();

function getExactMousePos(aEvent){
  const rect = cvs.getBoundingClientRect();
  return {
    x: aEvent.clientX - rect.left,
    y: aEvent.clientY - rect.top,
  }
}

function isInsideRect(aPos){
  return aPos.x >= rect.x && aPos.x <= rect.x + rect.width &&
    aPos.y >= rect.y && aPos.y <= rect.y + rect.height;
}

function onMouseMove(aEvent){
  const pos = getExactMousePos(aEvent);
  if(isInsideRect(pos)){
    cvs.style.cursor = "pointer";
    console.log("Mouse inside rect");
  }else{
    cvs.style.cursor = "default";
  }
}

function onMouseClick(aEvent){
  const pos = getExactMousePos(aEvent);
  if(isInsideRect(aEvent)){
    console.log("Mouse click inside rect");
  }
  console.log("Mouse click at pos: ", pos);
}

cvs.addEventListener("mousemove", onMouseMove);
cvs.addEventListener("click", onMouseClick);