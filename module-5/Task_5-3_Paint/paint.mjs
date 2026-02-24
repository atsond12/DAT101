"use strict";

import { TMenu, EActionType, EColorType, EShapeType, EStrokeSizeType } from "./menu.js";
import { } from "./shape.js"
/*
📝 TODO: Create a Shape System
═══════════════════════════════════════════════════════════════════

You need to build this file with the following features:

🎨 SHAPES (shapes.js file)
  └─ Create a base shape class (TShape)
  └─ Create subclasses for each shape type:
     • TLine (start point → end point)
     • TCircle (center point + radius)
     • TRectangle (top-left corner + width/height)
     • TOval (center + width/height)
     • TPen (collection of connected line segments)
     • TPolygon (collection of points)
  └─ Each shape needs:
     1. Properties to store its position and size
     2. A draw() method to paint itself on canvas

📦 SHAPE CONTAINER (shapeManager class)
  └─ Stores all shapes that are currently on the canvas
  └─ Manages the Z-order (which shapes appear on top)
  └─ Methods needed:
     1. addShape(newShape) - add a new shape
     2. removeShape(shape) - delete a shape
     3. moveShapeUp(shape) - bring shape forward
     4. moveShapeDown(shape) - send shape backward
     5. getSelectedShape() - find which shape is selected

🖱️ MOUSE INTERACTION
  └─ Listen for mouse events on the paint canvas:
     1. mouseDown → Start drawing a new shape
     2. mouseMove → Update the shape LIVE (rubber banding effect)
     3. mouseUp → Finish and save the shape
  └─ Use current settings (newShapeType) for stroke color, fill color, etc.

⚡ RUBBER BANDING
  └─ While dragging the mouse, the shape should update in real-time
  └─ Shape only gets "finalized" when user releases the mouse button
  └─ This also works for polygons BUT with a twist:
     ⚠️  Polygon drawing is special! Click once = new point, click again = next point
     ⚠️  User must release mouse button after EACH point they add
  └─ 💡 POLYMORPHISM TIP:
     Let the TPolygon class override the startShape(), moveShape(), and endShape() 
     methods to handle this special multi-click behavior differently than other shapes!

📋 HTML INTEGRATION
  └─ Each shape needs an HTML element: "<div id="divPaintObject" class="paintObject">Shape-1</div>"
  └─ These go in: <div id="paintObjectList"></div>
  └─ Benefits:
     1. See all shapes in a list (even hidden ones!)
     2. Click to select shapes
     3. Reorder shapes by moving divs
     4. Delete button next to each shape
  └─ Link HTML selection to canvas selection (highlight the shape)

💡 DESIGN DECISION
  └─ Where should the HTML controls live?
     • In TShape class?
     • In each shape subclass?
     • In the ShapeContainer class?
     • In a separate ShapeUI class?
  └─ Think about what "owns" the HTML element!
*/

/**
 * 🎨 DRAWING SETTINGS OBJECT
 * This tracks what the user has currently selected in the toolbar
 * 
 * 📌 DEFAULT VALUES (what buttons start as "active"):
 *    • ShapeType: Line (vs Circle, Rectangle, Pen, Oval, Polygon)
 *    • FillColor: Black
 *    • StrokeColor: Black
 *    • StrokeSize: Thin
 * 
 * 💡 TIP FOR CUSTOMIZATION:
 *    Want different buttons to be active when the app starts?
 *    Just change these default values!
 *    Example: Change StrokeColor to EColorType.Red to highlight the Red color button
 * 
 * ✏️ During gameplay:
 *    When user clicks a menu button (e.g., "Circle"), this object gets updated
 *    So when drawing a new shape, the app knows which settings to use
 */
export const newShapeType = { ShapeType: EShapeType.Line, FillColor: EColorType.Black, StrokeColor: EColorType.Black, StrokeSize: EStrokeSizeType.Thin };

/**
 * 🎮 CREATE THE MENU TOOLBAR
 * Pass newShapeType so the menu knows which buttons should start as "highlighted"
 * (This happens in TMenu constructor → TButtonContainer.setDefaultButton())
 * You should look into the TSpriteButtonHaptic class
 * here can you se the sprite index switch for ide, hower, mouse down, mouse up, and if the button is desabled.
 * E.g. index {0, 1, 2, 3} for normal, hover, mouse down, disabled states.
 */
const menu = new TMenu(newShapeType);

/**
 * 📢 MENU BUTTON HANDLER
 * This function runs when user clicks ANY button in the menu toolbar
 * 
 * 📦 The event.detail contains information about which button was clicked:
 *    {
 *      Action: { name: "New", value: 1 },
 *      StrokeColor: { name: "Black", value: "#000000" },
 *      ShapeType: { name: "Line", value: 1 },
 *      StrokeSize: { name: "Thin", value: 1 }
 *    }
 */
function menuButtonClick(aEvent) {
  const envelope = aEvent.detail;
  const actionKey = Object.keys(envelope)[0];        // 👉 Which category? (Action, StrokeColor, ShapeType, etc.)
  const action = envelope[actionKey];                 // 👉 Get the full details of that button
  const name = action.name;                          // 👉 Button nickname (e.g., "Black", "Line", "New")
  const value = action.value;                        // 👉 Button value (e.g., "#000000", 1, "Thin")
  
  // ✅ Update newShapeType based on the button clicked
  // Example: if StrokeColor button clicked → update newShapeType.StrokeColor
  
  switch (actionKey) {
    case "Action":
      // 🎯 Action buttons (New, Eraser, Move Up, Move Down)
      switch (value) {
        case EActionType.New:
          console.log("✨ New button clicked → Clear the canvas!");
          break;
        case EActionType.Eraser:
          console.log("🗑️  Eraser button clicked → Delete selected shape");
          break;
        case EActionType.MoveUp:
          console.log("⬆️  Move Up button clicked → Bring selected shape to front");
          break;
        case EActionType.MoveDown:
          console.log("⬇️  Move Down button clicked → Send selected shape to back");
          break;
      }
      break;
    case "StrokeColor":
      console.log(`🎨 Stroke Color changed to ${name} (${value})`);
      newShapeType.StrokeColor = value;  // ← Update the setting
      break;
    case "FillColor":
      console.log(`🪣 Fill Color changed to ${name} (${value})`);
      newShapeType.FillColor = value;    // ← Update the setting
      break;
    case "ShapeType":
      console.log(`📐 Shape Type changed to ${name} (${value})`);
      newShapeType.ShapeType = value;    // ← Update the setting
      break;
    case "StrokeSize":
      console.log(`📏 Stroke Size changed to ${name} (${value})`);
      newShapeType.StrokeSize = value;   // ← Update the setting
      break; 
  }
}

// 🔗 Listen for menu button clicks
menu.addEventListener("menuButtonClick", menuButtonClick);
