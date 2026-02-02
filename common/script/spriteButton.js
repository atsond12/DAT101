import { TPoint } from "./point2d.js";
import { TSprite } from "./sprite.js";
import { TEventListenerList } from "./eventListener.js";

const ESpriteButtonEventNames = { CLICK: "click", MOUSEENTER: "mouseenter", MOUSELEAVE: "mouseleave",  MOUSEDOWN: "mousedown", MOUSEUP: "mouseup" };

export class TSpriteButton extends TSprite {
  // ============================================================
  //  PRIVATE ATTRIBUTES
  // ============================================================

  #eventHandlers;

  // ============================================================
  //  CONSTRUCTOR
  // ============================================================
  /**
   * @description Creates an instance of TSpriteButton. Override this class to create custom buttons.
   * @description Not necessary to override if shape is changed, just pass a different shape class in the constructor.
   * @param {TSpriteCanvas} aSpriteCanvas - The sprite canvas this button belongs to
   * @param {TSpriteInfo} aSpriteInfo - The sprite information object
   * @param {number} aX - The x position of the button
   * @param {number} aY - The y position of the button
   * @param {class} aShapeClass - Optional shape class for collision detection, defaults to TRectangle
  */
  constructor(aSpriteCanvas, aSpriteInfo, aX, aY, aShapeClass) {
    super(aSpriteCanvas, aSpriteInfo, aX, aY, aShapeClass);
    this.#eventHandlers = new TEventListenerList();
    this.spcvs.addGUISprite(this);
    this.disabled = false;
  }

  // ============================================================
  //  PRIVATE FUNCTIONS
  // ============================================================
  

  // ============================================================
  //  PUBLIC ATTRIBUTES (GETTERS / SETTERS)
  // ============================================================


  // ============================================================
  //  PUBLIC FUNCTIONS
  // ============================================================

  /**
   * @description Adds an event listener to the button
   * @param {string} aEventName - The name of the event
   * @param {function} aHandler - The event handler function
  */
  addEventListener(aEventName, aHandler) {
    this.#eventHandlers.addListener(aEventName, aHandler);
  }

  /**
   * @description Removes an event listener from the button
   * @param {string} aEventName - The name of the event
   * @param {function} aHandler - The event handler function
  */
  removeEventListener(aEventName, aHandler) {
    this.#eventHandlers.removeListener(aEventName, aHandler);
  }

  /**
   * 
  * @description Internal function called when the button is clicked. DO NOT CALL DIRECTLY.
   */
  onClick(aEvent) {
    aEvent.target = this;
    this.#eventHandlers.callAll(aEvent, ESpriteButtonEventNames.CLICK);
  }

  /**
   * @description Internal function called when the mouse button is pressed down on the button. DO NOT CALL DIRECTLY.
   */
  onMouseDown(aEvent) {
    aEvent.target = this;
    this.#eventHandlers.callAll(aEvent, ESpriteButtonEventNames.MOUSEDOWN);
  }
  
  /**
   * @description Internal function called when the mouse button is released on the button. DO NOT CALL DIRECTLY.
   */
  onMouseUp(aEvent) {
    aEvent.target = this;
    this.#eventHandlers.callAll(aEvent, ESpriteButtonEventNames.MOUSEUP);
  }

  /**
   * @description Internal function called when the mouse enters the button area. DO NOT CALL DIRECTLY.
   */
  onMouseEnter(aEvent) {
    this.spcvs.style.cursor = "pointer";
    aEvent.target = this;
    this.#eventHandlers.callAll(aEvent, ESpriteButtonEventNames.MOUSEENTER);
  }

  /**
   * @description Internal function called when the mouse leaves the button area. DO NOT CALL DIRECTLY.
   */
  onMouseLeave(aEvent) {
    this.spcvs.style.cursor = "default";
    aEvent.target = this;
    this.#eventHandlers.callAll(aEvent, ESpriteButtonEventNames.MOUSELEAVE);
  }

  /**
   * @description Checks if the mouse is over the button
   * @param {TPoint} aPos - The position of the mouse
   * @returns {boolean} True if the mouse is over the button, false otherwise
   */
  isMouseOver(aPos) {
    return this.checkCollision(aPos);
  }
}

/**
 * @description Extended TSpriteButton class with built-in haptic feedback support.
 * @description The sprite info for this button must have 4 frames:
 * 0 - Idle state
 * 1 - Hover state
 * 2 - Pressed state
 * 3 - Disabled state
 * @class TSpriteButtonHaptic
 * @extends TSpriteButton
 */
export class TSpriteButtonHaptic extends TSpriteButton {
  // ============================================================
  //  PRIVATE ATTRIBUTES
  // ============================================================
  #disabledState;

