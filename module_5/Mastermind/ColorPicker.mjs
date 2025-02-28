"use strict";
import lib2D from "../../common/libs/lib2d_v2.mjs";
import libSprite from "../../common/libs/libSprite_v2.mjs";
import MastermindBoard from "./MastermindBoard.mjs";
import { GameProps } from "./Mastermind.mjs";

const Positions = MastermindBoard.ColorPicker;


export class TColorPicker extends libSprite.TSpriteDraggable {
  #spcvs;
  #spi;
  #color;
  #snapPos;
  #hasMoved;
  constructor(spcvs, spriteInfo, color, index){
    super(spcvs, spriteInfo,Positions[color]);
    this.index = index;
    this.snapTo = GameProps.snapTo;
    this.#spcvs = spcvs;
    this.#spi = spriteInfo;
    this.#color = color;
    this.#snapPos = null;
    this.#hasMoved = false;
  }

  onCanDrop(){
    return false;
  }

  clone(){
    return new TColorPicker(
      this.#spcvs,
      this.#spi,
      this.#color,
      this.index
    )
  }

  onDrop(aDropPosition){
    GameProps.colorPickers.push(this.clone());
    const index = GameProps.snapTo.positions.indexOf(aDropPosition);
    const removedItems = GameProps.snapTo.positions.splice(index, 1);
    this.#snapPos = removedItems[0];
    this.#hasMoved = true;
  }

  onMouseDown(){
    super.onMouseDown();
    //Få denne knappen til å være i det øverste laget
    const index = GameProps.colorPickers.indexOf(this);
    GameProps.colorPickers.splice(index, 1);
    GameProps.colorPickers.push(this);
    if(this.#snapPos !== null){
      console.log("Pushing snapPos", this.#snapPos);
      GameProps.snapTo.positions.push(this.#snapPos);
      this.#snapPos = null;
    }
  }

  onCancelDrop(){
    //Fjern denne knappen fra listen over knapper.
    //Først finn indeksen til denne knappen
    //Deretter fjern knappen fra listen
    if(this.#hasMoved){
      const index = GameProps.colorPickers.indexOf(this);
      GameProps.colorPickers.splice(index, 1);
      this.spcvs.removeSpriteButton(this); 
    }
  }

} 