"use strict";

/**
 * @description Class for 2D point
 * @class
 */
export class TPoint {
  /**
   * @description Creates a 2D point
   * @param {number} aX - The x coordinate of the point
   * @param {number} aY - The y coordinate of the point
   */
  constructor(aX, aY) {
    /** @member {number} x - The x coordinate of the point */
    this.x = aX;
    /** @member {number} y - The y coordinate of the point */
    this.y = aY;
  }
}
