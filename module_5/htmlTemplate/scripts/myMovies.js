"use strict";
import TBootstrapComponent from "./bootstrapComponent.js";
import movieList from "./movieList.js";

export class TMovie{
  constructor(){
    this.title = "";
    this.director = "";
    this.genre = [];
    this.year = "1900";
    this.rating = 0; // 1 til 10
  }
}

let newMovie = null;

export class TMyMovies extends TBootstrapComponent {
  #movies;
  #htmlTable;
  constructor(){
    super();
    //Hvis vi ikke har noen filmer, så lager vi en tom liste
    this.#movies = movieList || [];
    this.#htmlTable = null;
    this.attachShadow({mode: "open"});
  }

  #loadMovies(){
    //Oppdater antall filmer i totalMovies
    const totalMovies = this.shadowRoot.getElementById("totalMovies");
    totalMovies.textContent = this.#movies.length.toString();
    //Lage dynamiske rader for hver film
    for(let i = 0; i < this.#movies.length; i++){
      const movie = this.#movies[i];
      const row = document.createElement("tr");
      //Legger til tittel
      let td = document.createElement("td");
      td.textContent = movie.title;
      row.appendChild(td);
      
      //Legger til regissør
      td = document.createElement("td");
      td.textContent = movie.director;
      row.appendChild(td);

      //Legger til år
      td = document.createElement("td");
      td.textContent = movie.year;
      row.appendChild(td);

      //Legger til sjanger
      td = document.createElement("td");
      td.textContent = movie.genre.join(", ");
      row.appendChild(td);

      //Legger til rating
      td = document.createElement("td");
      td.textContent = movie.rating.toString();
      row.appendChild(td);

      //Legg til raden i tabellen
      this.#htmlTable.appendChild(row);
    }

  }

  #onAddMovie = () => {
    const bodyContent = document.getElementById("body-content");
    bodyContent.innerHTML = "<add-edit-movie-page></add-edit-movie-page>";
  };

  render(){
    const template = document.getElementById("my-movies-page-template");
    const content = template.content.cloneNode(true);
    this.shadowRoot.appendChild(content);
    this.#htmlTable = this.shadowRoot.getElementById("table-body");
    this.#loadMovies();
    const addMovieButton = this.shadowRoot.getElementById("add-movie-button");
    addMovieButton.addEventListener("click", this.#onAddMovie);
  }
}// End of class TMyMovies

customElements.define("movies-page", TMyMovies);


class TMovieForm extends TBootstrapComponent {
  #titleElement;
  #directorElement;
  #yearElement;
  #genreElements;
  #ratingElement;
  constructor(){
    super();
    this.attachShadow({mode: "open"});
  }

  #onSubmitForm = (aEvent) => {
    aEvent.preventDefault();
    const movie = new TMovie();
    movie.title = this.#titleElement.value;
    movie.director = this.#directorElement.value;
    movie.year = this.#yearElement.value;
    movie.rating = this.#ratingElement.value;
    for(let i = 0; i < this.#genreElements.length; i++){
      //Oppgaven nå er nå å legge til kun de valgte sjangerne!
      const genreElement = this.#genreElements[i];
      if(genreElement.checked){
        movie.genre.push(genreElement.value);
      }
    }
    console.log(movie);
    newMovie = movie;
    const bodyContent = document.getElementById("body-content");
    bodyContent.innerHTML = "<movies-page></movies-page>";
  }

  render(){
    const template = document.getElementById("add-edit-movie-template");
    const content = template.content.cloneNode(true);
    this.shadowRoot.appendChild(content);
    this.#titleElement = this.shadowRoot.getElementById("movie-title");
    this.#directorElement = this.shadowRoot.getElementById("movie-director");
    this.#yearElement = this.shadowRoot.getElementById("movie-year");
    this.#genreElements = this.shadowRoot.querySelectorAll("input[name='movie-genre']"); // Liste med sjekkbokser
    this.#ratingElement = this.shadowRoot.getElementById("movie-rating");
    const form = this.shadowRoot.getElementById("movie-form");
    form.addEventListener("submit", this.#onSubmitForm);
    //Sjekk om det finne en ny film som skal legges til
  }
}

customElements.define("add-edit-movie-page", TMovieForm);
//Kun for å midlertidig vise add-edit-movie-page
const bodyContent = document.getElementById("body-content");
bodyContent.innerHTML = "<movies-page></movies-page>";