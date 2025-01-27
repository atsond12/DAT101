"use strict";
/**
 * @library lib2d
 * @description A library for classes that manage 2D graphics.
 */

class TPoint {
  x = 0;
  y = 0;
  constructor(aX, aY) {
    this.x = aX;
    this.y = aY;
  }
} // End of TPoint class

class TPosition extends TPoint {
  constructor(aX, aY) {
    super(aX, aY);
  }

  clone() {
    return new TPosition(this.x, this.y);
  }

  distanceToPoint(aPoint) {
    const dx = this.x - aPoint.x;
    const dy = this.y - aPoint.y;
    return Math.hypot(dx, dy);
  }
} // End of TPosition class

const EShapeType = { Rectangle: 0, Circle: 1, Oval: 2 };
class TShape {
  #center;
  constructor(aPosition, aWidth, aHeight, aType) {
    //Do not create an instance of this abstract class
    if (this.constructor === TShape) throw new Error("Cannot create an instance of an abstract class");
    this.pos = aPosition;
    this.width = aWidth;
    this.height = aHeight;
    this.type = aType;
    this.#center = new TPosition(aPosition.x + aWidth / 2, aPosition.y + aHeight / 2);
  }

  get center() {
    //Update the center position;
    this.#center.x = this.pos.x + this.width / 2;
    this.#center.y = this.pos.y + this.height / 2;
    return this.#center;
  }

  isShapeInside(aShape) {
    switch (this.type) {
      case EShapeType.Rectangle:
        switch (aShape.type) {
          case EShapeType.Rectangle:
            return this.isRectInside(aShape);
          case EShapeType.Circle:
            return this.isCircleInside(aShape);
          default:
            return false;
        }
      case EShapeType.Circle:
        switch (aShape.type) {
          case EShapeType.Rectangle:
            return aShape.isCircleInside(this);
          case EShapeType.Circle:
            return this.isCircleInside(aShape);
          default:
            return false;
        }
      default:
        return false;
    }
  }

  isPositionInside(aPosition) {
    switch (this.type) {
      case EShapeType.Rectangle:
        if (this.left >= aPosition.x) return false;
        if (this.right <= aPosition.x) return false;
        if (this.top >= aPosition.y) return false;
        if (this.bottom <= aPosition.y) return false;
        return true;
      case EShapeType.Circle:
        const dx = this.#center.x - aPosition.x;
        const dy = this.#center.y - aPosition.y;
        const distance = Math.hypot(dx, dy);
        return distance < this.radius;
      default:
        return false;
    }
  }

  get left() {
    return this.pos.x;
  }

  get right() {
    return this.pos.x + this.width;
  }

  get top() {
    return this.pos.y;
  }

  get bottom() {
    return this.pos.y + this.height;
  }
}

class TRectangle extends TShape {
  constructor(aPosition, aWidth, aHeight) {
    super(aPosition, aWidth, aHeight, EShapeType.Rectangle);
    this.width = aWidth;
    this.height = aHeight;
  }

  isRectInside(aRect) {
    if (this.left >= aRect.right) return false;
    if (this.right <= aRect.left) return false;
    if (this.top >= aRect.bottom) return false;
    if (this.bottom <= aRect.top) return false;
    return true;
  }

  isCircleInside(aCircle) {
    const dx = this.center.x - aCircle.center.x;
    const dy = this.center.y - aCircle.center.y;
    const distance = Math.hypot(dx, dy);
    return distance < this.radius + aCircle.radius;
  }

  isPositionInside(aPosition) {
    if (this.left >= aPosition.x) return false;
    if (this.right <= aPosition.x) return false;
    if (this.top >= aPosition.y) return false;
    if (this.bottom <= aPosition.y) return false;
    return true;
  }
} // End of TRectangle class

class TCircle extends TShape {
  constructor(aPosition, aRadius) {
    super(aPosition, aRadius, aRadius, EShapeType.Circle);
    this.radius = aRadius;
  }

  isCircleInside(aCircle) {
    const dx = this.center.x - aCircle.center.x;
    const dy = this.center.y - aCircle.center.y;
    const distance = Math.hypot(dx, dy);
    return distance < this.radius + aCircle.radius;
  }

  isRectInside(aRect) {
    const dx = this.center.x - Math.max(aRect.left, Math.min(this.center.x, aRect.right));
    const dy = this.center.y - Math.max(aRect.top, Math.min(this.center.y, aRect.bottom));
    return dx * dx + dy * dy < this.radius * this.radius;
  }

  isPositionInside(aPosition) {
    const dx = this.center.x - aPosition.x;
    const dy = this.center.y - aPosition.y;
    const distance = Math.hypot(dx, dy);
    return distance < this.radius;
  }
}

const RAD = Math.PI / 180;

class TSineWave {
  #amplitude;
  #frequency;
  #angle;
  constructor(aAmplitude, aFrequency) {
    this.#amplitude = aAmplitude;
    this.#frequency = aFrequency;
    this.#angle = 0;
  }

  get value() {
    let value = this.#amplitude * Math.sin(this.#angle * RAD);
    this.#angle += this.#frequency;
    return value;
  }
} // end of TSineWave class

export default {
  /**
   * @class TPoint
   * @description A class representation for x and y point in 2D.
   * @param {number} aX - The x-coordinate.
   * @param {number} aY - The y-coordinate.
   */
  TPoint,
  /**
   * @class TPosition
   * @description A position class for manipulation of point in 2D.
   * @param {number} aX - The x-coordinate.
   * @param {number} aY - The y-coordinate.
   * @extends TPoint
   * @method clone - A method to clone the position object.
   * @method distanceToPoint - A method to calculate the distance to another point.
   */
  TPosition,
  /**
   * @class TShape
   * @description An abstract class representation for a shape in 2D.
   * @param {object} aPosition - The position of the shape.
   * @param {number} aWidth - The width of the shape.
   * @param {number} aHeight - The height of the shape.
   * @param {number} aType - The type of the shape. 
   * @method isShapeInside - A method to check if a shape is inside another shape.
   * @method isPositionInside - A method to check if a position is inside a shape.
  TShape,

  /**
   * @class TRectangle
   * @extends TShape
   * @description A class representation for a rectangle in 2D.
   * @param {object} aPosition - The position of the rectangle.
   * @param {number} aWidth - The width of the rectangle.
   * @param {number} aHeight - The height of the rectangle.
   * @method isRectInside - A method to check if a rectangle is inside another rectangle.
   * @method isCircleInside - A method to check if a circle is inside a rectangle.
   * @method isPositionInside - A method to check if a position is inside a rectangle.
   */
  TRectangle,
  /**
   * @class TCircle
   * @extends TShape
   * @description A class representation for a circle in 2D.
   * @param {object} aPosition - The position of the circle.
   * @param {number} aRadius - The radius of the circle.
   * @property {number} radius - The radius of the circle.
   * @method isCircleInside - A method to check if a circle is inside another circle.
   * @method isRectInside - A method to check if a rectangle is inside a circle.
   * @method isPositionInside - A method to check if a position is inside a circle.
   */

  TCircle,

  /**
   * @class TSineWave
   * @description A class representation for a sine wave.
   * @param {number} aAmplitude - The amplitude of the wave.
   * @param {number} aFrequency - The frequency of the wave.
   * @property {number} value - The next value of the wave.
   */
  TSineWave,
};
