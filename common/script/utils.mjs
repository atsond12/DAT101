"use strict";

/**
 * @module utils
 * @description Utility functions for printing output to the DOM.
 * @description Using this module requires a DOM element with ID "txtOut" to be present in the HTML.
 * @description The module provides functions to print strings, numbers, objects, and arrays to the DOM.
 */

let DOMTextOut = null;
export const newLine = "<br/>";
export const indent = "&nbsp;&nbsp;";

// Exported functions

/**
 * 
 * @param {*} aElement 
 * @returns undefined
 */
export function printOut(aElement) {
  if(!DOMTextOut) {
    console.error("Cannot be used without a DOM element with ID 'txtOut'.");
    return;
  }
  try {
    const type = typeof aElement;
    switch (type) {
      case "string":
        DOMTextOut.innerHTML += `${aElement}${newLine}`;
        break;
      case "number":
        DOMTextOut.innerHTML += `${aElement}${newLine}`;
        break;
      case "object":
        if (Array.isArray(aElement)) {
          DOMTextOut.innerHTML += convertArrayToString({ arr: aElement });
        } else {
          DOMTextOut.innerHTML += convertObjectToString({ obj: aElement });
        }
        break;
      default:
        console.error("Unsupported type:", type);
    }
  } catch (e) {
    console.error("Error in printOut:", e);
  }
}

function convertObjectToString({ obj, out = [], level = 0, seen = new Set() }) {
  const prefix = indent.repeat(level);
  if (seen.has(obj)) {
    out.push(`${prefix}[Circular]${newLine}`);
    return out.join("");
  }
  seen.add(obj);
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "object" && value !== null) {
      out.push(`${prefix}${key}: {${newLine}`);
      out.push(convertObjectToString({ obj: value, out: [], level: level + 1, seen }));
      out.push(`${prefix}}${newLine}`);
    } else {
      out.push(`${prefix}${key}: ${value}${newLine}`);
    }
  }
  seen.delete(obj);
  return out.join("");
}

function convertArrayToString({ arr, out = [], level = 0, seen = new Set() }) {
  const prefix = indent.repeat(level);
  if (seen.has(arr)) {
    out.push(`${prefix}[Circular]${newLine}`);
    return out.join("");
  }
  seen.add(arr);
  for (const element of arr) {
    if (Array.isArray(element)) {
      out.push(`${prefix}[${newLine}`);
      out.push(convertArrayToString({ arr: element, out: [], level: level + 1, seen }));
      out.push(`${prefix}]${newLine}`);
    } else if (typeof element === "object" && element !== null) {
      out.push(`${prefix}{${newLine}`);
      out.push(convertObjectToString({ obj: element, out: [], level: level + 1, seen }));
      out.push(`${prefix}}${newLine}`);
    } else {
      out.push(`${prefix}${element}${newLine}`);
    }
  }
  seen.delete(arr);
  return out.join("");
}


// Main code
DOMTextOut = document.getElementById("txtOut");
if (!DOMTextOut) {
  console.error("Element with ID 'txtOut' not found in the DOM. You need to create it in your HTML.");
}