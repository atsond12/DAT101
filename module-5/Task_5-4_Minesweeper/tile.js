"use strict";
import { TSpriteButton } from "libSprite";
import { TPoint } from "lib2d";
import { gameLevel } from "./Minesweeper.mjs";

let tiles = [];

export class TTile extends TSpriteButton{

    constructor(aSpcvs, aSPI){
        super(aSpcvs, aSPI, 20, 133);
    }

} // End of TTile

export function createTiles(){
  console.log(gameLevel);
}

export function drawTiles(){

}