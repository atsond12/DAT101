"use strict";
import { TSprite } from "./sprite.js";
import { TPoint } from "./point2d.js";
import { TRect } from "./shape2d.js";

/**
 * @description Enum for text justification.
 * @readonly
 * @enum {number}
 */
export const ESpriteNumberJustifyType = { Left: 0, Center: 1, Right: 2 };

/**
 * @description Class for displaying numbers using sprites.
 * @class TSpriteNumber
 */
export class TSpriteNumber {
  // ============================================================
  //  PRIVATE ATTRIBUTES
  // ============================================================
  #spcvs;
  #spi;
  #position; // {x, y} object
  #shapeClass;
  #value;
  #spNumbers; // Array of TSprite
  #justify;
  #hidden;
  #scale;
  #alpha;

  // ============================================================
  //  CONSTRUCTOR
  // ============================================================
  /**
   * @description Creates a sprite number display.
   * @param {TSpriteCanvas} aSpriteCanvas - The canvas to draw on.
   * @param {TSpriteInfo} aSpriteInfo - Sprite info containing digits 0-9.
   * @param {object} aPosition - Object with x and y properties (e.g., {x: 10, y: 10}).
   * @param {class} aShapeClass - Optional shape class.
   */
  constructor(aSpriteCanvas, aSpriteInfo, aX, aY, aInitalValue = 0, aDigits = 0, aJustify = ESpriteNumberJustifyType.Left) { 
    this.#spcvs = aSpriteCanvas;
    this.#spi = aSpriteInfo;
    this.#position = new TPoint(aX, aY);
    this.#shapeClass = TRect; // Number is always rectange shape
    this.#value = aInitalValue;
    
    /** * @member {number} digits 
     * @description Fixed number of digits to display (padding with zeros). 
     * If 0, the number of digits adapts to the value length.
     */
    this.digits = aDigits; 

    this.#spNumbers = [];
    this.#justify = aJustify;
    this.#hidden = false;
    this.#scale = 1.0;
    this.#alpha = 1.0;

    // Initialize with default value
    this.value = 0;
  }

  // ============================================================
  //  PRIVATE FUNCTIONS
  // ============================================================

  /**
   * @description Updates the positions of all digit sprites based on justification.
   */
  #updatePosition = () => {
    // Determine the total width of the number string
    const totalWidth = this.#spNumbers.length * this.#spi.width * this.#scale;
    let startX = this.#position.x;

    // Adjust starting X based on justification
    if (this.#justify === ESpriteNumberJustifyType.Center) {
      startX -= totalWidth / 2;
    } else if (this.#justify === ESpriteNumberJustifyType.Right) {
      startX -= totalWidth;
    }

    // Move sprites
    for (let i = 0; i < this.#spNumbers.length; i++) {
      const sprite = this.#spNumbers[i];
      sprite.x = startX + (i * this.#spi.width * this.#scale);
      sprite.y = this.#position.y;
    }
  };

  // ============================================================
  //  PUBLIC ATTRIBUTES (GETTERS / SETTERS)
  // ============================================================

  get value() {
    return this.#value;
  }

