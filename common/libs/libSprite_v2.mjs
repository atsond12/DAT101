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
  #boundingRect;
  #sprites;

  constructor(aCanvas) {
    this.#cvs = aCanvas;
    this.#ctx = aCanvas.getContext("2d");
    this.#img = new Image();
    this.#boundingRect = this.#cvs.getBoundingClientRect();
    this.mousePos = new lib2D.TPosition(0, 0);
    this.activeSprite = null;
    this.#sprites = [];
    this.#cvs.addEventListener("mousemove", this.#mouseMove);
    this.#cvs.addEventListener("click", this.#mouseClick);
    this.#cvs.addEventListener("mouseleave", this.#mouseLeave);
    this.#cvs.addEventListener("mousedown", this.#mouseDown);
    this.#cvs.addEventListener("mouseup", this.#mouseUp);
  }

  #mouseMove = (aEvent) => {
    const pos = this.getMousePos(aEvent);
    let newButton = null;

    //First check if active sprite is a draggable sprite, and if it is dragging, then call onDrag
    //Only TSpriteDraggable has isDragging property
    if (this.activeSprite && this.activeSprite.isDragging) {
      this.activeSprite.onDrag(pos);
      return;
    }

    this.#sprites.every((aSprite) => {
      //Continue to next button if this button is not visible
      if (aSprite.visible === false) return true;
      const isInside = aSprite.isMouseInside(pos);
      if (isInside) {
        newButton = aSprite;
        return false;
      } else {
        return true;
      }
    });
    if (newButton !== null && newButton !== this.activeSprite) {
      this.activeSprite = newButton;
      if (this.activeSprite.onEnter) {
        this.activeSprite.onEnter();
      }
    } else if (newButton === null && this.activeSprite !== null) {
      if (this.activeSprite.onLeave) {
        this.activeSprite.onLeave();
      }
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

  #mouseClick = () => {
    if (this.activeSprite !== null && this.activeSprite.onClick !== null) {
      this.activeSprite.onClick();
    }
  };

  #mouseLeave = () => {
    this.activeSprite = null;
    this.#cvs.style.cursor = "default";
  };

  #mouseDown = () => {
    if (this.activeSprite !== null && this.activeSprite.onMouseDown) {
      this.activeSprite.onMouseDown();
    }
  };

  #mouseUp = () => {
    if (this.activeSprite !== null && this.activeSprite.onMouseUp) {
      this.activeSprite.onMouseUp();
    }
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
  }

  clearCanvas() {
    this.#ctx.clearRect(0, 0, this.#cvs.width, this.#cvs.height);
    //add shadow to canvas
    this.#ctx.shadowColor = "black";
    this.#ctx.shadowBlur = 10;
    this.#ctx.shadowOffsetX = 5;
    this.#ctx.shadowOffsetY = 5;
  }

  addSpriteButton(aButton) {
    this.#sprites.push(aButton);
  }

  removeSpriteButton(aButton) {
    const index = this.#sprites.indexOf(aButton);
    if (index >= 0) {
      this.#sprites.splice(index, 1);
    }
  }

  getMousePos(aEvent) {
    this.mousePos.x = aEvent.clientX - this.#boundingRect.left;
    this.mousePos.y = aEvent.clientY - this.#boundingRect.top;
    return this.mousePos;
  }

  get style() {
    return this.#cvs.style;
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
  constructor(aSpriteCanvas, aSpriteInfo, aPosition, aShapeClass) {
    super(aSpriteCanvas, aSpriteInfo, aPosition, aShapeClass);
    this.#offset = null; //Not dragging
    this.canDrag = true;
    this.canDrop = true;
    this.snapTo = null;
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
    if (this.canDrop === false) {
      //Reset position to start drag position
      this.x = this.#startDragPos.x;
      this.y = this.#startDragPos.y;
    }
    this.#offset = null;
    this.#startDragPos = null;
    this.spcvs.style.cursor = "grab";
  }

  onDrag(aPosition) {
    if (this.#offset === null) {
      return;
    }
    this.canDrop = this.lastCollision === null;
    this.x = aPosition.x + this.#offset.x;
    this.y = aPosition.y + this.#offset.y;
    if (this.canDrop === false) {
      //Set canvas cursor to not-allowed
      this.spcvs.style.cursor = "not-allowed";
    } else {
      this.spcvs.style.cursor = "grabbing";
      if (this.snapTo) {
        this.snapTo.points.every((aPoint) => {
          const distance = this.shape.distanceToPoint(aPoint);
          if (distance <= this.snapTo.distance) {
            this.x = aPoint.x;
            this.y = aPoint.y;
            return false;
          }
          return true;
        });
      }
    }
  }
} //End of TSpriteDraggable class

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
};
