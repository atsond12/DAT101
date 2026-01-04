"use strict";
import { DEG, TPoint } from "./lib2d.mjs";
import { TEventListenerList } from "./eventListener.js";
import { TSpriteButton, TSpriteDraggable } from "./spriteButton.js";

// ============================================================
//  PRIVATE CLASSES FOR EVENT HANDLING
// ============================================================

const ESpriteCanvasEventNames = { CLICK: "click", MOUSEMOVE: "mousemove", MOUSEDOWN: "mousedown", MOUSEUP: "mouseup", MOUSELEAVE: "mouseleave", MOUSEENTER: "mouseenter" };

// ============================================================
//  TSpriteCanvas CLASS
// ============================================================

/**
 * @description Class representing a canvas for sprite rendering.
 * @class TSpriteCanvas
 */
export class TSpriteCanvas {
  // ============================================================
  //  PRIVATE ATTRIBUTES
  // ============================================================

  #cvs;
  #ctx;
  #img;
  #guiSprites; // Array of any GUI elements (TSpriteButton, TSpriteDraggable, etc). We don't support z-buffering. First added = backmost. User must manage order.
  #activeGUISprite; // Currently active sprite button, the one the mouse pointer is over
  #mousePos; // There is only one mouse active at a time
  #boundingRect; // Bounding rect for mouse position calculations, only updated on canvas resize
  #mouseDownGUISprite; // The GUI sprite that received the last mousedown event
  #mouseUpGUISprite; // The GUI sprite that received the last mouseup event

  // Delegates (function pointers)
  #FDraw; // Togebale draw function
  #FShowFramerate; // Togebale framerate display function

  // Event handlers
  #eventHandlers;

  // FPS measurement struct
  #framerate;

  // Bound wrapper for animation loop
  #internalDrawBound;
  // Bound wrapper for framerate drawer
  #boundDrawFramerate;

  // ============================================================
  //  CONSTRUCTOR
  // ============================================================
  constructor(aCanvas) {
    this.#cvs = aCanvas;
    this.#ctx = aCanvas.getContext("2d");
    this.#img = null;
    this.#guiSprites = [];
    this.#mousePos = new TPoint(0, 0);
    this.#boundingRect = this.#cvs.getBoundingClientRect();
    this.#mouseDownGUISprite = null;
    this.#mouseUpGUISprite = null;

    // Bind dummy delegates once
    this.#FDraw = this.#noOpDraw; // No need to bind, no this reference
    this.#FShowFramerate = this.#noOpShowFramerate; // No need to bind, no this reference

    // Event system
    this.#eventHandlers = new TEventListenerList();

    // FPS state
    this.#framerate = {
      lastTime: performance.now(),
      frameCount: 0,
      fps: 0,
    };

    // Bind the internal draw function once
    this.#internalDrawBound = this.#internalDraw.bind(this); // Bind once for performance, this is the animation loop
    this.#boundDrawFramerate = this.#drawFramerate.bind(this); // Bind once for performance, this is called every frame if enabled
    // Start animation loop once
    requestAnimationFrame(this.#internalDrawBound);

    // internal event handlers
    document.addEventListener("resize", this.#updateBoundingRect.bind(this));
    this.#cvs.addEventListener("mousemove", this.#cvsMouseMove.bind(this));
    this.#cvs.addEventListener("click", this.#cvsMouseClick.bind(this));
    this.#cvs.addEventListener("mousedown", this.#cvsMouseDown.bind(this));
    this.#cvs.addEventListener("mouseup", this.#cvsMouseUp.bind(this));
    this.#cvs.addEventListener("mouseleave", this.#cvsMouseLeave.bind(this));
  }

  // ============================================================
  //  PRIVATE FUNCTIONS
  // ============================================================

  // Private dummy draw handler
  #noOpDraw(_aCTX) {}
  // Private dummy framerate handler
  #noOpShowFramerate() {}

  // Private dummy draw handler  // High performance continuous draw loop (no branching)
  #internalDraw() {
    requestAnimationFrame(this.#internalDrawBound);
    this.#ctx.clearRect(0, 0, this.#cvs.width, this.#cvs.height);
    this.#FDraw(this.#ctx);
    this.#FShowFramerate(); // Optional FPS
  }

  // Private framerate drawer
  #drawFramerate() {
    const now = performance.now();
    this.#framerate.frameCount++;

    if (now - this.#framerate.lastTime >= 1000) {
      this.#framerate.fps = this.#framerate.frameCount;
      this.#framerate.frameCount = 0;
      this.#framerate.lastTime = now;
    }

    this.#ctx.save();
    this.#ctx.font = "16px Arial";
    // calculate the size of the text background
    const textWidth = this.#ctx.measureText(`${this.#framerate.fps} FPS`).width;
    this.#ctx.fillStyle = "white";
    this.#ctx.fillRect(5, 5, textWidth + 10, 20);
    this.#ctx.fillStyle = "black";
    this.#ctx.fillText(`${this.#framerate.fps} FPS`, 10, 20);
    this.#ctx.restore();
  }

