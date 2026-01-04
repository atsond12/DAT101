"use strict";

/**
 * @description Class representing an event listener.
 * @class TEventListener
 */
export class TEventListener {
  #name;
  #handler; // Renamed from #function to #handler

  /**
   * @description Create an event listener.
   * @constructor
   * @param {string} aName - The name of the event listener.
   * @param {Function} aHandler - The handler function for the event listener.
   */
  constructor(aName, aHandler) {
    this.#name = aName;
    this.#handler = aHandler;
  }

  /**
   * @description Get the name of the event listener.
   * @returns {string} The name of the event listener.
   */
  get name() {
    return this.#name;
  }

  /**
   * @description Get the handler function of the event listener.
   * @returns {Function} The handler function of the event listener.
   */
  get handler() {
    // Renamed getter
    return this.#handler;
  }
}

/**
 * @description Class representing a list of event listeners.
 * @class TEventListenerList
 */
export class TEventListenerList {
  #listeners;
  /**
   * @description Create a list of event listeners.
   * @constructor
   */
  constructor() {
    this.#listeners = [];
  }

  /**
   * @description Add an event listener to the list.
   * @param {string} aName - The name of the event listener.
   * @param {Function} aFunction - The handler function for the event listener.
   * @returns {boolean} True if the listener was added, false if it already exists.
   */
  addListener(aName, aFunction) {
    // Avoid adding duplicate listeners
    if (this.getListener(aName)) return false;
    this.#listeners.push(new TEventListener(aName, aFunction));
    return true;
  }

  /**
   * @description Get an event listener by name.
   * @param {string} aName - The name of the event listener.
   * @returns {TEventListener|undefined
   */
  getListener(aName) {
    return this.#listeners.find((l) => l.name === aName);
  }

  /**
   * @description Remove an event listener by name.
   * @param {string} aName - The name of the event listener.
   */
  removeListener(aName) {
    this.#listeners = this.#listeners.filter((l) => l.name !== aName);
  }

  /**
   * @description Get the number of event listeners in the list.
   * @returns {number} The number of event listeners.
   */
  get length() {
    return this.#listeners.length;
  }

  /**
   * @description Get the event listener at a specific index.
   * @param {number} aIndex - The index of the event listener.
   * @returns {TEventListener} The event listener at the specified index.
   */
  getListenerAt(aIndex) {
    return this.#listeners[aIndex];
  }

  /**
   * @description Call all event listeners with a specific name.
   * @param {Event} aEvent - The event object to pass to the handler.
   * @param {string} aEventName - The name of the event listeners to call.
   */
  callAll(aEvent, aEventName) {
    this.#listeners.forEach((l) => {
      if (l.name === aEventName) {
        l.handler(aEvent);
      }
    });
  }
}
