"use strict";
import { TSpriteCanvas, TSpriteButtonHaptic } from "libSprite";
import { TPoint } from "lib2d";

//═══════════════════════════════════════════════════════════════════════════════════════
// 🎮 MENU SYSTEM - Toolbar with buttons for all drawing settings
//═══════════════════════════════════════════════════════════════════════════════════════

// 📌 Menu button layout type
export const EContainerType = { Action: 1, Toggle: 2, Check: 3 };

// 🖼️ Get the menu canvas
const cvs = document.getElementById("cvsMenu");
const ctx = cvs.getContext("2d");

/**
 * 🎨 SPRITE SHEET LAYOUT
 * Each button is a small image (40x40 pixels) on a big spritesheet image
 * Position (x, y) = where to find it on the image
 * count = how many animation frames (usually 3: normal, hover, pressed)
 */
const PaintSheet = {
  // 🎨 10 color choices
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
  // 📏 Line thickness options
  StrokeSizeButton: {
    Thin: { x: 0, y: 400, width: 40, height: 40, count: 3 },
    Medium: { x: 0, y: 440, width: 40, height: 40, count: 3 },
    Thick: { x: 0, y: 480, width: 40, height: 40, count: 3 },
  },
  // 📐 Shape drawing tools
  ShapeTypeButton: {
    Line: { x: 0, y: 520, width: 40, height: 40, count: 3 },
    Pen: { x: 0, y: 560, width: 40, height: 40, count: 3 },
    Circle: { x: 0, y: 600, width: 40, height: 40, count: 3 },
    Oval: { x: 0, y: 640, width: 40, height: 40, count: 3 },
    Rectangle: { x: 0, y: 680, width: 40, height: 40, count: 3 },
    Polygon: { x: 0, y: 720, width: 40, height: 40, count: 3 },
  },
  // ⚙️ Utility buttons
  ActionButton: {
    New: { x: 0, y: 880, width: 40, height: 40, count: 3 },      // ✨ Clear canvas
    Eraser: { x: 0, y: 760, width: 40, height: 40, count: 3 },    // 🗑️  Delete shape
    MoveUp: { x: 0, y: 800, width: 40, height: 40, count: 3 },    // ⬆️  Layer up
    MoveDown: { x: 0, y: 840, width: 40, height: 40, count: 3 },  // ⬇️  Layer down
  },
};

/**
 * 🎨 COLOR VALUES
 * Maps color names to hex codes
 */
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

/**
 * 📏 STROKE SIZE VALUES
 * Maps size names to pixel thickness
 */
export const EStrokeSizeType = {
  Thin: 1,
  Medium: 3,
  Thick: 5,
};

/**
 * 📐 SHAPE TYPE VALUES
 * Maps shape names to numeric IDs
 */
export const EShapeType = {
  Line: 1,
  Pen: 2,
  Circle: 3,
  Oval: 4,
  Rectangle: 5,
  Polygon: 6,
};

/**
 * ⚙️ ACTION TYPE VALUES
 * Maps action names to numeric IDs
 */
export const EActionType = {
  New: 1,
  Eraser: 2,
  MoveUp: 3,
  MoveDown: 4,
};

/**
 * 🎛️ BUTTON CONTAINER CONFIGURATION
 * Defines the layout, position, and type of each button group
 */
