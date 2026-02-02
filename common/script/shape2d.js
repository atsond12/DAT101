"use strict";
import { TPoint } from "./point2d.js";

/**
 * @description Enum for 2D shape types
 * @readonly
 * @enum {number}
 */
export const E2DShapeType = { POINT: 0, RECT: 1, CIRCLE: 2, ELLIPSE: 3 };

/**
 * @description Abstract class for 2D shapes
 * @abstract
 * @class
 */
class T2DShape extends TPoint {
  //Abstract class!
  constructor(aType, aX, aY) {
    if (new.target === T2DShape) throw new TypeError("Cannot create an instance of abstract class T2DShape.");
    super(aX, aY);
    this.type = aType;
  }

  clone() {} //Abstract method
  overlaps(_aShape) {} //Abstract method
  distanceToPoint(_aPoint) {} //Abstract method
}

/**
 * @description Class for 2D point shape
 * @class
 * @extends T2DShape
 */
export class TPosition extends T2DShape {
  constructor(aX, aY) {
    super(E2DShapeType.POINT, aX, aY);
  }

  /**
   * @description Get the center point of the position
   * @returns {TPosition} The center point (same as the position itself)
   */
  get center() {
    return this;
  }

  /**
   * @description Creates a clone of the point
   * @returns {TPosition} A new TPosition instance with the same coordinates
   */
  clone() {
    return new TPosition(this.x, this.y);
  }

  /**
   * @description Calculate the distance from this point to another shape
   * @param {TPoint} aPoint - The point to calculate the distance to
   * @returns {number} The distance between this point and the given point
   */
  distanceToPoint(aPoint) {
    return Math.hypot(this.x - aPoint.x, this.y - aPoint.y);
  }

  /**
   * @description Check if this point overlaps with another shape
   * @param {T2DShape} aShape - The shape to check for overlap
   * @returns {boolean} True if the shapes overlap, false otherwise
   */
  overlaps(aShape) {
    switch (aShape.type) {
      case E2DShapeType.POINT:
        return this.x === aShape.x && this.y === aShape.y;
      case E2DShapeType.RECT:
      case E2DShapeType.CIRCLE:
      case E2DShapeType.ELLIPSE:
        return aShape.overlaps(this); // Delegate to the other shape
      default:
        if (aShape.x !== undefined && aShape.y !== undefined) {
          return this.x === aShape.x && this.y === aShape.y;
        }
        throw new TypeError("Shape type not implemented.");
    }
  }
}

/**
 * @description Class for 2D rectangle shape
 * @class
 * @extends T2DShape
 */
export class TRect extends T2DShape {
  #center;
  /**
   * @description Creates a rectangle shape
   * @param {number} aX - The x coordinate of the top-left corner of the rectangle
   * @param {number} aY - The y coordinate of the top-left corner of the rectangle
   * @param {number} aWidth - The width of the rectangle
   * @param {number} aHeight - The height of the rectangle
   */
  constructor(aX, aY, aWidth, aHeight) {
    super(E2DShapeType.RECT, aX, aY);
    this.width = aWidth;
    this.height = aHeight;
    this.#center = new TPosition(this.x + this.width / 2, this.y + this.height / 2);
  }

  /**
   * @description Get the left edge of the rectangle
   * @returns {number} The x coordinate of the left edge of the rectangle
   */
  get left() {
    return this.x;
  }

  /**
   * @description Get the right edge of the rectangle
   * @returns {number} The x coordinate of the right edge of the rectangle
   */
  get right() {
    return this.x + this.width;
  }

  /**
   * @description Get the top edge of the rectangle
   * @returns {number} The y coordinate of the top edge of the rectangle
   */
  get top() {
    return this.y;
  }

  /**
   * @description Get the bottom edge of the rectangle
   * @returns {number} The y coordinate of the bottom edge of the rectangle
   */
  get bottom() {
    return this.y + this.height;
  }

  /**
   * @description Get the center point of the rectangle
   * @returns {TPosition} The center point of the rectangle
   */
  get center() {
    this.#center.x = this.x + this.width / 2;
    this.#center.y = this.y + this.height / 2;
    return this.#center;
  }

  /**
   * @description Creates a clone of the rectangle
   * @returns {TRect} A new TRect instance with the same position and dimensions
   */
  clone() {
    return new TRect(this.x, this.y, this.width, this.height);
  }

