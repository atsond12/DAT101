"use strict";
import { TPoint } from "./point2d.js";
import { TRect, TCircle, TEllipse } from "./shape2d.js";

export class TSprite {
  // ============================================================
  //  PRIVATE ATTRIBUTES
  // ============================================================

  #frameIndex; // private, current frame index
  #speedIndex; // private, speed index for frame update timing
  #shape;

  // ============================================================
  //  CONSTRUCTOR
  // ============================================================
  /**
   * @description Creates an instance of TSprite.
   * @param {TSpriteCanvas} aSpriteCanvas - The sprite canvas this sprite belongs to
   * @param {TSpriteInfo} aSpriteInfo - The sprite information object
   * @param {number} aX - The x position of the sprite
   * @param {number} aY - The y position of the sprite
   * @param {class} aShapeClass - Optional shape class for collision detection, defaults to TRectangle
   */
  constructor(aSpriteCanvas, aSpriteInfo, aX, aY, aShapeClass) {
    this.spcvs = aSpriteCanvas; // This needs to be public, derived classes need to access it's methods
    this.spi = aSpriteInfo;
    
    // Create shape based on type - TCircle and TEllipse need radius parameters
    if (aShapeClass === TCircle) {
      const radius = Math.min(this.spi.width, this.spi.height) / 2;
      this.#shape = new TCircle(aX, aY, radius);
    } else if (aShapeClass === TEllipse) {
      this.#shape = new TEllipse(aX, aY, this.spi.width / 2, this.spi.height / 2);
    } else {
      this.#shape = aShapeClass ? new aShapeClass(aX, aY, this.spi.width, this.spi.height) : new TRect(aX, aY, this.spi.width, this.spi.height);
    }
    
    this.#frameIndex = 0;
    this.#speedIndex = 0;

    /**
     * @description Internal reference to the last sprite this sprite collided with. Do not modify directly.
     */
    this.lastCollisionSprite = null;

    /**
     * @description The pivot point of the sprite for rotation and scaling.
     * @description Default is the center of the sprite. adding the position of the sprite.
     * @type {TPoint}
     */
    this.pivot = new TPoint(this.#shape.x + this.#shape.width / 2, this.#shape.y + this.#shape.height / 2);

    /**
     * @description The animation speed of the sprite. Ranges from 0 (no animation) to 100 (full speed).
     * @type {number}
     */
    this.animationSpeed = 0; // 0 to 100%

    /**
     * @description The rotation of the sprite in degrees.
     * @type {number}
     */
    this.rotation = 0; // rotation in degrees

    /**
     * @description Whether the sprite is hidden (not drawn).
     * @type {boolean}
     */
    this.hidden = false;

    /**
     * @description Whether the sprite is in debug mode. Shows bounding boxes and pivot point when true.
     * @type {boolean}
     */
    this.debug = false;

    /**
     * @description The alpha (opacity) of the sprite. Ranges from 0.0 (fully transparent) to 1.0 (fully opaque).
     * @type {number}
     */
    this.alpha = 1.0; // opacity 0.0 = fully transparent to 1.0 = fully opaque

    /**
     * @description Custom draw function for the sprite. If set, this function will be called instead of the default draw method.
     * @type {function|null}
     */
    this.onCustomDraw = null;
  }

  // ============================================================
  //  PRIVATE FUNCTIONS
  // ============================================================

  #animateSpriteFrame() {
    if (this.animationSpeed <= 0) return; // No animation
    this.#speedIndex += this.animationSpeed / 100; // Increase speed index based on animation speed
    if (this.#speedIndex >= 1) {
      this.index += 1; // Advance to next frame
      this.#speedIndex = 0; // Reset speed index
    }
  }

  // ============================================================
  //  PUBLIC ATTRIBUTES (GETTERS / SETTERS)
  // ============================================================

  /**
   * @description Get the current frame index of the sprite
   * @returns {number} The current frame index
   */
  get index() {
    return this.#frameIndex;
  }

  /**
   * @description Set the current frame index of the sprite
   * @param {number} aIndex - The frame index to set
   */
  set index(aIndex) {
    if (aIndex < 0 || aIndex >= this.spi.count) {
      // Loop the index
      aIndex = 0;
    }
    this.#frameIndex = aIndex;
  }

  /**
   * @description Get the shape of the sprite
   * @returns {T2DShape} The shape of the sprite
   */
  get shape() {
    return this.#shape;
  }

  /**
   * @description Get or set the x position of the sprite
   * @returns {number} The x position of the sprite
   */
  get x() {
    return this.#shape.x;
  }

  /**
   * @description Set the x position of the sprite
   * @param {number} aX - The x position to set
   */
  set x(aX) {
    const dx = aX - this.x;
    this.#shape.x = aX;
    this.pivot.x += dx; // Move pivot by same amount
  }

  /**
   * @description Get or set the y position of the sprite
   * @returns {number} The y position of the sprite
   */
  get y() {
    return this.#shape.y;
  }

  /**
   * @description Set the y position of the sprite
   * @param {number} aY - The y position to set
   */
  set y(aY) {
    const dy = aY - this.y;
    this.#shape.y = aY;
    this.pivot.y += dy; // Move pivot by same amount
  }

  /**
   * @description Get the left, right, top, bottom, width, height, radius and center of the sprite's shape
   * @returns {number|TPosition} The respective property of the sprite's shape
   */
  get left() {
    return this.#shape.left;
  }

