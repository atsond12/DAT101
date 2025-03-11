"use strict";
import TBootstrapComponent from "./bootstrapComponent.js";

class THome extends TBootstrapComponent {
  constructor(){
    super();
    this.attachShadow({mode: "open"});
  }

  render(){
    this.shadowRoot.innerHTML = `
      <div class="container">
        <h1>Welcome to the home page</h1>
      </div>
    `
  }
}

customElements.define("home-page", THome);