  /**
   * @description Check if this rectangle overlaps with another shape
   * @param {T2DShape} aShape - The shape to check for overlap
   * @returns {boolean} True if the shapes overlap, false otherwise
   */
  overlaps(aShape) {
    // Prevent recursion
    if (this === aShape) return true;

    switch (aShape.type) {
      case E2DShapeType.RECT:
        if (aShape.left > this.right) return false;
        if (aShape.top > this.bottom) return false;
        if (aShape.right < this.left) return false;
        if (aShape.bottom < this.top) return false;
        return true;
      case E2DShapeType.CIRCLE:
        // Find the closest point on the rectangle to the circle center
        let closestX = Math.max(this.left, Math.min(aShape.center.x, this.right));
        let closestY = Math.max(this.top, Math.min(aShape.center.y, this.bottom));
        // Calculate distance from closest point to circle center
        let distX = aShape.center.x - closestX;
        let distY = aShape.center.y - closestY;
        return (distX * distX + distY * distY) < (aShape.radius * aShape.radius);
      case E2DShapeType.ELLIPSE:
        // Approximate using bounding box check first
        if (aShape.center.x - aShape.radiusX > this.right) return false;
        if (aShape.center.y - aShape.radiusY > this.bottom) return false;
        if (aShape.center.x + aShape.radiusX < this.left) return false;
        if (aShape.center.y + aShape.radiusY < this.top) return false;
        // More precise check: find closest point and check if inside ellipse
        let cx = Math.max(this.left, Math.min(aShape.center.x, this.right));
        let cy = Math.max(this.top, Math.min(aShape.center.y, this.bottom));
        let dx = (cx - aShape.center.x) / aShape.radiusX;
        let dy = (cy - aShape.center.y) / aShape.radiusY;
        return (dx * dx + dy * dy) <= 1;
      default:
        // Handle Points (generic objects with x, y)
        if (aShape.x !== undefined && aShape.y !== undefined) {
          if (aShape.x < this.left) return false;
          if (aShape.x > this.right) return false;
          if (aShape.y < this.top) return false;
          if (aShape.y > this.bottom) return false;
          return true;
        }
        throw new TypeError("Shape type not implemented.");
    }
  }

  /**
   * @description Calculate the distance from this rectangle to a point
   * @param {TPoint} aPoint - The point to calculate the distance to
   * @returns {number} The distance between the rectangle and the point
   */
  distanceToPoint(aPoint) {
    let dx = Math.max(this.left - aPoint.x, 0, aPoint.x - this.right); // dx is the distance between the left edge of the rectangle and the x coordinate of the point
    let dy = Math.max(this.top - aPoint.y, 0, aPoint.y - this.bottom); // dy is the distance between the top edge of the rectangle and the y coordinate of the point
    return Math.hypot(dx, dy); // returns the hypotenuse of the triangle formed by dx and dy
  }

  /**
   * @description Get the Path2D representation of the rectangle
   * @returns {Path2D} The Path2D representation of the rectangle
   */
  get path2D() {
    return new Path2D(`M ${this.x} ${this.y} h ${this.width} v ${this.height} h ${-this.width} Z`);
  }
}

/**
 * @description Class for 2D circle shape
 * @class
 * @extends T2DShape
 */
export class TCircle extends T2DShape {
    #center;
  /**
   * @description Creates a circle shape
   * @param {number} aX - The x coordinate of the top-left corner of the bounding box
   * @param {number} aY - The y coordinate of the top-left corner of the bounding box
   * @param {number} aRadius - The radius of the circle
   */
  constructor(aX, aY, aRadius) {
    super(E2DShapeType.CIRCLE, aX, aY);
    this.radius = aRadius;
    this.#center = new TPosition(this.x + this.radius, this.y + this.radius);
  }

  get width() {
    return this.radius * 2;
  }
  
  get height() {
    return this.radius * 2;
  }

  get left() {
    return this.x;
  }

  get right() {
    return this.x + this.width;
  }

  /**
   * @description Get the center point of the circle
   * @returns {TPosition} The center point of the circle
  */
  get center() {
    this.#center.x = this.x + this.radius;
    this.#center.y = this.y + this.radius;
    return this.#center;  
  }
    

  /**
   * @description Creates a clone of the circle
   * @returns {TCircle} A new TCircle instance with the same center and radius
   */
  clone() {
    return new TCircle(this.x, this.y, this.radius);
  }

