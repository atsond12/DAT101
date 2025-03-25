"use strict";
/**
 * @library lib2d
 * @description A library for classes that manage 2D graphics.
 * @version 2.0
 * @exports EShapeType
 * @exports TPoint
 * @exports TPosition
 * @exports TShape
 * @exports TRectangle
 * @exports TCircle
 * @exports TSineWave
 */

class TPoint {
  x = 0;
  y = 0;
  constructor(aX, aY) {
    this.x = aX;
    this.y = aY;
  }
} // End of TPoint class

/* Example usages of the TPoint class */
const point1 = new TPoint(10, 20);
/* Alter the x-coordinate or y-coordinate */
point1.x = 50;
point1.y = 100;

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

class TMotionVector extends TPosition {
  constructor(aX, aY) {
    super(aX, aY);
  }

  // Calculate the direction from this point to another point
  calculateDirectionTo(aTargetPoint) {
    const dx = aTargetPoint.x - this.x;
    const dy = aTargetPoint.y - this.y;
    const magnitude = Math.hypot(dx, dy);
    this.x = dx / magnitude;
    this.y = dy / magnitude;
    return this;
  }

  // Calculate the movement based on a direction and speed
  calculateMovement(aDirectionVector, aSpeed) {
    this.x = aDirectionVector.x * aSpeed;
    this.y = aDirectionVector.y * aSpeed;
    const speedLimit = Math.hypot(this.x, this.y);
    if (speedLimit > aSpeed) {
      this.x *= aSpeed / speedLimit;
      this.y *= aSpeed / speedLimit;
    }
    return this;
  }
}

/* Example usages of the TPosition class */
const pos1 = new TMotionVector(10, 20);
const point = new TPoint(50, 100);
/* Calculate the distance between a position and a point */
const distance = pos1.distanceToPoint(point);
/* Clone the position object with the same x and y values */
const pos2 = pos1.clone();
/* change the x and y values of the cloned object */
pos2.x = 100;
pos2.y = 200;
/* Calculate the direction from the position to a point */
const direction = pos1.calculateDirectionTo(point);
/* 
  Calculate the movement based on a direction and speed.
  With the given speed, the x and y portion of the movement is calculated,
  so that the travel distance is equal to the speed.
  If the speed is greater than the distance between the position and the point,
  the x and y portion of the movement is equal to the distance between the position and the point.
*/
const speed = 10;
const movement = pos1.calculateMovement(speed);

const EShapeType = { Rectangle: 0, Circle: 1, Oval: 2 };
class TShape extends TPosition {
  #center;
  #type;
  #scale;
  constructor({ x, y }, aWidth, aHeight, aType) {
    super(x, y);
    //Do not create an instance of this abstract class
    if (this.constructor === TShape) throw new Error("Cannot create an instance of an abstract class");
    this.width = aWidth;
    this.height = aHeight;
    this.#type = aType;
    this.#center = new TPosition(x + aWidth / 2, y + aHeight / 2);
    this.#scale = 1;
    this.pivot = null; //The pivot point for rotation, if null, the center of the shape is used
  }

  get type() {
    return this.#type;
  }

  get center() {
    //Update the center position;
    this.#center.x = this.x + this.width / 2;
    this.#center.y = this.y + this.height / 2;
    return this.#center;
  }

  get scale() {
    return this.#scale;
  }

  set scale(aScale) {
    this.#scale = aScale;
    this.width *= aScale;
    this.height *= aScale;
  }

  clonePosition() {
    return super.clone();
  }

  clone() {
    return new this.constructor(this.clonePosition(), this.width, this.height);
  }

