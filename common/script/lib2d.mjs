"use strict";

/**
 * @module lib2d
 * @description This module exports classes and constants for 2D graphics and mathematics.
 * @class TPoint, Represents a point in 2D space.
 * @class TPosition, Represents a position and size in 2D space.
 * @class TRect, Represents a rectangle shape.
 * @class TCircle, Represents a circle shape.
 * @class TEllipse, Represents an ellipse shape.
 */


export const DEG = Math.PI / 180;
export const RAD = 180 / Math.PI;
export { TPoint } from "./point2d.js";
export { TPosition, TRect, TCircle, TEllipse } from "./shape2d.js";
export { TSineWave } from "./sineWave.js";
