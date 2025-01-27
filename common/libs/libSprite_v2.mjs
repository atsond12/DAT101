"use strict";
import lib2D from "./lib2d_v2.mjs";
/**
 * @library libSprite
 * @description A library for classes that manage sprite animations.
 */

class TSpriteCanvas {
  #cvs;
  #ctx;
  #img;
  #boundingRect;

  constructor(aCanvas) {
    this.#cvs = aCanvas;
    this.#ctx = aCanvas.getContext("2d");
    this.#img = new Image();
    this.#boundingRect = this.#cvs.getBoundingClientRect();
    this.mousePos = new lib2D.TPosition(0, 0);
  }

  loadSpriteSheet(aFileName, aLoadedFinal) {
    this.#img.onload = aLoadedFinal;
    this.#img.src = aFileName;
  }

  drawSprite(aSpriteInfo, aDx = 0, aDy = 0, aIndex = 0, aRot = 0) {
    let index = aIndex;
    const sx = aSpriteInfo.x + index * aSpriteInfo.width;
    const sy = aSpriteInfo.y;
    const sw = aSpriteInfo.width;
    const sh = aSpriteInfo.height;
    const dx = aDx;
    const dy = aDy;
    const dw = sw;
    const dh = sh;
    if(aRot !== 0){
      //Hvis vi har rotasjon må vi flytte mitten av destinasjonen til 0,0
      const cx = dx + dw / 2;
      const cy = dy + dh / 2;
      const rad = aRot * Math.PI / 180;
      this.#ctx.translate(cx, cy);
      this.#ctx.rotate(rad);
      this.#ctx.drawImage(this.#img, sx, sy, sw, sh, -dw / 2, -dh / 2, dw, dh);
      this.#ctx.rotate(-rad);
      this.#ctx.translate(-cx, -cy);
    }else{
      this.#ctx.drawImage(this.#img, sx, sy, sw, sh, dx, dy, dw, dh);
    }
  }

  clearCanvas() {
    this.#ctx.clearRect(0, 0, this.#cvs.width, this.#cvs.height);
  }

  addEventListener(aType, aListener){
    this.#cvs.addEventListener(aType, aListener);
  }

  getMousePos(aEvent){
    this.mousePos.x = aEvent.clientX - this.#boundingRect.left;
    this.mousePos.y = aEvent.clientY - this.#boundingRect.top;
    return this.mousePos;
  }

  get style(){
    return this.#cvs.style;
  }

} // End of TSpriteCanvas class

/* 
 Utvid konstruktøren til å ta inn et punkt for destinasjon til sprite.
*/

class TSpriteBase extends lib2D.TPosition {
  #spcvs;
  #spi;
  #index;
  #speedIndex;
  constructor(aSpriteCanvas, aSpriteInfo, aPosition) {
    super(aPosition.x, aPosition.y);
    //Can not create an instance of an abstract class
    if (this.constructor === TSpriteBase) throw new TypeError("Can not create an instance of an abstract class");
    this.#spcvs = aSpriteCanvas;
    this.#spi = aSpriteInfo;
    this.#index = 0;
    this.animateSpeed = 0;
    this.#speedIndex = 0;
    this.rotation = 0;
  }

  draw() {
    if (this.animateSpeed > 0) {
      this.#speedIndex += this.animateSpeed / 100;
      if (this.#speedIndex >= 1) {
        this.#index++;
        this.#speedIndex = 0;
        if (this.#index >= this.#spi.count) {
          this.#index = 0;
        }
      }
    }
    this.#spcvs.drawSprite(this.#spi, this.x, this.y, this.#index, this.rotation);
  }

  get index() {
    return this.#index;
  }
  
  set index(aIndex){
    if(aIndex < 0 || aIndex >= this.#spi.count){
      //Reset index to 0, because of ++ or -- operation
      aIndex = 0;
    }
    this.#index = aIndex;
  }

  hasCollided(aSprite){
    return this.boundingBox.isShapeInside(aSprite.boundingBox);
  }

  get boundingBox(){
    throw new TypeError("Property boundingBox must be overridden");
  }

  get left(){
    return this.x;
  }

  get right(){
    return this.x + this.#spi.width;
  }

  get top(){
    return this.y;
  }

  get bottom(){
    return this.y + this.#spi.height;
  }

} //End of TSprite class

class TSprite extends TSpriteBase {
  #boundingBox;
  constructor(aSpriteCanvas, aSpriteInfo, aPosition) {
    super(aSpriteCanvas, aSpriteInfo, aPosition);
    this.#boundingBox = new lib2D.TRectangle(this, aSpriteInfo.width, aSpriteInfo.height);
  }
 
  get boundingBox(){
    return this.#boundingBox;
  }
  
}

export default {
  /**
   * @class TSpriteCanvas
   * @description A class that manage sprite canvas for lading sprite sheets.
   * @param {HTMLCanvasElement} aCanvas - The canvas element to use.
   * @function loadSpriteSheet - Loads a sprite sheet image.
   * @param {string} aFileName - The file name of the sprite sheet image.
   * @param {function} aLoadedFinal - A callback function to call when the image is done loading.
   */
  TSpriteCanvas: TSpriteCanvas,

  /**
   * @class TSprite
   * @description A class that manage sprite animations.
   * @param {TSpriteCanvas} aSpriteCanvas - The sprite canvas to use.
   * @param {object} aSpriteInfo - The sprite information.
   * @param {TPosition} aPosition - The position of the sprite.
   * @function draw - Draws the sprite on the canvas.
   */
  TSprite: TSprite,
};
