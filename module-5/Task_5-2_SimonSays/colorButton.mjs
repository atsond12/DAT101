"use strict";
import { TSpriteButton } from "libSprite";
import { gameProps, EGameStatusType, spawnSequence } from "./SimonSays.mjs";

export class TColorButton extends TSpriteButton {
  constructor(aSpriteCanvas, aSpriteInfo) {
    super(aSpriteCanvas, aSpriteInfo, aSpriteInfo.dst.x, aSpriteInfo.dst.y);
    this.sound = null;
  }

  // Using polymorphism to override isMouseOver for donut shape
  isMouseOver(aPoint) {
    // 1. First, use the base class method to check if inside bounding box
    let isInside = super.isMouseOver(aPoint);
    
    // 2. Then check if inside donut shape
    //If the mouse is inside, further check if it is outside radius 1 and inside radius 2
    if (isInside) {
      // The mouse is inside bounding box, now check the donut shape
      const dx = aPoint.x - gameProps.GameCenter.x;
      const dy = aPoint.y - gameProps.GameCenter.y;
      const dist = Math.hypot(dx, dy);
      // Compare distance with inner and outer radius, if it's less than r2 and greater than r1, it's inside
      isInside = dist >= this.spi.dst.r1 && dist <= this.spi.dst.r2;
    }
    // We can now just return the result
    return isInside;
  }

  // Using polymorphism to override onMouseDown for sound and index change
  onMouseDown() {
    // No need to call super method, we are handling everything here
    this.index = 1; // Set button to pressed state
    if (this.sound) {
      this.sound.play(); // Play the assigned sound
    }
  }

  // Using polymorphism to override onMouseLeave for sound stop
  onMouseLeave(aEvent) {
    // No need to call super method, we are handling everything here
    if (aEvent.buttons !== 0) {
      // If mouse button is still pressed, reset the button state, this is a cancel action!
      // The player probably regretted pressing this button, and we gratefully accept that!
      this.index = 0; // Reset button to unpressed state
      if (this.sound) {
        this.sound.stop(); // Stop the sound
      }
    }
  }

  // Using polymorphism to override onMouseUp for sound stop and game logic
  onMouseUp() {
    if (this.index !== 1) return; // If button is not pressed, do nothing
    this.index = 0; // Reset button to unpressed state
    if (this.sound) {
      this.sound.stop(); // Stop the sound
    }
    if (gameProps.Status !== EGameStatusType.Player) {
      return;
    }
    if (gameProps.activeButton === this) {
      console.log("Riktig knapp");
      // If we have more buttons in the sequence, select the next button as active!!!!
      if (gameProps.seqIndex < gameProps.sequence.length - 1) {
        gameProps.seqIndex++;
        gameProps.activeButton = gameProps.sequence[gameProps.seqIndex];
      } else {
        // Now we are on the last button in the sequence, and it's the computer's turn!
        gameProps.spnRound.value++;
        spawnSequence();
        console.log(gameProps.GameSpeed);
      }

    } else {
      // Oops, wrong button!
      console.log("Feil knapp");
      gameProps.Status = EGameStatusType.GameOver;
      gameProps.buttonStartEnd.index = 1;
      gameProps.buttonStartEnd.hidden = false;
    }
  }
} //End of TColorButton class