  set value(aValue) {
    let strValue = Math.abs(aValue).toString(); // Handle negative numbers if needed, or stick to abs
    const targetDigits = this.digits > 0 ? this.digits : strValue.length;

    // If the value is too large for the fixed digits, we do not update (or you could clamp it)
    if (this.digits > 0 && strValue.length > this.digits) {
      return; 
    }

    this.#value = aValue;
    
    // 1. Adjust the number of sprite objects needed
    let needToRealign = false;
    
    // Add sprites if we don't have enough
    while (this.#spNumbers.length < targetDigits) {
      // Calculate a temporary position (will be fixed by updatePosition)
      // TSprite constructor expects (canvas, info, x, y, shapeClass)
      const newSprite = new TSprite(
        this.#spcvs, 
        this.#spi, 
        this.#position.x, 
        this.#position.y, 
        this.#shapeClass
      );
      
      // Apply current styles
      newSprite.hidden = this.#hidden;
      newSprite.alpha = this.#alpha;
      newSprite.scale = this.#scale;
      
      this.#spNumbers.push(newSprite);
      needToRealign = true;
    }

    // Remove sprites if we have too many
    while (this.#spNumbers.length > targetDigits) {
      this.#spNumbers.pop();
      needToRealign = true;
    }

    // 2. Pad string with zeros if needed
    while (strValue.length < this.#spNumbers.length) {
      strValue = "0" + strValue;
    }

    // 3. Update the frame index for each sprite
    for (let i = 0; i < this.#spNumbers.length; i++) {
      const char = strValue.charAt(i);
      this.#spNumbers[i].index = parseInt(char, 10);
    }

    // 4. Realign positions if the count changed or we haven't aligned yet
    if (needToRealign) {
      this.#updatePosition();
    }
  }

  /**
   * @description Gets the justification of the number sprites.
   * @description Maps to ESpriteNumberJustifyType enum.
   */
  get justify() {
    return this.#justify;
  }

  /**
   * @description Sets the justification of the number sprites.
   * @description Maps to ESpriteNumberJustifyType enum.
   * @param {ESpriteNumberJustifyType} aJustify - The justification type.
   */
  set justify(aJustify) {
    if (this.#justify === aJustify) return;
    this.#justify = aJustify;
    this.#updatePosition();
  }

  /**
   * @description Gets the visibility of the number sprites.
   * @description Maps to the 'hidden' property of TSprite.
   * @return {boolean} True if visible, false if hidden.
   */
  get visible() {
    return !this.#hidden;
  }

  /**
   * @description Sets the visibility of the number sprites.
   * @description Maps to the 'hidden' property of TSprite.
   * @param {boolean} aVisible - True to make visible, false to hide.
   */
  set visible(aVisible) {
    this.#hidden = !aVisible;
    for (let i = 0; i < this.#spNumbers.length; i++) {
      this.#spNumbers[i].hidden = this.#hidden;
    }
  }

  /**
   * @description Gets or sets the alpha transparency of the number sprites.
   * @description Maps to the 'alpha' property of TSprite.
   * @returns {number} The alpha transparency (0.0 to 1.0).
   */
  get alpha() {
    return this.#alpha;
  }

  set alpha(aAlpha) {
    this.#alpha = aAlpha;
    for (let i = 0; i < this.#spNumbers.length; i++) {
      this.#spNumbers[i].alpha = aAlpha;
    }
  }

  /**
   * @description Gets the scale of the number sprites.
   * @returns {number} The scale factor.
   */
  get scale() {
    return this.#scale;
  }

  /**
   * @description Sets the scale of the number sprites.
   * @param {number} aScale - The scale factor.
   */
  set scale(aScale) {
    if (this.#scale === aScale) return;
    this.#scale = aScale;
    for (let i = 0; i < this.#spNumbers.length; i++) {
      this.#spNumbers[i].scale = aScale;
    }
    // Scale affects width, so we must realign
    this.#updatePosition();
  }

  // ============================================================
  //  PUBLIC FUNCTIONS
  // ============================================================

  /** 
   * @description Draws the number sprites on the canvas.
  */
  draw() {
    if (this.#hidden) return;
    
    // Performance: Use standard loop instead of forEach to avoid allocations
    for (let i = 0; i < this.#spNumbers.length; i++) {
      this.#spNumbers[i].draw();
    }
  }

  /**
   * @description Moves the number sprites to a new position.
   * @description Useful for dynamic positioning. E.g., having game score in several menus.
   * @param {number} aX - The new x coordinate.
   * @param {number} aY - The new y coordinate.
   */
  moveTo(aX, aY) {
    this.#position.x = aX;
    this.#position.y = aY;
    this.#updatePosition();
  }
}