const ButtonContainers = {
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

//═══════════════════════════════════════════════════════════════════════════════════════
// 🔧 CLASSES
//═══════════════════════════════════════════════════════════════════════════════════════

/**
 * 🎛️ BUTTON CONTAINER CLASS
 * Manages a group of related buttons (like all color buttons together)
 * Handles layout, drawing, and tracking which button is selected
 */
class TButtonContainer {
  #ci = null;                    // 📋 Container info (config)
  #style = null;                 // 🎨 Layout style (padding, gaps)
  #buttons = null;               // 🔘 Array of buttons in this group
  #caption = null;               // 📝 Label for this button group
  #keys = null;                  // 🔑 Names of each button
  #activeButton = null;          // ⭐ Currently selected button
  
  constructor(aSpcvs, aContainerInfo) {
    this.#ci = aContainerInfo;
    this.#style = { frame: 5, gap: 3 };    // 5px padding, 3px between buttons
    this.#buttons = [];
    this.#caption = { text: this.#ci.caption, x: 0, y: 0, width: ctx.measureText(this.#ci.caption).width, height: 10 };
    this.#keys = Object.keys(this.#ci.buttons);
    
    // 🔨 Create each button in this container
    this.#keys.forEach((key) => {
      const spinfo = this.#ci.buttons[key];
      const pos = new TPoint(this.#ci.pos.x + this.#style.frame + this.#buttons.length * (spinfo.width + this.#style.gap), this.#ci.pos.y + this.#style.frame);
      const button = new TSpriteButtonHaptic(aSpcvs, spinfo, pos.x, pos.y);
      button.onClick = this.#doClick.bind(this);
      this.#buttons.push(button);
      const size = {
        width: pos.x - this.#ci.pos.x + spinfo.width + this.#style.frame,
        height: pos.y - this.#ci.pos.y + spinfo.height + this.#style.frame + this.#caption.height,
      };
      this.#caption.x = this.#ci.pos.x + size.width / 2 - this.#caption.width / 2;
      this.#caption.y = this.#ci.pos.y + size.height - this.#style.frame;
    });
  }

  /**
   * 🎨 Draw this button group on the canvas
   */
  draw(aCtx) {
    aCtx.fillStyle = "#000000";
    aCtx.fillText(this.#caption.text, this.#caption.x, this.#caption.y);
    this.#buttons.forEach((button) => {
      // Show pressed state for active button
      if (this.#activeButton === button) {
        button.index = 2;  // Frame 2 = pressed state
      }
      button.draw(aCtx);
    });
  }

  /**
   * 📌 Set which button starts as the default (highlighted)
   */
  setDefaultButton(aButtonValue) {
    this.#buttons.forEach((button, i) => {
      if (this.#ci.valueList[this.#keys[i]] === aButtonValue) {
        button.index = 2;
        this.#activeButton = button;
      }
    });
  }

  /**
   * 📢 When a button in this group is clicked
   */
  #doClick = (aEvent) => {
    const button = aEvent.target;
    const buttonIndex = this.#buttons.indexOf(button);
    const buttonKey = this.#keys[buttonIndex];
    const buttonValue = this.#ci.valueList[buttonKey];
    
    // 🔔 Tell the menu about this click
    this.onClick(button, buttonKey, buttonValue, this);
    
    // 🎯 For Toggle buttons: deselect old, select new
    if (this.#ci.Type === EContainerType.Toggle) {
      if (this.#activeButton) {
        this.#activeButton.index = 0;  // Reset old button to idle
      }
      this.#activeButton = button;     // Mark new button as active
    }
  };
}

/**
 * 🎮 MAIN MENU CLASS
 * Creates the toolbar with all buttons and manages menu events
 * Sends events to the paint.mjs file when buttons are clicked
 */
export class TMenu extends TSpriteCanvas {
  #containers = null;
  
  constructor(aDefaultShapeType) {
    super(cvs);
    
    // 🔨 Create each button container
    this.#containers = Object.keys(ButtonContainers).map((key) => {
      const ci = ButtonContainers[key];
      const container = new TButtonContainer(this, ci);
      container.onClick = this.#doClick.bind(this);
      
      // 📌 Set the default selected button for each container
      const defaultContainer = aDefaultShapeType[key];
      if (defaultContainer) {
        container.setDefaultButton(defaultContainer);
      }
      return container;
    });

    // 🖼️ Load the button images from sprite sheet
    this.loadSpriteImage("./media/SpriteSheet.png", () => {
      // ✅ Once image is loaded, start drawing the menu
      this.onDraw = this.draw.bind(this);
    });
  }

  /**
   * 📤 Send event to paint.mjs when ANY button is clicked
   */
  #doClick = (aTarget, aButtonKey, aButtonValue, aContainer) => {
    const containerIndex = this.#containers.indexOf(aContainer);
    const containerKey = Object.keys(ButtonContainers)[containerIndex];
    
    // 📦 Package the click info
    const event = new CustomEvent("menuButtonClick", {
      bubbles: true,
      cancelable: true,
      detail: {},
    });
    event.detail[containerKey] = { name: aButtonKey, value: aButtonValue };
    
    // 🔔 Dispatch event to whoever is listening (paint.mjs)
    cvs.dispatchEvent(event);
  };

  /**
   * 🎨 Draw all button containers
   */
  draw(aCtx) {
    this.#containers.forEach((container) => container.draw(aCtx));
  }
}
