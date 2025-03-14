"use strict";
import TBootstrapComponent from "./bootstrapComponent.js";

export class TMovie{
  constructor(){
    this.title = "";
    this.director = "";
    this.genre = [];
    this.year = "1900";
    this.rating = 0; // 1 til 10
  }
}

export class TMyMovies extends TBootstrapComponent {
  #movies;
  constructor(aMovieList = []){
    super();
    this.#movies = aMovieList;
    this.attachShadow({mode: "open"});
  }

  render(){
    const template = document.getElementById("my-movies-page-template");
    const content = template.content.cloneNode(true);
    this.shadowRoot.appendChild(content);
  }
}

customElements.define("movies-page", TMyMovies);
