"use strict";
import TBootstrapComponent from "./bootstrapComponent.js";

const pictureFiles = 
[
  { id:  1, fn: "./media/img/img_01.png", caption: "Colorado mountain  1" },
  { id:  2, fn: "./media/img/img_02.png", caption: "Colorado Horseshoe bend" },
  { id:  3, fn: "./media/img/img_03.png", caption: "Colorado mountain  2" },
  { id:  4, fn: "./media/img/img_04.png", caption: "European mountain  1" },
  { id:  5, fn: "./media/img/img_05.png", caption: "European mountain  2" },
  { id:  6, fn: "./media/img/img_06.png", caption: "European mountain  3" },
  { id:  7, fn: "./media/img/img_07.png", caption: "European mountain  4" },
  { id:  8, fn: "./media/img/img_08.png", caption: "European mountain  5" },
  { id:  9, fn: "./media/img/img_09.png", caption: "Grand Canyon  1" },
  { id: 10, fn: "./media/img/img_10.png", caption: "Grand Canyon  2" },
];

class TPictureCarousel extends TBootstrapComponent{
  constructor(){
    super();
    this.attachShadow({mode: "open"});
  }

  render(){
    const content = document.getElementById("picture-carousel-page-template").content.cloneNode(true);
    this.shadowRoot.appendChild(content);
    const pictureCarousel = this.shadowRoot.getElementById("picture-carousel");
    
    //Tester med ett bilde
    const picture = document.createElement("img");
    picture.src = pictureFiles[0].fn;
    picture.alt = pictureFiles[0].caption;
    picture.className = "d-block w-100";
    pictureCarousel.appendChild(picture);
  }
}

customElements.define("picture-carousel", TPictureCarousel);
const bodyContent = document.getElementById("body-content");
bodyContent.innerHTML = "<picture-carousel></picture-carousel>";