"use strict";
import TBootstrapComponent from "./bootstrapComponent.js";

class TMainMenu extends TBootstrapComponent {
  constructor(){
    super();
    this.attachShadow({mode: "open"});
  }

  render(){
    const template = document.getElementById("main-menu-template");
    const content = template.content.cloneNode(true);
    this.shadowRoot.appendChild(content);
  }
}
customElements.define("main-menu", TMainMenu);