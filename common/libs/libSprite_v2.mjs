"use strict";
import lib2D from "./lib2d_v2.mjs";
/**
 * @library libSprite
 * @description A library for classes that manage sprite animations.
 */

const TShape = lib2D.TShape;

class TSpriteCanvas {
  #cvs;
  #ctx;
  #img;
  #rect;
  #sprites;
  #mouseDownSprite;
  #mouseUpSprite;

  constructor(aCanvas) {
    this.#cvs = aCanvas;
    this.#ctx = aCanvas.getContext("2d");
    this.#img = new Image();
    this.#rect = this.#cvs.getBoundingClientRect();
    this.mousePos = new lib2D.TPosition(0, 0);
    this.activeSprite = null;
    this.#sprites = [];
    this.#cvs.addEventListener("mousemove", this.#mouseMove);
    this.#cvs.addEventListener("click", this.#mouseClick);
    this.#cvs.addEventListener("mouseleave", this.#mouseLeave);
    this.#cvs.addEventListener("mousedown", this.#mouseDown);
    this.#cvs.addEventListener("mouseup", this.#mouseUp);
  }

  get canvas() {
    return this.#cvs;
  }

  #mouseMove = (aEvent) => {
    const pos = this.getMousePos(aEvent);
    //First check if active sprite is a draggable sprite, and if it is dragging, then call onDrag
    //Only TSpriteDraggable has isDragging property
    if (this.activeSprite && this.activeSprite.isDragging) {
      this.activeSprite.onDrag(pos);
      return;
    }

