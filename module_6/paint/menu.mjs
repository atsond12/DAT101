"use strict";
//------------------------------------------------------------------------------------------
//------ Imports ---------------------------------------------------------------------------
//------------------------------------------------------------------------------------------
import libSprite from "../../common/libs/libSprite_v2.mjs";
import lib2D from "../../common/libs/lib2d_v2.mjs";

//------------------------------------------------------------------------------------------
//------ Variables and objects ------------------------------------------------------------
//------------------------------------------------------------------------------------------

export const EContainerType = { Action: 1, Toggle: 2, Check: 3 };
const cvsMenu = document.getElementById("cvsMenu");
const ctxMenu = cvsMenu.getContext("2d");
export const spcvsMenu = new libSprite.TSpriteCanvas(cvsMenu);

const PaintSheet = {
  // Draw Color Buttons
  ColorButton: {
    Black: { x: 0, y: 0, width: 40, height: 40, count: 3 },
    White: { x: 0, y: 40, width: 40, height: 40, count: 3 },
    Gray: { x: 0, y: 80, width: 40, height: 40, count: 3 },
    Burgundy: { x: 0, y: 120, width: 40, height: 40, count: 3 },
    Red: { x: 0, y: 160, width: 40, height: 40, count: 3 },
    Yellow: { x: 0, y: 200, width: 40, height: 40, count: 3 },
    Green: { x: 0, y: 240, width: 40, height: 40, count: 3 },
    Azure: { x: 0, y: 280, width: 40, height: 40, count: 3 },
    Blue: { x: 0, y: 320, width: 40, height: 40, count: 3 },
    Purple: { x: 0, y: 360, width: 40, height: 40, count: 3 },
  },
  // Stroke thickness Buttons
  StrokeSizeButton: {
    Thin: { x: 0, y: 400, width: 40, height: 40, count: 3 },
    Medium: { x: 0, y: 440, width: 40, height: 40, count: 3 },
    Thick: { x: 0, y: 480, width: 40, height: 40, count: 3 },
  },
  // Shape type buttons
  ShapeTypeButton: {
    Line: { x: 0, y: 520, width: 40, height: 40, count: 3 },
    Pen: { x: 0, y: 560, width: 40, height: 40, count: 3 },
    Circle: { x: 0, y: 600, width: 40, height: 40, count: 3 },
    Oval: { x: 0, y: 640, width: 40, height: 40, count: 3 },
    Rectangle: { x: 0, y: 680, width: 40, height: 40, count: 3 },
    Polygon: { x: 0, y: 720, width: 40, height: 40, count: 3 },
  },
  // Action Buttons
  ActionButton: {
    // New Button
    New: { x: 0, y: 880, width: 40, height: 40, count: 3 },
    // Eraser button
    Eraser: { x: 0, y: 760, width: 40, height: 40, count: 3 },
    // Stack move up button
    MoveUp: { x: 0, y: 800, width: 40, height: 40, count: 3 },
    // Stack move down button
    MoveDown: { x: 0, y: 840, width: 40, height: 40, count: 3 },
  },
};

export const EColorType = {
  Black: "#000000",
  White: "#ffffff",
  Gray: "#7f7f7f",
  Burgundy: "#880015",
  Red: "#ed1c24",
  Yellow: "#fff200",
  Green: "#22b14c",
  Azure: "#00a2e8",
  Blue: "#3f48cc",
  Purple: "#a349a4",
};

export const EStrokeSizeType = {
  Thin: 1,
  Medium: 3,
  Thick: 5,
};

export const EShapeType = {
  Line: 1,
  Pen: 2,
  Circle: 3,
  Oval: 4,
  Rectangle: 5,
  Polygon: 6,
};

export const EActionType = {
  New: 1,
  Eraser: 2,
  MoveUp: 3,
  MoveDown: 4,
};