  isShapeInside(aShape) {
    switch (this.#type) {
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
    switch (this.#type) {
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
    return this.x;
  }

  get right() {
    return this.x + this.width;
  }

  get top() {
    return this.y;
  }

  get bottom() {
    return this.y + this.height;
  }
}

class TRectangle extends TShape {
  constructor(aPosition, aWidth, aHeight) {
    super(aPosition, aWidth, aHeight, EShapeType.Rectangle);
    this.width = aWidth;
    this.height = aHeight;
  }

  get path2D() {
    return new Path2D(`M ${this.x} ${this.y} h ${this.width} v ${this.height} h ${-this.width} Z`);
  }

  isOvalInside(aOval) {
    //Check if a oval with radius a and b is inside this rectangle
    const dx = this.center.x - aOval.center.x;
    const dy = this.center.y - aOval.center.y;
    return ((dx * dx) / aOval.radius.a) * aOval.radius.a + ((dy * dy) / aOval.radius.b) * aOval.radius.b < 1;
  }

  isCircleInside(aCircle) {
    // Check if a circle is inside this rectangle
    const dx = Math.abs(aCircle.center.x - this.center.x);
    const dy = Math.abs(aCircle.center.y - this.center.y);

    // Check if the circle is completely outside the rectangle
    if (dx > this.width / 2 + aCircle.radius || dy > this.height / 2 + aCircle.radius) {
      return false;
    }

    // Check if the circle is completely inside the rectangle
    if (dx <= this.width / 2 && dy <= this.height / 2) {
      return true;
    }

    // Check if the circle is intersecting the rectangle's corner
    const cornerDistanceSq = Math.pow(dx - this.width / 2, 2) + Math.pow(dy - this.height / 2, 2);
    return cornerDistanceSq <= Math.pow(aCircle.radius, 2);
  }

  isRectInside(aRect) {
    //Check if a rectangle is inside this rectangle
    if (this.left >= aRect.right) return false;
    if (this.right <= aRect.left) return false;
    if (this.top >= aRect.bottom) return false;
    if (this.bottom <= aRect.top) return false;
    return true;
  }

  isPositionInside(aPosition) {
    //Check if a position is inside this rectangle
    if (this.left >= aPosition.x) return false;
    if (this.right <= aPosition.x) return false;
    if (this.top >= aPosition.y) return false;
    if (this.bottom <= aPosition.y) return false;
    return true;
  }
} // End of TRectangle class

class TCircle extends TShape {
  constructor(aPosition, aWidth, aHeight) {
    super(aPosition, aWidth, aHeight, EShapeType.Circle);
    this.radius = Math.max(aWidth, aHeight) / 2; //The radius is the maximum of the width and height
  }

  get path2D() {
    return new Path2D(`M ${this.center.x} ${this.center.y} m ${-this.radius} 0 a ${this.radius} ${this.radius} 0 1 0 ${this.radius * 2} 0 a ${this.radius} ${this.radius} 0 1 0 ${-this.radius * 2} 0`);
  }

  isOvalInside(aOval) {
    //Check if a oval with radius a and b is inside this circle
    const dx = this.center.x - aOval.center.x;
    const dy = this.center.y - aOval.center.y;
    const distance = Math.hypot(dx, dy);
    return distance < this.radius + aOval.radius.a && distance < this.radius + aOval.radius.b;
  }

  isCircleInside(aCircle) {
    //Check if a circle is inside this circle
    const dx = this.center.x - aCircle.center.x;
    const dy = this.center.y - aCircle.center.y;
    const distance = Math.hypot(dx, dy);
    return distance < this.radius + aCircle.radius;
  }

  isRectInside(aRect) {
    //Check if a rectangle is inside this circle
    const dx = this.center.x - Math.max(aRect.left, Math.min(this.center.x, aRect.right));
    const dy = this.center.y - Math.max(aRect.top, Math.min(this.center.y, aRect.bottom));
    return dx * dx + dy * dy < this.radius * this.radius;
  }

  isPositionInside(aPosition) {
    //Check if a position is inside this circle
    const dx = this.center.x - aPosition.x;
    const dy = this.center.y - aPosition.y;
    const distance = Math.hypot(dx, dy);
    return distance < this.radius;
  }
}

class TOval extends TShape {
  constructor(aPosition, aWidth, aHeight) {
    super(aPosition, aWidth, aHeight, EShapeType.Oval);
    this.radius = { a: aWidth / 2, b: aHeight / 2 };
  }

  get path2D() {
    return new Path2D(`M ${this.center.x} ${this.center.y} m ${-this.radius.a} 0 a ${this.radius.a} ${this.radius.b} 0 1 0 ${this.radius.a * 2} 0 a ${this.radius.a} ${this.radius.b} 0 1 0 ${-this.radius.a * 2} 0`);
  }

  isOvalInside(aOval) {
    //Check if this oval is inside another oval with radius a and b
    const dx = this.center.x - aOval.center.x;
    const dy = this.center.y - aOval.center.y;
    const distance = Math.hypot(dx, dy);
    return distance < this.radius.a + aOval.radius.a && distance < this.radius.b + aOval.radius.b;
  }

  isCircleInside(aCircle) {
    //Check if a circle is inside this oval
    const dx = this.center.x - aCircle.center.x;
    const dy = this.center.y - aCircle.center.y;
    const distance = Math.hypot(dx, dy);
    return distance < this.radius.a + aCircle.radius && distance < this.radius.b + aCircle.radius;
  }

  isRectInside(aRect) {
    //Check if a rectangle is inside this oval
    const dx = this.center.x - Math.max(aRect.left, Math.min(this.center.x, aRect.right));
    const dy = this.center.y - Math.max(aRect.top, Math.min(this.center.y, aRect.bottom));
    return ((dx * dx) / this.radius.a) * this.radius.a + ((dy * dy) / this.radius.b) * this.radius.b < 1;
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
   * @enum EShapeType
   * @description An enumeration for the shape type.
   * @property {number} Rectangle - The rectangle shape.
   * @property {number} Circle - The circle shape.
   * @property {number} Oval - The oval shape.
   */
  EShapeType,

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
   * @class TMotionVector
   * @description A class representation for a motion vector in 2D.
   * @param {number} aX - The x-coordinate.
   * @param {number} aY - The y-coordinate.
   * @extends TPosition
   * @method calculateDirectionTo - A method to calculate the direction to another point.
   * @method calculateMovement - A method to calculate the movement based on a direction and speed.
   */
  TMotionVector,
  /**
   * @class TRectangle
   * @extends TShape
   * @description A class representation for a rectangle in 2D.
   * @param {object} aPosition - The position of the rectangle.
   * @param {number} aWidth - The width of the rectangle.
   * @param {number} aHeight - The height of the rectangle.
   * @method isCircleInside - A method to check if a circle is inside a rectangle.
   * @method isRectInside - A method to check if a rectangle is inside another rectangle.
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
   * @class TOval
   * @extends TShape
   * @description A class representation for an oval in 2D.
   * @param {object} aPosition - The position of the oval.
   * @param {number} aWidth - The width of the oval.
   * @param {number} aHeight - The height of the oval.
   * @property {object} radius - The radius a and b of the oval.
   * @method isOvalInside - A method to check if an oval is inside another oval.
   * @method isCircleInside - A method to check if a circle is inside an oval.
   * @method isRectInside - A method to check if a rectangle is inside an oval.
   * @method isPositionInside - A method to check if a position is inside an oval.
   */
  TOval,

  /**
   * @class TSineWave
   * @description A class representation for a sine wave.
   * @param {number} aAmplitude - The amplitude of the wave.
   * @param {number} aFrequency - The frequency of the wave.
   * @property {number} value - The next value of the wave.
   */
  TSineWave,
};
