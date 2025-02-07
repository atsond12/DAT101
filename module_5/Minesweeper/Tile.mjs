"use strict";
import libSprite from "../../common/libs/libSprite_v2.mjs";
import lib2d from "../../common/libs/lib2d_v2.mjs"
import { gameProps } from "./Minesweeper.mjs";

class TCell{
  constructor(aRow, aColumn){
    this.row = aRow;
    this.col = aColumn; 
  }
}

export class TTile extends libSprite.TSpriteButton {
  #isMine;

  constructor(aSpriteCanvas, aSpriteInfo, aRow, aColumn) {
    const cell = new TCell(aRow, aColumn);
    const pos = new lib2d.TPoint(21,133);
    pos.x += aSpriteInfo.width * cell.col;
    pos.y += aSpriteInfo.height * cell.row;
    super(aSpriteCanvas, aSpriteInfo, pos);
    this.#isMine = false; //Vi setter at det ikke er en mine som default
  }

  onMouseDown(aEvent){
    this.index = 1;
  }

  onMouseUp(aEvent){
    this.index = 2;
    this.disable = true;
  }

  onLeave(aEvent){
    if(aEvent.buttons === 1){
      this.index = 0;
    }
  }

  get isMine(){
    return this.#isMine;
  }

  set isMine(aValue){
    this.#isMine = aValue;
    this.index = 4;
  }

}

export function forEachTile(aCallBack){
  if(!aCallBack){
    console.error("Missing callback function in forEachTile method");
    return;
  }
  const tiles = gameProps.tiles;
  for(let row = 0; row < tiles.length; row++){
    const rows = tiles[row];
    for(let col = 0; col < rows.length; col++){
      const tile = rows[col];
      aCallBack(tile);
    }
  }

}