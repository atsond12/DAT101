"use strict";
import lib2D from "../../common/libs/lib2d_v2.mjs";
import libSprite from "../../common/libs/libSprite_v2.mjs";
import { SpriteInfoList } from "./BrickBreaker.mjs";
import TBallPhysics from "./ballPhysics.mjs";
import { GameProps } from "./BrickBreaker.mjs";

export class TBall extends libSprite.TSprite {
  #physics;
  constructor(aSpriteCanvas) {
    const pos = new lib2D.TPoint(220, 620);
    // Vi oppretter en ny ball sprite av typen sirkel
    super(aSpriteCanvas, SpriteInfoList.Ball, pos, lib2D.TCircle);
    this.#physics = new TBallPhysics(this, new lib2D.TPoint(1, -1.24), 2.1);
  }

  update() {
    this.#physics.update(GameProps.bounds, GameProps.hero, GameProps.bricks);
  }
}