    let newSprite = null;
    this.#sprites.every((aSprite) => {
      //Continue to next button if this button is not visible or disabled
      if (!aSprite.visible || aSprite.disable) return true;
      const isInside = aSprite.isMouseInside(pos);
      if (isInside) {
        newSprite = aSprite;
        return false; //Break the loop
      } else {
        return true; //Continue the loop
      }
    });
    //If the sprite has changed, then call onEnter and onLeave
    let spriteHasChanged = newSprite !== this.activeSprite;

    if (spriteHasChanged) {
      if (this.activeSprite !== null) {
        if (this.activeSprite.onLeave) {
          this.activeSprite.onLeave(aEvent);
        }
      }
      if (newSprite !== null) {
        if (newSprite.onEnter) {
          newSprite.onEnter(aEvent);
        }
        this.activeSprite = newSprite;
      }
    }

    if (newSprite === null && this.activeSprite !== null) {
      this.activeSprite = null;
    }

    //If active sprite is not on the top, move it to the top
    if (this.activeSprite !== null) {
      const index = this.#sprites.indexOf(this.activeSprite);
      if (index < this.#sprites.length - 1) {
        this.#sprites.splice(index, 1);
        this.#sprites.push(this.activeSprite);
      }
    }
  };

  #mouseClick = (aEvent) => {
    if (this.activeSprite !== null && this.activeSprite.onClick !== null) {
      this.activeSprite.onClick(aEvent);
    }
  };

  #mouseLeave = (aEvent) => {
    if (this.activeSprite !== null && this.activeSprite.onLeave) {
      this.activeSprite.onLeave(aEvent);
    }
    this.activeSprite = null;
    this.#cvs.style.cursor = "default";
  };

  #mouseDown = (aEvent) => {
    this.#mouseDownSprite = this.activeSprite;
    if (this.activeSprite !== null && this.activeSprite.onMouseDown) {
      this.activeSprite.onMouseDown(aEvent);
    }
  };

  #mouseUp = (aEvent) => {
    this.#mouseUpSprite = this.activeSprite;
    //If the mouse down sprite is the same as the mouse up sprite, then call onMouseUp
    if (this.activeSprite && this.activeSprite.onMouseUp && this.#mouseDownSprite === this.#mouseUpSprite) {
      this.activeSprite.onMouseUp(aEvent);
      //If the sprite is disabled after then reset the active sprite
      if (this.activeSprite && this.activeSprite.disable) {
        this.activeSprite = null;
      }
    }
    this.#mouseDownSprite = null; //Reset mouse down sprite
  };

  loadSpriteSheet(aFileName, aLoadedFinal) {
    this.#img.onload = aLoadedFinal;
    this.#img.src = aFileName;
  }

  drawSprite(aSprite) {
    const index = aSprite.index;
    const spi = aSprite.spi;
    const shape = aSprite.shape;
    const rot = aSprite.rotation;
    const sx = spi.x + index * spi.width;
    const sy = spi.y;
    const sw = spi.width;
    const sh = spi.height;
    const dx = shape.x;
    const dy = shape.y;
    const dw = shape.width;
    const dh = shape.height;
    if (rot !== 0) {
      //Center of rotation, relative to canvas top left corner
      const px = aSprite.pivot ? aSprite.pivot.x : aSprite.center.x;
      const py = aSprite.pivot ? aSprite.pivot.y : aSprite.center.y;
      const rad = (rot * Math.PI) / 180;
      this.#ctx.save();
      this.#ctx.translate(px, py);
      this.#ctx.rotate(rad);
      this.#ctx.drawImage(this.#img, sx, sy, sw, sh, -(px - dx), -(py - dy), dw, dh);
      this.#ctx.restore();
    } else {
      this.#ctx.drawImage(this.#img, sx, sy, sw, sh, dx, dy, dw, dh);
    }
    if (aSprite.debug) {
      const oldStrokeStyle = this.#ctx.strokeStyle;
      this.#ctx.strokeStyle = "red";
      this.#ctx.stroke(shape.path2D);
      this.#ctx.strokeStyle = "blue";
      this.#ctx.beginPath();
      this.#ctx.arc(shape.center.x, shape.center.y, 5, 0, 2 * Math.PI);
      this.#ctx.stroke();
      if (aSprite.pivot) {
        this.#ctx.strokeStyle = "green";
        this.#ctx.beginPath();
        this.#ctx.arc(aSprite.pivot.x, aSprite.pivot.y, 5, 0, 2 * Math.PI);
        this.#ctx.fill();
        this.#ctx.stroke();
      }
      this.#ctx.strokeStyle = oldStrokeStyle;
    }
    if (aSprite.onCustomDraw) {
      aSprite.onCustomDraw(this.#ctx);
    }
  }

  clearCanvas() {
    this.#ctx.clearRect(0, 0, this.#cvs.width, this.#cvs.height);
    //add shadow to canvas
    /*
    this.#ctx.shadowColor = "black";
    this.#ctx.shadowBlur = 10;
    this.#ctx.shadowOffsetX = 5;
    this.#ctx.shadowOffsetY = 5;
    */
  }

  addSpriteButton(aButton) {
    this.#sprites.push(aButton);
  }

  removeSpriteButton(aButton) {
    const index = this.#sprites.indexOf(aButton);
    if (index >= 0) {
      this.#sprites.splice(index, 1);
      if (this.activeSprite === aButton) {
        this.activeSprite = null;
        this.#cvs.style.cursor = "default";
      }
    }
  }

  getMousePos(aEvent) {
    this.mousePos.x = aEvent.clientX - this.#rect.left;
    this.mousePos.y = aEvent.clientY - this.#rect.top;
    return this.mousePos;
  }

  get style() {
    return this.#cvs.style;
  }

  //Call this function when the canvas size has changed or position has changed, eks. window resize
  updateBoundsRect() {
    this.#rect = this.#cvs.getBoundingClientRect();
  }

  clearButtons() {
    this.#sprites = [];
  }
} // End of TSpriteCanvas class

class TSprite {
  #index;
  #speedIndex;
  lastCollision;
  constructor(aSpriteCanvas, aSpriteInfo, aPoint, aShapeClass) {
    this.spcvs = aSpriteCanvas;
    this.spi = aSpriteInfo;
    //Create a shape object based on the shape class, or use default rectangle shape
    this.shape = aShapeClass ? new aShapeClass(aPoint, aSpriteInfo.width, aSpriteInfo.height) : new lib2D.TRectangle(aPoint, aSpriteInfo.width, aSpriteInfo.height, lib2D.EShapeType.Rectangle);
    this.#index = 0;
    this.animateSpeed = 0;
    this.#speedIndex = 0;
    this.rotation = 0;
    this.visible = true;
    this.lastCollision = null;
    this.debug = false;
  }

  draw() {
    if (!this.visible) return;
    if (this.animateSpeed > 0) {
      this.#speedIndex += this.animateSpeed / 100;
      if (this.#speedIndex >= 1) {
        this.index++;
        this.#speedIndex = 0;
      }
    }
    this.spcvs.drawSprite(this);
  }

