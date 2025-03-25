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
  #carousel;
  #carouselInner;
  #carouselIndicators;
  constructor(){
    super();
    this.#carousel = null;
    this.#carouselInner = null;
    this.#carouselIndicators = null;
    this.attachShadow({mode: "open"});
  }

  #addPicture(aIndex){
    const content = document.getElementById("picture-carousel-item-template").content;
    const doc = content.cloneNode(true);
    const div = doc.querySelector("div");
    const img = doc.querySelector("img");
    const picture = pictureFiles[aIndex];
    img.src = picture.fn;
    img.alt = picture.caption;
    if(aIndex === 0){
      div.classList.add("active");
    }
    this.#carouselInner.appendChild(div);
  }

  #addIndicator(aIndex){
    const content = document.getElementById("picture-carousel-indicator-template").content;
    const doc = content.cloneNode(true);
    const button = doc.querySelector("button");
    button.dataset.slideTo = aIndex;
  }

  render(){
    const content = document.getElementById("picture-carousel-page-template").content.cloneNode(true);
    this.shadowRoot.appendChild(content);
    const htmlCarousel = this.shadowRoot.getElementById("picture-carousel");
    this.#carousel = new bootstrap.Carousel(htmlCarousel);
    this.#carouselInner = this.shadowRoot.getElementById("picture-carousel-inner");
    this.#carouselIndicators = this.shadowRoot.getElementById("carousel-indicators");

    for(let i = 0; i < pictureFiles.length; i++){
      this.#addPicture(i);
      this.#addIndicator(i);
    }

    let button = this.shadowRoot.getElementById("prev-button");
    button.addEventListener("click", () => this.#carousel.prev());
    button = this.shadowRoot.getElementById("next-button");
    button.addEventListener("click", () => this.#carousel.next());

  }
}

customElements.define("picture-carousel", TPictureCarousel);
const bodyContent = document.getElementById("body-content");
bodyContent.innerHTML = "<picture-carousel></picture-carousel>";