  /**
   * @description Get the right edge of the sprite
   * @returns {number} The x coordinate of the right edge of the sprite
   */
  get right() {
    return this.#shape.right;
  }

  /**
   * @description Get the top edge of the sprite
   * @returns {number} The y coordinate of the top edge of the sprite
   */
  get top() {
    return this.#shape.top;
  }

  /**
   * @description Get the bottom edge of the sprite
   * @returns {number} The y coordinate of the bottom edge of the sprite
   */
  get bottom() {
    return this.#shape.bottom;
  }

  /**
   * @description Get the width of the sprite
   * @returns {number} The width of the sprite
   */
  get width() {
    return this.#shape.width;
  }

  /**
   * @description Set the width of the sprite
   * @param {number} aWidth - The width to set
   */
  set width(aWidth) {
    const dw = aWidth - this.width;
    this.#shape.width = aWidth;
    // Pivot must move the delta amount
    this.pivot.x += dw / 2;
  }

  /**
   * @description Get the height of the sprite
   * @returns {number} The height of the sprite
   */
  get height() {
    return this.#shape.height;
  }

  /**
   * @description Set the height of the sprite
   * @param {number} aHeight - The height to set
   */
  set height(aHeight) {
    const dh = aHeight - this.height;
    this.#shape.height = aHeight;
    // Pivot must move if height changes
    this.pivot.y += dh / 2;
  }

  /**
   * @description Get or set the radius of the sprite's shape (if applicable)
   * @returns {number} The radius of the sprite's shape
   */
  get radius() {
    return this.#shape.radius;
  }

  /**
   * @description Set the radius of the sprite's shape (if applicable)
   * @param {number} aRadius - The radius to set
   */
  set radius(aRadius) {
    if (this.#shape.radius === undefined) throw new Error(`TSprite: Shape type: ${this.#shape.type}, does not have a radius property.`);
    this.#shape.radius = aRadius;
  }

  /**
   * @description Read only. Get the center point of the sprite's shape
   * @returns {TPosition} The center point of the sprite's shape
   */
  get center() {
    return this.#shape.center;
  }

  // no setter for center, it is read-only
  set center(_aCenter) {
    throw new Error("TSprite: center property is read-only. Maybe you want to set pivot instead?");
  }

  /**
   * @description Get or set the non-uniform scale of the sprite
   * @returns {object} An object with x and y properties representing the scale factors
   */
  get noneUniformScale() {
    const scale = {
      x: this.width / this.spi.width,
      y: this.height / this.spi.height,
    };
    return scale;
  }

  /**
   * @description Set the non-uniform scale of the sprite
   * @param {object} aScale - An object with x and y properties representing the scale factors
   */
  set noneUniformScale({ x, y }) {
    this.width = this.spi.width * x;
    this.height = this.spi.height * y;
  }

  /**
   * @description Get or set the uniform scale of the sprite
   * @returns {number} The scale factor
   */
  get scale() {
    return this.width / this.spi.width; // Assuming uniform scale, width and height scales are the same
  }

  /**
   * @description Set the uniform scale of the sprite
   * @param {number} aScale - The scale factor
   */
  set scale(aScale) {
    this.noneUniformScale = { x: aScale, y: aScale };
  }

  // ============================================================
  //  PUBLIC FUNCTIONS
  // ============================================================

  /** 
   * @description Draw the sprite on the sprite canvas
  */
  draw() {
    if (this.hidden) return;
    this.#animateSpriteFrame();
    this.spcvs.drawSprite(this);
  }

  /** 
   * @description Calculate the distance from this sprite to a point
   * @param {TPoint} aPoint - The point to calculate the distance to
   * @returns {number} The distance to the point
  */
  distanceToPoint(aPoint) {
    return this.#shape.distanceToPoint(aPoint);
  }

  /**
   * @description Check for collision between this sprite and a shape
   * @param {T2DShape} aShape - The shape to check collision against
   * @returns {boolean} True if there is a collision, false otherwise
   */
  checkCollision(aShape) {
    if (!aShape) return false;
    return this.#shape.overlaps(aShape);
  }

  /**
   * @description Check for collision between this sprite and another sprite
   * @param {TSprite} aSprite - The sprite to check collision against
   * @returns {boolean} True if there is a collision, false otherwise
   */
  hasCollided(aSprite) {
    if (!aSprite || this.hidden || aSprite.hidden) return false; // No collision if either sprite is hidden or invalid
    if (this.checkCollision(aSprite.shape)) {
      this.lastCollisionSprite = aSprite;
      aSprite.lastCollisionSprite = this;
      return true;
    }
    return false;
  }

  /**
   * @description Flip the sprite horizontally around its pivot point
   * @returns {number} The new direction multiplier after the flip
  */
  flipHorizontal() {
    // 1. The Coordinate Correction (The "Jump Fix")
    // We shift X by the current width to keep the sprite visually in place
    this.x += this.width;
    // 2. The Visual Flip
    // Invert the X scale
    const currentScale = this.noneUniformScale;
    this.noneUniformScale = { x: -currentScale.x, y: currentScale.y };
    // 3. The Logic Flip
    // return the new direction multiplier
    return -1 * Math.sign(currentScale.x);
  }

  
    /**
     * @description Translate the hero by delta x and delta y
     * @param {number} aDX - Delta X
     * @param {number} aDY - Delta Y
    */
    translate(aDX, aDY) {
      this.x += aDX;
      this.y += aDY;
    }

}