const ContainerButtons = {
  Action: {
    caption: "   New        Delete        Up        Down   ",
    buttons: PaintSheet.ActionButton,
    Type: EContainerType.Action,
    pos: { x: 0, y: 0 },
    valueList: EActionType,
  },
  StrokeColor: {
    caption: "Stroke Color",
    buttons: PaintSheet.ColorButton,
    Type: EContainerType.Toggle,
    pos: { x: 190, y: 0 },
    valueList: EColorType,
  },
  StrokeSize: {
    caption: "Stroke Size",
    buttons: PaintSheet.StrokeSizeButton,
    Type: EContainerType.Toggle,
    pos: { x: 633, y: 0 },
    valueList: EStrokeSizeType,
  },
  ShapeType: {
    caption: "Draw Shape",
    buttons: PaintSheet.ShapeTypeButton,
    Type: EContainerType.Toggle,
    pos: { x: 0, y: 55 },
    valueList: EShapeType,
  },
  FillColor: {
    caption: "Fill Color",
    buttons: PaintSheet.ColorButton,
    Type: EContainerType.Toggle,
    pos: { x: 275, y: 55 },
    valueList: EColorType,
  },
};

//-------------------------------------------------------------------------------------------
//------ classes ----------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------

class TContainerButton {
  #ci = null;
  #style = null;
  #buttons = null;
  #caption = null;
  #keys = null;
  #activeButton = null;
  constructor(aContainerInfo) {
    this.#ci = aContainerInfo;
    this.#style = { frame: 5, gap: 3 };
    this.#buttons = [];
    this.#caption = { text: this.#ci.caption, x: 0, y: 0, width: ctxMenu.measureText(this.#ci.caption).width, height: 10 };
    this.#keys = Object.keys(this.#ci.buttons);
    this.#keys.forEach((key) => {
      const spinfo = this.#ci.buttons[key];
      const pos = new lib2D.TPoint(this.#ci.pos.x + this.#style.frame + this.#buttons.length * (spinfo.width + this.#style.gap), this.#ci.pos.y + this.#style.frame);
      const button = new libSprite.TSpriteButtonHaptic(spcvsMenu, spinfo, pos);
      button.onClick = this.#doClick;
      this.#buttons.push(button);
      const size = {
        width: pos.x - this.#ci.pos.x + spinfo.width + this.#style.frame,
        height: pos.y - this.#ci.pos.y + spinfo.height + this.#style.frame + this.#caption.height,
      };
      this.#caption.x = this.#ci.pos.x + size.width / 2 - this.#caption.width / 2;
      this.#caption.y = this.#ci.pos.y + size.height - this.#style.frame;
    });
  }

  draw() {
    ctxMenu.fillStyle = "#000000";
    ctxMenu.fillText(this.#caption.text, this.#caption.x, this.#caption.y);
    this.#buttons.forEach((button) => {
      if (this.#activeButton === button) {
        button.index = 2;
      }
      button.draw();
    });
  }

  setDefaultButton(aButtonValue){
    this.#buttons.forEach((button, i) => {
      if (this.#ci.valueList[this.#keys[i]] === aButtonValue) {
        button.index = 2;
        this.#activeButton = button;
      }
    });
  } 

  #doClick = (aEvent, aButton) => {
    const buttonIndex = this.#buttons.indexOf(aButton);
    const buttonKey = this.#keys[buttonIndex];
    const buttonValue = this.#ci.valueList[buttonKey];
    this.onClick(aEvent.target, buttonKey, buttonValue, this);
    if (this.#ci.Type === EContainerType.Toggle) {
      if (this.#activeButton) {
        this.#activeButton.index = 0;
      }
      this.#activeButton = aButton;
    }
  };
}

export class TMenu {
  #containers = null;
  constructor(aDefaultShapeType) {
    this.#containers = Object.keys(ContainerButtons).map((key) => {
      const ci = ContainerButtons[key];
      const container = new TContainerButton(ci);
      container.onClick = this.#doClick;
      const defaultContainer = aDefaultShapeType[key];
      if (defaultContainer) {
        container.setDefaultButton(defaultContainer);
      }
      return container;
    });
  }

  #doClick = (aTarget, aButtonKey, aButtonValue, aContainer) => {
    const containerIndex = this.#containers.indexOf(aContainer);
    const containerKey = Object.keys(ContainerButtons)[containerIndex];
    const event = new CustomEvent("menuButtonClick", {
      bubbles: true,
      cancelable: true,
      detail: {},
    });
    event.detail[containerKey] = { name: aButtonKey, value: aButtonValue };
    aTarget.dispatchEvent(event);
  };

  draw() {
    spcvsMenu.clearCanvas();
    this.#containers.forEach((container) => container.draw());
  }
}
