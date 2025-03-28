"use strict";
/**
 * @fileoverview This module contains the math functions used in the game.
 * @module gameMath
 * @description This module contains the math functions used in the game.
 */

import lib2D from "../../common/libs/lib2d_v2.mjs";
import { GameProps } from "./BrickBreaker.mjs";

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
    if (this.#sprite.x + this.#sprite.width > shape.x && this.#sprite.x < shape.x + shape.width && this.#sprite.y + this.#sprite.height > shape.y && this.#sprite.y < shape.y + shape.height) {
      this.#sprite.y = shape.y - this.#sprite.height;
      const hitPosition = this.#sprite.x + this.#sprite.width / 2 - (shape.x + shape.width / 2);
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

  #collidedWithBrick(aBrick){
    if(aBrick == null) return false;
    const brickShape = aBrick.shape;
    const spriteShape = this.#sprite.shape;
    if(spriteShape.right < brickShape.left) return false; // No collision if the sprite is to the left of the brick
    if(spriteShape.left > brickShape.right) return false; // No collision if the sprite is to the right of the brick
    if(spriteShape.bottom < brickShape.top) return false; // No collision if the sprite is above the brick
    if(spriteShape.top > brickShape.bottom) return false; // No collision if the sprite is below the brick
    // Check for collision
    // check botom collition
    if(spriteShape.top < brickShape.bottom){
      this.#sprite.y = brickShape.bottom; // Move the sprite to the bottom of the brick
      this.#directionVector.y *= -1; // Reverse the y direction
    }
    // check top collition
    if(spriteShape.bottom > brickShape.top){
      this.#sprite.y = brickShape.top - spriteShape.height; // Move the sprite to the top of the brick
      this.#directionVector.y *= -1; // Reverse the y direction
    }
    // check left collition
    if(spriteShape.right > brickShape.left){
      this.#sprite.x = brickShape.left - spriteShape.width; // Move the sprite to the left of the brick
      this.#directionVector.x *= -1; // Reverse the x direction
    }
    // check right collition
    if(spriteShape.left < brickShape.right){
      this.#sprite.x = brickShape.right; // Move the sprite to the right of the brick
      this.#directionVector.x *= -1; // Reverse the x direction
    }
    // Calculate the new speed vector based on the new direction vector and speed
    // This is important to ensure the ball bounces off the brick at the correct angle and speed
    this.#speedVector.calculateMovement(this.#directionVector, this.#speed);
    return true; // Collision detected
  }


  #collidedWithBricks(aBrics) {
    let brickIndex = -1;
    aBrics.every((aBrick, aIndex) => {
      if (this.#collidedWithBrick(aBrick)) {
        // Remove the brick from the array if it is hit
        brickIndex = aIndex;
        return false; // Stop checking other bricks
      }
      return true; // Continue checking other bricks
    });
    return brickIndex !== -1; // Return true if any brick was hit  
  }

  update(aBounds, aHero, aBricks) {
    this.#sprite.x += this.#speedVector.x;
    this.#sprite.y += this.#speedVector.y;
    if (this.#collidedWithWall(aBounds)) {
      return;
    }

    if (this.#collidedWithHero(aHero)) {
      return;
    }

    if (this.#collidedWithBricks(aBricks)) {
      // Allert the game that a brick was hit!
      return;
    }
  }
}

export default TBallPhysics;