  /**
   * @description Check if this circle overlaps with another shape
   * @param {T2DShape} aShape - The shape to check for overlap
   * @returns {boolean} True if the shapes overlap, false otherwise
   */
  overlaps(aShape) {
    switch (aShape.type) {
      case E2DShapeType.RECT:
        return aShape.overlaps(this);
      case E2DShapeType.CIRCLE:
        return this.distanceToPoint(aShape.center) <= aShape.radius;
      case E2DShapeType.ELLIPSE:
        return aShape.overlaps(this);
      case E2DShapeType.POINT:
        return this.distanceToPoint(aShape) <= 0;
      default:
        if (aShape.x !== undefined && aShape.y !== undefined) {
          return this.distanceToPoint(aShape) <= 0;
        }
        throw new TypeError("Shape type not implemented.");
    }
  }

  /**
   * @description Calculate the distance from this circle to a point
   * @param {TPoint} aPoint - The point to calculate the distance to
   * @returns {number} The distance between the circle and the point
   */
  distanceToPoint(aPoint) {
    return Math.max(0, Math.hypot(this.center.x - aPoint.x, this.center.y - aPoint.y) - this.radius);
  }

  /**
   * @description Get the Path2D representation of the circle
   * @returns {Path2D} The Path2D representation of the circle
   */
  get path2D() {
    return new Path2D(`M ${this.center.x} ${this.center.y} m ${-this.radius} 0 a ${this.radius} ${this.radius} 0 1 0 ${this.radius * 2} 0 a ${this.radius} ${this.radius} 0 1 0 ${-this.radius * 2} 0`);
  }
}

/**
 * @description Class for 2D ellipse shape
 * @class
 * @extends T2DShape
 */
export class TEllipse extends T2DShape {
  #center;
  /**
   * @description Creates an ellipse shape
   * @param {number} aX - The x coordinate of the top-left corner of the bounding box
   * @param {number} aY - The y coordinate of the top-left corner of the bounding box
   * @param {number} aRadiusX - The radius of the ellipse along the x axis
   * @param {number} aRadiusY - The radius of the ellipse along the y axis
   */
  constructor(aX, aY, aRadiusX, aRadiusY) {
    super(E2DShapeType.ELLIPSE, aX, aY);
    this.radiusX = aRadiusX;
    this.radiusY = aRadiusY;
    this.#center = new TPosition(this.x + this.radiusX, this.y + this.radiusY);
  }

  /**
   * @description Get the center point of the ellipse
   * @returns {TPosition} The center point of the ellipse
   */
  get center() {
    this.#center.x = this.x + this.radiusX;
    this.#center.y = this.y + this.radiusY;
    return this.#center;
  }

  get width() {
    return this.radiusX * 2;
  }
  
  get height() {
    return this.radiusY * 2;
  }

  get left() {
    return this.x;
  }

  get right() {
    return this.x + this.width;
  }

  /**
   * @description Creates a clone of the ellipse
   * @returns {TEllipse} A new TEllipse instance with the same center and radii
   */
  clone() {
    return new TEllipse(this.x, this.y, this.radiusX, this.radiusY);
  }

  /**
   * @description Check if this ellipse overlaps with another shape
   * @param {T2DShape} aShape - The shape to check for overlap
   * @returns {boolean} True if the shapes overlap, false otherwise
   */
  overlaps(aShape) {
    switch (aShape.type) {
      case E2DShapeType.RECT:
      case E2DShapeType.CIRCLE:
        return aShape.overlaps(this);
      case E2DShapeType.ELLIPSE:
        return this.distanceToPoint(aShape.center) <= aShape.radiusX || this.distanceToPoint(aShape.center) <= aShape.radiusY;
      default:
        // Handle Points (generic objects with x, y)
        if (aShape.x !== undefined && aShape.y !== undefined) {
          return this.distanceToPoint(aShape) <= 0;
        }
        throw new TypeError("Shape type not implemented.");
    }
  }

  /**
   * @description Calculate the distance from this ellipse to a point
   * @param {TPoint} aPoint - The point to calculate the distance to
   * @returns {number} The distance between the ellipse and the point
   */
  distanceToPoint(aPoint) {
    let dx = Math.max(0, Math.abs(this.center.x - aPoint.x) - this.radiusX);
    let dy = Math.max(0, Math.abs(this.center.y - aPoint.y) - this.radiusY);
    return Math.hypot(dx, dy);
  }

  /**
   * @description Get the Path2D representation of the ellipse
   * @returns {Path2D} The Path2D representation of the ellipse
   */
  get path2D() {
    return new Path2D(`M ${this.center.x} ${this.center.y} m ${-this.radiusX} 0 a ${this.radiusX} ${this.radiusY} 0 1 0 ${this.radiusX * 2} 0 a ${this.radiusX} ${this.radiusY} 0 1 0 ${-this.radiusX * 2} 0`);
  }
}
