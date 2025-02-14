"use strict";
import libSprite from "../../common/libs/libSprite_v2.mjs";
import lib2d from "../../common/libs/lib2d_v2.mjs";
import { gameProps, gameLevel, setGameOver} from "./Minesweeper.mjs";

//Farger kan definers med enten tekst "black" eller kode "#000000"
const MineInfoColors = ["blue", "green", "red", "darkblue", "brown", "cyan", "black", "grey"];

class TCell {
  constructor(aRow, aColumn) {
    this.row = aRow;
    this.col = aColumn;
  }

  get neighbors() {
    const rows = {
      from: this.row - 1,
      to: this.row + 1,
    };
    const cols = {
      from: this.col - 1,
      to: this.col + 1,
    };
    if (rows.from < 0) {
      rows.from = 0;
    }
    if (cols.from < 0) {
      cols.from = 0;
    }
    if (rows.to >= gameLevel.Tiles.Row) {
      rows.to = gameLevel.Tiles.Row - 1;
    }
    if (cols.to >= gameLevel.Tiles.Col) {
      cols.to = gameLevel.Tiles.Col - 1;
    }
    const neighbors = [];
    for (let rowIndex = rows.from; rowIndex <= rows.to; rowIndex++) {
      const row = gameProps.tiles[rowIndex];
      for (let colIndex = cols.from; colIndex <= cols.to; colIndex++) {
        const isThisTile = this.row === rowIndex && this.col === colIndex;
        //ikke legg til seg selv!
        if (!isThisTile) {
          const tile = row[colIndex];
          neighbors.push(tile);
        }
      }
    }
    return neighbors;
  } // End of neighbors
} // End of class

export class TTile extends libSprite.TSpriteButton {
  #isMine;
  #cell;
  #mineInfo;

  constructor(aSpriteCanvas, aSpriteInfo, aRow, aColumn) {
    const cell = new TCell(aRow, aColumn);
    const pos = new lib2d.TPoint(21, 133);
    pos.x += aSpriteInfo.width * cell.col;
    pos.y += aSpriteInfo.height * cell.row;
    super(aSpriteCanvas, aSpriteInfo, pos);
    this.#isMine = false; //Vi setter at det ikke er en mine som default
    this.#cell = cell;
    this.#mineInfo = 0;
  }

  onMouseDown(aEvent) {
    if(aEvent.buttons === 2){
      return
    }else if(this.index === 3){
      return;
    }

    this.index = 1;
    gameProps.ScoreBoard.spSmiley.index = 1;
  }

  onMouseUp(aEvent) {
    if(aEvent.button === 2){ 
      if(this.index === 3){
        this.index = 0;
        //Her må dere øke mine telleren
        gameProps.ScoreBoard.mineCounter++;
      }else{
        //Her må dere redusere mine telleren
        if(gameProps.ScoreBoard.mineCounter > 0){
          this.index = 3;
          gameProps.ScoreBoard.mineCounter--;
        }
      }
      return;
    }else if(this.index === 3){
      return;
    }

    if (this.#isMine) {
      this.index = 4;
      gameProps.ScoreBoard.spSmiley.index = 2;
      setGameOver();
    } else {
      this.index = 2;
      this.disable = true;
      gameProps.ScoreBoard.spSmiley.index = 0;
      if (this.#mineInfo === 0) {
        const neighbors = this.#cell.neighbors;
        for (let i = 0; i < neighbors.length; i++) {
          const neighbor = neighbors[i];
          neighbor.OpenUp();
        }
      }
    }
    this.disable = true;
    //TODO: Sjekk om spillet er slutt!, Hint bruke forEachTile
    gameProps.openTiles = 0;//Vi må resette denne, later som om vi ikke har noen åpnet enda
    forEachTile(this.#countOpenTiles);
    //Her er openTiles oppdatert med antall åpne miner
    //Lag en if test, sjekk om det er flere tiles å åpne, hvis ikke så er spillet slutt!
    const totalTiles = gameLevel.Tiles.Row * gameLevel.Tiles.Col;
    const tilesLeft = totalTiles - gameProps.openTiles;
    console.log(tilesLeft);
    if(tilesLeft === gameLevel.Mines){
      gameProps.ScoreBoard.spSmiley.index = 4;
      setGameOver();
    }

  }

  onLeave(aEvent) {
    if (aEvent.buttons === 1) {
      this.index = 0;
    }
  }

  get isMine() {
    return this.#isMine;
  }

  set isMine(aValue) {
    this.#isMine = aValue;
    if (aValue) {
      const neighbors = this.#cell.neighbors;
      console.log(this.#cell);
      console.log(neighbors);
      for (let i = 0; i < neighbors.length; i++) {
        const neighbor = neighbors[i];
        neighbor.incMineInfo();
      }
      this.#mineInfo = 0;
    }
  }

  incMineInfo() {
    if (this.#isMine) {
      this.#mineInfo = 0;
    } else {
      this.#mineInfo++;
    }
  }

  onCustomDraw(aCTX) {
    if (this.isOpen) {
      if (this.#mineInfo > 0) {
        const posX = this.x + 17;
        const posY = this.y + 35;
        aCTX.font = "30px serif";
        aCTX.fillStyle = MineInfoColors[this.#mineInfo - 1];
        aCTX.fillText(this.#mineInfo.toString(), posX, posY);
      }
    }
  }

  get isOpen() {
    if (this.index !== 0 && this.index !== 1 && this.index !== 3) {
      return true;
    }
    return false;
  }

  OpenUp(){
    if(this.isOpen || this.index === 3){
      return;
    }
    this.index = 2;
    this.disable = true;
    if(this.#mineInfo === 0){
      const neighbors = this.#cell.neighbors;
      for(let i = 0; i < neighbors.length; i++){
        const neighbor = neighbors[i];
        neighbor.OpenUp();
      }
    }
  }

  reveal(){
    if(this.isOpen){
      return;
    }
    this.index = 2;
    if(this.#isMine){
      this.index = 5;
    }
  }

  #countOpenTiles(aTile){
    if(!aTile.isOpen){
      return;
    }
    gameProps.openTiles++;
  }

} // End of class TTile

export function forEachTile(aCallBack) {
  if (!aCallBack) {
    console.error("Missing callback function in forEachTile method");
    return;
  }
  const tiles = gameProps.tiles;
  for (let row = 0; row < tiles.length; row++) {
    const rows = tiles[row];
    for (let col = 0; col < rows.length; col++) {
      const tile = rows[col];
      aCallBack(tile);
    }
  }
}
