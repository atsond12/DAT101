//use strict mode
"use strict";

/**
 * @module libSprite
 * @description This module provides classes and functions for sprite management in 2D games.
 * @class TSpriteCanvas, Is a canvas for rendering sprites.
 * @class TSprite, Represents a basic sprite with properties and methods for animation.
 * @class TSpriteButton, A clickable button sprite with interactive features.
 * @class TSpriteButtonHaptic, A button sprite with haptic feedback support.
 * @class TSpriteDraggable, A sprite that can be dragged around the canvas.
 * @class TSpriteNumber, A sprite for displaying numbers with various formatting options.
 * @enum ESpriteNumberJustifyType, Enumeration for text justification types in TSpriteNumber.
 */

export { TSpriteCanvas } from "./spriteCanvas.js";
export { TSprite } from "./sprite.js";
export { TSpriteButton, TSpriteButtonHaptic, TSpriteDraggable } from "./spriteButton.js";
export { TSpriteNumber, ESpriteNumberJustifyType } from "./spriteNumber.js";