  // ============================================================
  //  CONSTRUCTOR
  // ============================================================
  /**
   * @description Creates an instance of TSpriteButtonHaptic.
   * @param {TSpriteCanvas} aSpriteCanvas - The sprite canvas this button belongs to
   * @param {TSpriteInfo} aSpriteInfo - The sprite information object
   * @param {number} aX - The x position of the button
   * @param {number} aY - The y position of the button
   * @param {class} aShapeClass - Optional shape class for collision detection
   */
  constructor(aSpriteCanvas, aSpriteInfo, aX, aY, aShapeClass) {
    // Parent expects (canvas, info, x, y, shapeClass)
    super(aSpriteCanvas, aSpriteInfo, aX, aY, aShapeClass);
    // Initialize private backing field. 
    // Note: Parent constructor sets 'this.disabled = false', which triggers our setter below.
    this.#disabledState = false;
  }

  // ============================================================
  //  PUBLIC ATTRIBUTES (GETTERS / SETTERS)
  // ============================================================

  /**
   * @description Gets the disabled state.
   * @returns {boolean} True if disabled.
   */
  get disabled() {
    return this.#disabledState;
  }

  /**
   * @description Sets the disabled state and updates the sprite index immediately.
   * @description This removes the need for conditional checks inside the draw loop.
   * @param {boolean} aValue - True to disable, false to enable.
   */
  set disabled(aValue) {
    this.#disabledState = aValue;
    if (this.#disabledState) {
      this.index = 3; // Disabled frame
      this.spcvs.style.cursor = "default"; // Ensure cursor resets if disabled while hovering
    } else {
      this.index = 0; // Reset to idle frame
    }
  }

  // ============================================================
  //  PUBLIC FUNCTIONS (EVENT OVERRIDES)
  // ============================================================

