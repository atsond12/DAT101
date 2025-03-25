"use strict";
/**
 * @fileoverview This module contains the math functions used in the game.
 * @module gameMath
 * @description This module contains the math functions used in the game.
 */

import lib2D from "../../common/libs/lib2d_v2.mjs";

class TBallPhysics {
  #sprite;
  #speedVector;
  #directionVector;
  #speed = 1.1;

  constructor(aSprite, aDirectionVector, aSpeed) {
    this.#sprite = aSprite;
    this.#directionVector = aDirectionVector;
    this.#speed = aSpeed;
    this.#speedVector = new lib2D.TMotionVector(0, 0);
    this.#speedVector.calculateMovement(this.#directionVector, this.#speed);
  }

  #collidedWithWall(aBounds) {
    if (this.#sprite.x < aBounds.left) {
      this.#sprite.x = aBounds.left;
      this.#directionVector.x *= -1;
      this.#speedVector.calculateMovement(this.#directionVector, this.#speed);
      return true;
    }
    if (this.#sprite.x + this.#sprite.width > aBounds.right) {
      this.#sprite.x = aBounds.right - this.#sprite.width;
      this.#directionVector.x *= -1;
      this.#speedVector.calculateMovement(this.#directionVector, this.#speed);
      return true;
    }
    if (this.#sprite.y < aBounds.top) {
      this.#sprite.y = aBounds.top;
      this.#directionVector.y *= -1;
      this.#speedVector.calculateMovement(this.#directionVector, this.#speed);
      return true;
    }
    if (this.#sprite.y + this.#sprite.height > aBounds.bottom) {
      this.#sprite.y = aBounds.bottom - this.#sprite.height;
      this.#directionVector.y *= -1;
      this.#speedVector.calculateMovement(this.#directionVector, this.#speed);
      return true;
    }
    return false;
  }

  #collidedWithHero(aHero) {
    const shape = aHero.shape;
    if (this.#sprite.x + this.#sprite.width > shape.x && this.#sprite.x < shape.x + shape.width &&
        this.#sprite.y + this.#sprite.height > shape.y && this.#sprite.y < shape.y + shape.height) {
      this.#sprite.y = shape.y - this.#sprite.height;
      const hitPosition = (this.#sprite.x + this.#sprite.width / 2) - (shape.x + shape.width / 2);
      const relativeHitPosition = hitPosition / (shape.width / 2);
      const maxBounceAngle = Math.PI / 3; // 60 degrees
      const bounceAngle = relativeHitPosition * maxBounceAngle;
      const speed = Math.hypot(this.#speedVector.x, this.#speedVector.y);
      this.#directionVector.x = speed * Math.sin(bounceAngle);
      this.#directionVector.y = -speed * Math.cos(bounceAngle);
      this.#speedVector.calculateMovement(this.#directionVector, this.#speed);
      return true;
    }
    return false;
  }


  update(aBounds, aHero, aBricks) {
    this.#sprite.x += this.#speedVector.x;
    this.#sprite.y += this.#speedVector.y;
    if(this.#collidedWithWall(aBounds)) {
      return;
    }

    if(this.#collidedWithHero(aHero)) {
      return;
    }

  }
}

export default TBallPhysics;