  get index() {
    return this.#index;
  }

  set index(aIndex) {
    if (aIndex < 0 || aIndex >= this.spi.count) {
      //Reset index to 0, because of ++ or -- operation
      aIndex = 0;
    }
    this.#index = aIndex;
  }

  hasCollided(aSprite) {
    if (this.visible === false || aSprite.visible === false) {
      //If one of the sprites are not visible, then there is no collision
      return false;
    }
    if (this.shape.isShapeInside(aSprite.shape)) {
      //Check if this sprite is the last sprite that collided with aSprite
      if (this.lastCollision === aSprite) {
        //Only detect collision once, application must trigger the new collision, or it's forgotten
        return false;
      }
      //Remember last collision
      this.lastCollision = aSprite;
      aSprite.lastCollision = this;
      return true;
    }
    //Reset last collision, trigger new collision even if the sprites are colliding again!
    this.lastCollision = null;
    if (aSprite.lastCollision === this) {
      aSprite.lastCollision = null;
    }
    return false;
  }

  get x() {
    return this.shape.x;
  }

  set x(aX) {
    this.shape.x = aX;
  }

  get y() {
    return this.shape.y;
  }

  set y(aY) {
    this.shape.y = aY;
  }

  get left() {
    return this.shape.left;
  }

  get right() {
    return this.shape.right;
  }

  get top() {
    return this.shape.top;
  }

  get bottom() {
    return this.shape.bottom;
  }

  get width() {
    return this.shape.width;
  }

  set width(aWidth) {
    this.shape.width = aWidth;
  }

  get height() {
    return this.shape.height;
  }

  set height(aHeight) {
    this.shape.height = aHeight;
  }

  get radius() {
    return this.shape.radius;
  }

  set radius(aRadius) {
    this.shape.radius = aRadius;
  }

  get center() {
    return this.shape.center;
  }

  set center(aCenter) {
    throw new Error("Center is read only, maybe you want to set pivot instead.");
  }

  get noneUniformScale() {
    const scale = {
      x: this.shape.width / this.spi.width,
      y: this.shape.height / this.spi.height,
    };
    return scale;
  }

  set noneUniformScale({ x, y }) {
    this.width *= x;
    this.height *= y;
  }

  get scale() {
    return this.shape.scale;
  }

  set scale(aScale) {
    this.shape.scale = aScale;
  }
} //End of TSprite class

class TSpriteButton extends TSprite {
  constructor(aSpriteCanvas, aSpriteInfo, aPosition, aShapeClass) {
    super(aSpriteCanvas, aSpriteInfo, aPosition, aShapeClass);
    this.spcvs.addSpriteButton(this);
    this.disable = false;
    this.onClick = null;
  }

  isMouseInside(aPosition) {
    if (this.visible === false || this.disable) {
      return false;
    }
    return this.isDragging || this.shape.isPositionInside(aPosition);
  }

  onEnter() {
    this.spcvs.style.cursor = "pointer";
  }

  onLeave() {
    this.spcvs.style.cursor = "default";
  }
} //End of TSpriteButton class

class TSpriteButtonHaptic extends TSpriteButton {
  constructor(aSpriteCanvas, aSpriteInfo, aPosition, aShapeClass) {
    super(aSpriteCanvas, aSpriteInfo, aPosition, aShapeClass);
  }

  draw() {
    if (this.disable) {
      this.index = 3;
    }
    super.draw();
  }

  onEnter() {
    super.onEnter();
    this.index = 1;
  }

  onLeave() {
    super.onLeave();
    this.index = 0;
  }

  onMouseDown() {
    this.index = 2;
  }

  onMouseUp() {
    this.index = 1;
  }
} //End of TSpriteButton class

class TSnapTo {
  constructor(aPositions, aDistance) {
    this.positions = aPositions;
    this.distance = aDistance;
  }
}

class TSpriteDraggable extends TSpriteButton {
  #offset;
  #startDragPos;
  #canDrop;
  #dropPos;
  constructor(aSpriteCanvas, aSpriteInfo, aPosition, aShapeClass) {
    super(aSpriteCanvas, aSpriteInfo, aPosition, aShapeClass);
    this.#offset = null; //Not dragging
    this.canDrag = true;
    this.#canDrop = true;
    this.snapTo = null;
    this.#dropPos = null;
  }

