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

  #collidedWithBrickUsingDelta(aBrick) {
    const deltaX = this.#sprite.x - aBrick.x;
    const deltaY = this.#sprite.y - aBrick.y;
    const deltaWidth = this.#sprite.width + aBrick.width;
    const deltaHeight = this.#sprite.height + aBrick.height;
    if(deltaX < 0 || deltaY < 0 || deltaX > deltaWidth || deltaY > deltaHeight) {
      return false; // Ingen kollisjon
    }

  }

  #collidedWithBrick(aBrick) {
    //Tester om ballen er helt til venstre for mursteinen
    if (this.#sprite.right < aBrick.left) return false; //Kan ikke treffe!
    //Tester om ballen er helt til høyre for mursteinen
    if (this.#sprite.left > aBrick.right) return false; //Kan ikke treffe!
    //Tester om ballen er helt under mursteinen
    if (this.#sprite.top > aBrick.bottom) return false; //Kan ikke treffe!
    //Tester om ballen er helt over mursteinen
    if (this.#sprite.bottom < aBrick.top) return false; //Kan ikke treffe!

    //Hvor har ballen truffet mursteinen?
    //har ballen truffet bunnen av mursteinen?
    if (this.#sprite.top < aBrick.bottom && this.#sprite.bottom > aBrick.bottom) {
      this.#sprite.y = aBrick.bottom;
      this.#directionVector.y *= -1;
    } else if (this.#sprite.bottom > aBrick.top && this.#sprite.top < aBrick.top) {
      //Ballen her truffet toppen av mursteinen!
      this.#sprite.y = aBrick.top - this.#sprite.height;
      this.#directionVector.y *= -1;
    } else if (this.#sprite.left < aBrick.right && this.#sprite.right > aBrick.right) {
      //Ballen har truffet høyre siden av mursteinen!
      this.#sprite.x = aBrick.right;
      this.#directionVector.x *= -1;
    } else if (this.#sprite.right > aBrick.left && this.#sprite.left < aBrick.left) {
      //Ballen har truffet venstre siden av mursteinen!
      this.#sprite.x = aBrick.left - this.#sprite.width;
      this.#directionVector.x *= -1;
    }

    this.#speedVector.calculateMovement(this.#directionVector, this.#speed);
    return true; //Ballen treffer mursteinen
  }

  #collidedWithBricks(aBricks) {
    for (let i = 0; i < aBricks.length; i++) {
      const brick = aBricks[i];
      let hasCollided = this.#collidedWithBrick(brick);
      if (hasCollided) {
        console.log("Ballen traff mursteinen nummer " + i); 
        return i; // Returnerer indeksen til mursteinen som ble truffet
      }
    }
    return -1; // Ingen kollisjon med mursteinene
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
    let brickIndex = this.#collidedWithBricks(aBricks);
    if (brickIndex >= 0) {
      const brick = aBricks[brickIndex];
      brick.reduceLife();
      return;
    }
  }
}

export default TBallPhysics;