  #drawSpriteDebugInfo(aSprite) {
    if (!aSprite.debug) return;
    const shape = aSprite.shape;
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

  #updateBoundingRect() {
    this.#boundingRect = this.#cvs.getBoundingClientRect();
  }

  #updateMousePosition(aEvent) {
    this.#mousePos.x = aEvent.clientX - this.#boundingRect.left;
    this.#mousePos.y = aEvent.clientY - this.#boundingRect.top;
  }

  #cvsMouseMove(aEvent) {
    const sp = this.#activeGUISprite;
    this.#updateMousePosition(aEvent);
    // If this is a draggable sprite, check for dragging
    if (sp && sp instanceof TSpriteDraggable) {
      if (sp.isDragging) {
        sp.onDrag(this.#mousePos);
        return; // No need to check for hover state while dragging
      }
    }
    let newActiveGUISprite = null; // The new active sprite under the mouse
    for (const guiSprite of this.#guiSprites) {
      // Continue to next if this sprite is hidden or disabled
      if (guiSprite.hidden || guiSprite.disabled) continue;
      const isMouseOver = guiSprite.isMouseOver(this.#mousePos);
      if (isMouseOver) {
        newActiveGUISprite = guiSprite;
        break; // We found the array topmost sprite under the mouse
      }
      // Continue checking other sprites
    }
    // What changed?
    let spriteHasChanged = newActiveGUISprite !== this.#activeGUISprite;
    if (spriteHasChanged) {
      // Notify old active sprite of mouse leave
      if (this.#activeGUISprite) {
        const newEvent = {
          ...aEvent,
          target: this,
          x: this.#mousePos.x,
          y: this.#mousePos.y,
        };
        this.#activeGUISprite.onMouseLeave(newEvent);
        //Reset the cursor
        this.#activeGUISprite = null;
        this.#cvs.style.cursor = "default";
      }

      // Notify new active sprite of mouse enter
      if (newActiveGUISprite) {
        const newEvent = {
          ...aEvent,
          target: this,
          x: this.#mousePos.x,
          y: this.#mousePos.y,
        };
        newActiveGUISprite.onMouseEnter(newEvent);
        //Change the cursor
        this.#cvs.style.cursor = "pointer";
        this.#activeGUISprite = newActiveGUISprite;
      }
    }
  }

  #cvsMouseClick(aEvent) {
    if (this.#activeGUISprite) {
      const newEvent = {
        ...aEvent,
        target: this,
        x: this.#mousePos.x,
        y: this.#mousePos.y,
      };
      this.#activeGUISprite.onClick(newEvent);
    }
    // call all click listeners
    this.#eventHandlers.callAll(aEvent, ESpriteCanvasEventNames.CLICK);
  }

  #cvsMouseDown(aEvent) {
    this.#mouseDownGUISprite = this.#activeGUISprite;
    if (this.#mouseDownGUISprite) {
      const newEvent = {
        ...aEvent,
        target: this,
        x: this.#mousePos.x,
        y: this.#mousePos.y,
      };
      this.#mouseDownGUISprite.onMouseDown(newEvent);
    }
    // call all mousedown listeners
    this.#eventHandlers.callAll(aEvent, ESpriteCanvasEventNames.MOUSEDOWN);
  }

  #cvsMouseUp(aEvent) {
    this.#mouseUpGUISprite = this.#activeGUISprite;
    if (this.#mouseUpGUISprite && this.#mouseUpGUISprite === this.#mouseDownGUISprite) {
      // Only trigger mouse up if the mouse is still over the same sprite that received mousedown
      const newEvent = {
        ...aEvent,
        target: this,
        x: this.#mousePos.x,
        y: this.#mousePos.y,
      };
      this.#mouseUpGUISprite.onMouseUp(newEvent);
      if (this.#activeGUISprite && this.#activeGUISprite.disabled) {
        // If the active sprite got disabled, we must reset it
        this.#activeGUISprite = null;
        this.#cvs.style.cursor = "default";
      }
    }
    // Reset the mouse down sprite
    this.#mouseDownGUISprite = null;
    // call all mouseup listeners
    this.#eventHandlers.callAll(aEvent, ESpriteCanvasEventNames.MOUSEUP);
  }

  #cvsMouseLeave(aEvent) {
    if (this.#activeGUISprite) {
      const newEvent = {
        ...aEvent,
        target: this,
        x: this.#mousePos.x,
        y: this.#mousePos.y,
      };
      this.#activeGUISprite.onMouseLeave(newEvent);
    }
    this.#activeGUISprite = null;
    this.#cvs.style.cursor = "default";
    // call all mouseleave listeners
    this.#eventHandlers.callAll(aEvent, ESpriteCanvasEventNames.MOUSELEAVE);
  }

  // ============================================================
  //  PUBLIC ATTRIBUTES (GETTERS / SETTERS)
  // ============================================================

  /**
   * @description Set the main draw function.
   * @param {function} aHandler - The function to call every frame.
   */
  set onDraw(aHandler) {
    // If they pass null/undefined, revert to dummy
    this.#FDraw = aHandler ? aHandler : this.#noOpDraw;
  }

  /**
   * @description Get the current main draw function.
   * @returns {function} The current draw function.
   */
  get onDraw() {
    //Only return if it's not the dummy
    return this.#FDraw !== this.#noOpDraw ? this.#FDraw : null;
  }

  /**
   * @description Enable or disable framerate display.
   * @param {boolean} aValue - True to show framerate, false to hide.
   */
  set showFramerate(aValue) {
    this.#FShowFramerate = aValue ? this.#boundDrawFramerate : this.#noOpShowFramerate;
  }

  /**
   * @description Check if framerate display is enabled.
   * @returns {boolean} True if framerate display is enabled, false otherwise.
   */
  get showFramerate() {
    return this.#FShowFramerate !== this.#noOpShowFramerate;
  }

  /**
   * @description Get the width of the canvas.
   * @returns {number} The width of the canvas in pixels.
   */
  get width() {
    return this.#cvs.width;
  }

  /**
   * @description Get the height of the canvas.
   * @returns {number} The height of the canvas in pixels.
   */
  get height() {
    return this.#cvs.height;
  }

  /**
   * @description Read only. Get the style object of the canvas.
   * @returns {CSSStyleDeclaration} The style object of the canvas.
   */
  get style() {
    return this.#cvs.style;
  }

  set style(_aStyle) {
    throw new Error("TSpriteCanvas.style is read-only.");
  }

  // ============================================================
  //  PUBLIC FUNCTIONS
  // ============================================================

  /**
   * @description Clear the entire canvas.
   */
  clearCanvas() {
    this.#ctx.clearRect(0, 0, this.#cvs.width, this.#cvs.height);
  }

  /**
   * @description Draw text on the canvas at the specified position.
   * @param {string} aText - The text to draw.
   * @param {TPoint} aPos - The position to draw the text at.
   */
  drawText(aText, aPos) {
    this.#ctx.font = "25px Arial";
    this.#ctx.fillStyle = "#333333";
    this.#ctx.textAlign = "right";
    this.#ctx.fillText(aText, aPos.x, aPos.y);
  }

  /**
   * @description Load a sprite image from the specified path.
   * @param {string} aPath - The path to the sprite image.
   * @param {function} aCallback - The callback function to be called once the image is loaded.
   * @returns {boolean} True if loading started successfully, false otherwise.
   */
  loadSpriteImage(aPath, aCallback) {
    if (this.#img !== null) return false;

    try {
      this.#img = new Image();
      this.#img.onload = aCallback;
      this.#img.src = aPath;
      return true;
    } catch (e) {
      console.error("Error loading sprite image:", e);
      return false;
    }
  }

  /**
   * @description Add a event listener by event name
   * @param {string} aEventName - The name of the event.
   * @param {function} aHandler - The handler function for the event.
   * @returns {boolean} True if the listener was added successfully, false otherwise.
   */
  addEventListener(aEventName, aHandler) {
    return this.#eventHandlers.addListener(aEventName, aHandler);
  }

  /**
   * @description Remove a event listener by event name, all listeners with the same name will be removed.
   * @param {string} aEventName - The name of the event.
   */
  removeEventListener(aEventName) {
    this.#eventHandlers.removeListener(aEventName);
  }

  /**
   * @description Draw a sprite on the canvas.
   * @param {object} aSprite - The sprite object containing drawing information.
   */
  drawSprite(aSprite) {
    const index = aSprite.index;
    const spi = aSprite.spi;
    const shape = aSprite.shape;
    const rot = aSprite.rotation;

    // Source rect
    const sx = spi.x + index * spi.width;
    const sy = spi.y;
    const sw = spi.width;
    const sh = spi.height;

    // Destination rect
    const dx = shape.x;
    const dy = shape.y;
    const dw = shape.width;
    const dh = shape.height;

    // Check for "Complex" drawing requirements
    // We need the slow path if:
    // 1. We are rotated
    // 2. We are flipped (negative width/height)
    const isRotated = rot !== 0;
    const isFlippedX = dw < 0;
    const isFlippedY = dh < 0;

    if (aSprite.alpha !== 1.0) {
      this.#ctx.globalAlpha = aSprite.alpha;
    }

    // --- FAST PATH (Standard Drawing) ---
    // No rotation, no flipping. Direct draw.
    if (!isRotated && !isFlippedX && !isFlippedY) {
      this.#ctx.drawImage(this.#img, sx, sy, sw, sh, dx, dy, dw, dh);
    }
    // --- COMPLEX PATH (Matrix Transformations) ---
    // Handles Rotation AND Flipping robustly
    else {
      const px = aSprite.pivot ? aSprite.pivot.x : aSprite.center.x;
      const py = aSprite.pivot ? aSprite.pivot.y : aSprite.center.y;

      this.#ctx.save();

      // 1. Move to Pivot
      this.#ctx.translate(px, py);

      // 2. Rotate
      if (isRotated) {
        this.#ctx.rotate(rot * DEG);
      }

      // 3. Scale (Flip)
      // This is the robust way to flip. We scale the coordinate system.
      const scaleX = isFlippedX ? -1 : 1;
      const scaleY = isFlippedY ? -1 : 1;
      if (isFlippedX || isFlippedY) {
        this.#ctx.scale(scaleX, scaleY);
      }

      // 4. Draw
      // We are now at the pivot (0,0) in a potentially rotated/flipped space.
      // We need to determine where the top-left corner is relative to the pivot.

      // Original distance from Pivot to Left/Top
      const distX = dx - px;
      const distY = dy - py;

      // If we flipped the axis (scale -1), a positive distance becomes negative visually.
      // We need to "undo" the flip for the position logic so the sprite stays in place.
      const drawX = distX * scaleX;
      const drawY = distY * scaleY;

      // Draw using absolute (positive) width/height, because the scale() handles the flip.
      this.#ctx.drawImage(this.#img, sx, sy, sw, sh, drawX, drawY, Math.abs(dw), Math.abs(dh));

      this.#ctx.restore();
    }

    this.#drawSpriteDebugInfo(aSprite);

    if (this.#ctx.globalAlpha !== 1.0) {
      this.#ctx.globalAlpha = 1.0;
    }

    if (aSprite.onCustomDraw) {
      aSprite.onCustomDraw(this.#ctx);
    }
  }

  addGUISprite(aGUISprite) {
    // Assure that the aGUISprite is a TSpriteButton instance
    if (!(aGUISprite instanceof TSpriteButton)) {
      console.error("addGUISprite: aGUISprite is not a TSpriteButton instance");
      return;
    }
    // Do not add duplicates
    if (this.#guiSprites.includes(aGUISprite)) {
      console.warn("addGUISprite: aGUISprite is already added");
      return;
    }
    this.#guiSprites.push(aGUISprite);
  }

  removeGUISprite(aGUISprite) {
    if (this.#activeGUISprite === aGUISprite) {
      this.#activeGUISprite = null;
      //Reset the cursor
      this.#cvs.style.cursor = "default";
    }
    this.#guiSprites = this.#guiSprites.filter((btn) => btn !== aGUISprite);
  }
}