  get isDragging() {
    return this.#offset !== null;
  }

  onEnter() {
    this.spcvs.style.cursor = "grab";
  }

  onLeave() {
    this.spcvs.style.cursor = "default";
  }

  onMouseDown() {
    if (this.canDrag === false) {
      return;
    }
    if (!this.#offset) {
      this.#startDragPos = this.shape.clonePosition(); //Clone the position
      this.#offset = new lib2D.TPosition(this.x - this.spcvs.mousePos.x, this.y - this.spcvs.mousePos.y);
    }
    this.spcvs.style.cursor = "grabbing";
  }

  onMouseUp() {
    if (this.#canDrop === false) {
      //Reset position to start drag position
      this.x = this.#startDragPos.x;
      this.y = this.#startDragPos.y;
      if (this.onCancelDrop) {
        //Call the onCancelDrop function, user has cancelled the drop
        this.onCancelDrop();
      }
      //The mouse if no longer over the sprite, so reset the cursor
      this.spcvs.style.cursor = "default";
    } else {
      if (this.onDrop) {
        this.onDrop(this.#dropPos);
      }
      //The mouse is still over the sprite, so set the cursor to grab
      this.spcvs.style.cursor = "grab";
    }
    this.#offset = null;
    this.#startDragPos = null;
  }

  onDrag(aPosition) {
    if (this.#offset === null) {
      return;
    }
    //Check if the sprite can drop at the new position
    this.#canDrop = this.lastCollision === null && this.onCanDrop ? this.onCanDrop(aPosition) : true;
    this.x = aPosition.x + this.#offset.x;
    this.y = aPosition.y + this.#offset.y;
    //Check if the sprite can snap to a position, then override the canDrop
    if (this.snapTo) {
      this.snapTo.positions.every((aPosition) => {
        const distance = this.shape.distanceToPoint(aPosition);
        if (distance <= this.snapTo.distance) {
          this.x = aPosition.x;
          this.y = aPosition.y;
          this.#canDrop = true;
          this.#dropPos = aPosition;
          return false; //Break the loop
        }
        return true; //Continue the loop
      });
    }
    if (this.#canDrop === false) {
      //Set canvas cursor to not-allowed
      this.spcvs.style.cursor = "not-allowed";
    } else {
      this.spcvs.style.cursor = "grabbing";
    }
  }
} //End of TSpriteDraggable class

const ESpriteNumberJustifyType = { Left: 0, Center: 1, Right: 2 };

class TSpriteNumber {
  #spcvs;
  #spi;
  #position;
  #shapeClass;
  #value;
  #spNumbers;
  #justify;
  constructor(aSpriteCanvas, aSpriteInfo, aPosition, aShapeClass) {
    this.#spcvs = aSpriteCanvas;
    this.#spi = aSpriteInfo;
    this.#position = aPosition;
    this.#shapeClass = aShapeClass;
    this.#value = 0;
    this.digits = 0; //if Digit is 0, then the number of digits is the length of the value
    this.#spNumbers = [];
    this.#justify = ESpriteNumberJustifyType.Left;
    this.value = 0;
  }

  get value() {
    return this.#value;
  }

  set value(aValue) {
    //Convert value to string, check number of digits, each digit is a sprite.
    //If the list of sprite is less than the number of digits, then add more sprites, or remove sprites.
    let strValue = aValue.toString();
    let digits = this.digits ? this.digits : strValue.length;
    let needToRealign = digits !== this.#spNumbers.length && this.#justify !== ESpriteNumberJustifyType.Left;
    if (strValue.length > digits) {
      //No more space for new digits, the max value is reached, return without updating the value
      return;
    }
    this.#value = aValue;
    while (digits !== this.#spNumbers.length) {
      const addDigit = digits > this.#spNumbers.length;
      if (addDigit) {
        //assume the number is left justified, so add new digit sprite to the right
        const nextPosition = { x: this.#position.x + this.#spNumbers.length * this.#spi.width, y: this.#position.y };
        this.#spNumbers.push(new TSprite(this.#spcvs, this.#spi, nextPosition, this.#shapeClass));
      } else {
        this.#spNumbers.pop();
      }
    }

    if (needToRealign) {
      this.#UpdatePosition();
    }

    //Set the sprite index of each digit sprite
    while (strValue.length < this.#spNumbers.length) {
      strValue = "0" + strValue;
    }
    this.#spNumbers.forEach((aSprite, aIndex) => {
      aSprite.index = parseInt(strValue.charAt(aIndex));
    });
  }