  /**
   * @description Overrides onMouseEnter to change sprite index to hover state.
   * @param {object} aEvent - The event object
   */
  onMouseEnter(aEvent) {
    if (this.#disabledState) return; // Do nothing if disabled
    super.onMouseEnter(aEvent);
    this.index = 1; // Hover frame
  }

  /**
   * @description Overrides onMouseLeave to change sprite index back to idle state.
   * @param {object} aEvent - The event object
   */
  onMouseLeave(aEvent) {
    if (this.#disabledState) return; // Do nothing if disabled
    super.onMouseLeave(aEvent);
    this.index = 0; // Idle frame
  }

  /**
   * @description Overrides onMouseDown to change sprite index to pressed state.
   * @param {object} aEvent - The event object
   */
  onMouseDown(aEvent) {
    if (this.#disabledState) return; // Do nothing if disabled
    super.onMouseDown(aEvent);
    this.index = 2; // Pressed frame
  }

  /**
   * @description Overrides onMouseUp to change sprite index back to hover state.
   * @param {object} aEvent - The event object
   */
  onMouseUp(aEvent) {
    if (this.#disabledState) return; // Do nothing if disabled
    super.onMouseUp(aEvent);
    this.index = 1; // Return to hover frame
  }
} // End of TSpriteButtonHaptic class


/**
 * @description Helper class to define snap positions.
 * @class TSnapTo
 */
export class TSnapTo {
  /**
   * @description Creates an instance of TSnapTo.
   * @param {Array<TPosition>} aPositions - Array of positions to snap to.
   * @param {number} aDistance - The distance threshold for snapping.
   */
  constructor(aPositions, aDistance) {
    // Copy the array to avoid external modifications
    this.points = aPositions.slice();
    this.distance = aDistance;
    this.lastSnapIndex = -1;
    this.lastSnapPosition = null;
  }

  /**
   * @description Checks if the given position is within snapping distance of any target point.
   * @param {TPosition} aPos - The current position to check.
   * @returns {TPosition|null} The snapped position if found, otherwise null.
   */
  doSnap(aPos) {
    const distSqLimit = this.distance ** 2;

    // Use a standard loop to allow early return
    for (let i = 0; i < this.points.length; i++) {
      const targetPt = this.points[i];
      const dx = aPos.x - targetPt.x;
      const dy = aPos.y - targetPt.y;
      const distSq = dx * dx + dy * dy;

      if (distSq <= distSqLimit) {
        this.lastSnapPosition = targetPt;
        this.lastSnapIndex = i;
        return targetPt;
      }
    }

    this.lastSnapPosition = null;
    this.lastSnapIndex = -1;
    return null;
  }
}

/**
 * @description Class for a draggable sprite button.
 * @class TSpriteDraggable
 * @extends TSpriteButton
 */
export class TSpriteDraggable extends TSpriteButton {
  #offset;
  #startDragPos;
  #canDrop;
  #dropPos;

  /**
   * @description Creates an instance of TSpriteDraggable.
   * @param {TSpriteCanvas} aSpriteCanvas - The canvas this sprite belongs to.
   * @param {TSpriteInfo} aSpriteInfo - The sprite information object.
   * @param {number} aX - The x position.
   * @param {number} aY - The y position.
   * @param {class} aShapeClass - Optional shape class.
   */
  constructor(aSpriteCanvas, aSpriteInfo, aX, aY, aShapeClass) {
    super(aSpriteCanvas, aSpriteInfo, aX, aY, aShapeClass);
    this.#offset = null; // null indicates not dragging
    this.canDrag = true;
    this.#canDrop = true;
    this.snapTo = null; // Instance of TSnapTo
    this.#dropPos = null;
    
    // Delegates for user callbacks
    this.onDrop = null;
    this.onCancelDrop = null;
    this.onCanDrop = null;
  }

  /**
   * @description Checks if the sprite is currently being dragged.
   * @returns {boolean} True if dragging.
   */
  get isDragging() {
    return this.#offset !== null;
  }

  onMouseEnter(aEvent) {
    // Override parent behavior
    this.spcvs.style.cursor = "grab";
    super.onMouseEnter(aEvent); // Call parent to handle visual states (index) if needed
  }

  onMouseLeave(aEvent) {
    this.spcvs.style.cursor = "default";
    super.onMouseLeave(aEvent);
  }

  onMouseDown(aEvent) {
    if (this.canDrag === false) return;

    super.onMouseDown(aEvent); // Call parent to handle click visuals

    if (!this.#offset) {
      // Store initial position for cancelling
      this.#startDragPos = new TPosition(this.x, this.y);
      
      // Calculate offset: Sprite Position - Mouse Position
      // Use aEvent properties as they are normalized by TSpriteCanvas
      this.#offset = new TPosition(this.x - aEvent.x, this.y - aEvent.y);
    }
    this.spcvs.style.cursor = "grabbing";
  }

  onMouseUp(aEvent) {
    super.onMouseUp(aEvent); // Call parent to reset visual state

    // If drag was not successful (forbidden drop)
    if (this.#canDrop === false) {
      // Reset position to start
      this.x = this.#startDragPos.x;
      this.y = this.#startDragPos.y;

      if (this.onCancelDrop) {
        this.onCancelDrop();
      }
      this.spcvs.style.cursor = "default";
    } else {
      // Drop was successful
      if (this.onDrop) {
        // Pass the drop position (snapped or raw)
        this.onDrop(this.#dropPos || new TPosition(this.x, this.y));
      }
      this.spcvs.style.cursor = "grab";
    }

    this.#offset = null;
    this.#startDragPos = null;
    this.#dropPos = null;
  }

  /**
   * @description Internal function called by TSpriteCanvas during mouse move if dragging.
   * @param {TPoint} aMousePos - The current mouse position.
   */
  onDrag(aMousePos) {
    if (this.#offset === null) return;

    // 1. Update Position based on mouse + offset
    let newX = aMousePos.x + this.#offset.x;
    let newY = aMousePos.y + this.#offset.y;

    // 2. Check for Snapping
    if (this.snapTo) {
      // Create a temporary point to check against snap targets
      // We check where the sprite *would* be
      const potentialPos = { x: newX, y: newY }; 
      const snappedPos = this.snapTo.doSnap(potentialPos);

      if (snappedPos) {
        newX = snappedPos.x;
        newY = snappedPos.y;
        this.#dropPos = snappedPos;
        // If we snapped, we implicitly allow the drop there (unless specific logic says otherwise)
        this.#canDrop = true; 
      } else {
        this.#dropPos = null;
      }
    }

    // Apply the position
    this.x = newX;
    this.y = newY;

    // 3. Validate Drop
    // Note: lastCollisionSprite is the correct property name from sprite.js
    let collisionFree = (this.lastCollisionSprite === null);
    
    // If user provided a custom validator, use it, otherwise default to true
    if (this.onCanDrop) {
      this.#canDrop = this.onCanDrop(new TPosition(this.x, this.y));
    } else {
      // Default behavior: drop is valid if no collision
      // (You might want to remove the collision check if overlapping is allowed)
      this.#canDrop = true; 
    }

    // 4. Update Cursor Feedback
    if (this.#canDrop === false) {
      this.spcvs.style.cursor = "not-allowed";
    } else {
      this.spcvs.style.cursor = "grabbing";
    }
  }
}