  draw() {
    //Draw each digit sprite
    this.#spNumbers.forEach((aSprite) => {
      aSprite.draw();
    });
  }

  #UpdatePosition = () => {
    //move the sprite according to the new justify
    switch (this.#justify) {
      case ESpriteNumberJustifyType.Left:
        this.#spNumbers.forEach((aSprite, aIndex) => {
          aSprite.x = this.#position.x + aIndex * this.#spi.width;
          aSprite.y = this.#position.y;
        });
        break;
      case ESpriteNumberJustifyType.Center:
        const center = (this.#spNumbers.length * this.#spi.width) / 2;
        this.#spNumbers.forEach((aSprite, aIndex) => {
          aSprite.x = this.#position.x - center + aIndex * this.#spi.width;
          aSprite.y = this.#position.y;
        });
        break;
      case ESpriteNumberJustifyType.Right:
        //If right justify, then move all sprites to the right
        this.#spNumbers.forEach((aSprite, aIndex) => {
          aSprite.x = this.#position.x - (this.#spNumbers.length - aIndex - 1) * this.#spi.width;
          aSprite.y = this.#position.y;
        });
        break;
    }
  };

  get justify() {
    return this.#justify;
  }

  set justify(aJustify) {
    if (this.#justify === aJustify) return;
    this.#justify = aJustify;
    this.#UpdatePosition();
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
  TSpriteCanvas,

  /**
   * @class TSprite
   * @description A simple sprite class for default rectangle shaped sprites. Create a TSprite extended class for custom shapes.
   * @param {TSpriteCanvas} aSpriteCanvas - The sprite canvas to use.
   * @param {object} aSpriteInfo - The sprite information.
   * @param {lib2D.TShape} aShape - The shape of the sprite.
   * @function draw - Draws the sprite on the canvas.
   */
  TSprite,

  /**
   * @class TSpriteButton
   * @extends TSprite
   * @description A class that manage sprite buttons.
   * @param {TSpriteCanvas} aSpriteCanvas - The sprite canvas to use.
   * @param {object} aSpriteInfo - The sprite information.
   * @param {lib2D.TShape} aShape - The shape of the sprite.
   */
  TSpriteButton,

  /**
   * @class TSpriteButtonHaptic
   * @extends TSpriteButton
   * @description A class that manage haptic buttons, means a button that gives feedback when pressed. Please provide at least 4 images in the sprite sheet inclusive disable mode.
   * @description The images should be in the following order: Normal = 0, Hover = 1, Pressed = 3, Disabled = 4.
   * @param {TSpriteCanvas} aSpriteCanvas - The sprite canvas to use.
   * @param {object} aSpriteInfo - The sprite information.
   * @param {lib2D.TShape} aShape - The shape of the sprite.
   */
  TSpriteButtonHaptic,

  /**
   * @class TSpriteDraggable
   * @description A class that manage draggable sprite buttons.
   * @param {TSpriteCanvas} aSpriteCanvas - The sprite canvas to use.
   * @param {object} aSpriteInfo - The sprite information.
   * @param {lib2D.TShape} aShape - The shape of the sprite.
   */
  TSpriteDraggable,

  /**
   * @class TSpriteNumber
   * @description A class that manage sprite numbers.
   * @param {TSpriteCanvas} aSpriteCanvas - The sprite canvas to use.
   * @param {object} aSpriteInfo - The sprite information.
   * @param {lib2D.TPosition} aPosition - The position of the sprite.
   * @param {lib2D.TShape} aShape - The shape of the sprite. Use the class name of the shape, not the instance. Example: lib2D.TRectangle, lib2D.TCircle, etc.
   * @function draw - Draws the number sprite on the canvas.
   * @property {number} value - The value of the number sprite.
   */
  TSpriteNumber,

  /**
   * @enum {ESpriteNumberJustifyType}
   * @description An enumeration for sprite number justify type.
   * @property {number} Left - The left justify type.
   * @property {number} Center - The center justify type.
   * @property {number} Right - The right justify type.
   */
  ESpriteNumberJustifyType,
};
