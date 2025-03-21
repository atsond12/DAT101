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
let editMovie = null;
let movieSortColumnName = "Title";
let oldSortColumnName = "";

export class TMyMovies extends TBootstrapComponent {
  #movies;
  #htmlTable;
  constructor(){
    super();
    //Hvis vi ikke har noen filmer, så lager vi en tom liste
    //Hvis vi har filmer i localStorage, så henter vi disse
    let moviesFromJson = null;
    let localStorageMovies = localStorage.getItem("movieList");
    if(localStorageMovies !== null){
      moviesFromJson = JSON.parse(localStorageMovies);
    }
    
    this.#movies = moviesFromJson || movieList || [];
    this.#htmlTable = null;
    this.attachShadow({mode: "open"});
  }

  #editMovie = (aEvent) => {
    const row = aEvent.target.parentElement;
    const movie = this.#movies[row.rowIndex - 1];
    editMovie = movie;
    const bodyContent = document.getElementById("body-content");
    bodyContent.innerHTML = "<add-edit-movie-page></add-edit-movie-page>";
  };

  #addMovie(aMovie){
    const row = document.createElement("tr");
    row.style.cursor = "pointer";
    row.addEventListener("click", this.#editMovie);
    //Legger til tittel
    let td = document.createElement("td");
    td.textContent = aMovie.title;
    row.appendChild(td);
    
    //Legger til regissør
    td = document.createElement("td");
    td.textContent = aMovie.director;
    row.appendChild(td);

    //Legger til år
    td = document.createElement("td");
    td.textContent = aMovie.year;
    row.appendChild(td);

    //Legger til sjanger
    td = document.createElement("td");
    td.textContent = aMovie.genre.join(", ");
    row.appendChild(td);

    //Legger til rating
    td = document.createElement("td");
    td.textContent = aMovie.rating.toString();
    row.appendChild(td);

    //Legg til raden i tabellen
    this.#htmlTable.appendChild(row);
  }

  #loadMovies(){
    //Oppdater antall filmer i totalMovies
    const totalMovies = this.shadowRoot.getElementById("totalMovies");
    totalMovies.textContent = this.#movies.length.toString();
    //Vi må tømme tabellen før vi legger til nye rader
    const tableBody = this.shadowRoot.getElementById("table-body");
    tableBody.innerHTML = "";
    //Lage dynamiske rader for hver film
    for(let i = 0; i < this.#movies.length; i++){
      const movie = this.#movies[i];
      this.#addMovie(movie);
    }

  }

  #onAddMovie = () => {
    const bodyContent = document.getElementById("body-content");
    bodyContent.innerHTML = "<add-edit-movie-page></add-edit-movie-page>";
  };

  #sortMovieList(aMovie1, aMovie2){
    if(movieSortColumnName === "Title"){
      return aMovie1.title.localeCompare(aMovie2.title);
    }
    if(movieSortColumnName === "Director"){
      return aMovie1.director.localeCompare(aMovie2.director);
    }
    if(movieSortColumnName === "Year"){
      return aMovie1.year - aMovie2.year;
    }
    if(movieSortColumnName === "Rating"){
      return aMovie1.rating - aMovie2.rating;
    }
    if(movieSortColumnName === "Genre"){
      const genre1 = aMovie1.genre.join(", ");
      const genre2 = aMovie2.genre.join(", ");
      return genre1.localeCompare(genre2);
    }
  }

  #onSortMovies = (aEvent) => {
    console.log(`sorterer på ${aEvent.target.textContent}`);
    movieSortColumnName = aEvent.target.textContent;
    if(oldSortColumnName === movieSortColumnName){
      this.#movies.reverse();      
      oldSortColumnName = "";
    }else{
      this.#movies.sort(this.#sortMovieList);
      oldSortColumnName = movieSortColumnName;
    }
    this.#loadMovies();
  }

  render(){
    const template = document.getElementById("my-movies-page-template");
    const content = template.content.cloneNode(true);
    this.shadowRoot.appendChild(content);
    this.#htmlTable = this.shadowRoot.getElementById("table-body");
    //Sjekk om det finne en ny film som skal legges til
    if(newMovie){
      this.#movies.push(newMovie);
      newMovie = null;
    }

    this.#loadMovies();
    const addMovieButton = this.shadowRoot.getElementById("add-movie-button");
    addMovieButton.addEventListener("click", this.#onAddMovie);
    let columnHeader = this.shadowRoot.getElementById("movie-col-title");
    columnHeader.addEventListener("click", this.#onSortMovies);
    columnHeader = this.shadowRoot.getElementById("movie-col-director");
    columnHeader.addEventListener("click", this.#onSortMovies);
    columnHeader = this.shadowRoot.getElementById("movie-col-year");
    columnHeader.addEventListener("click", this.#onSortMovies);
    columnHeader = this.shadowRoot.getElementById("movie-col-genre");
    columnHeader.addEventListener("click", this.#onSortMovies);
    columnHeader = this.shadowRoot.getElementById("movie-col-rating");
    columnHeader.addEventListener("click", this.#onSortMovies);
    const jsonMovies = JSON.stringify(this.#movies);
    localStorage.setItem("movieList", jsonMovies);
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
    let movie = null;
    let editMode = false;
    if(editMovie !== null){
      movie = editMovie;
      editMovie = null;
      editMode = true;
    }else{
      movie = new TMovie();
    }

    movie.title = this.#titleElement.value;
    movie.director = this.#directorElement.value;
    movie.year = this.#yearElement.value;
    movie.rating = this.#ratingElement.value;
    movie.genre = [];
    for(let i = 0; i < this.#genreElements.length; i++){
      //Oppgaven nå er nå å legge til kun de valgte sjangerne!
      const genreElement = this.#genreElements[i];
      if(genreElement.checked){
        movie.genre.push(genreElement.value);
      }
    }
    console.log(movie);
    if(!editMode){
      newMovie = movie;
    }
    
    const bodyContent = document.getElementById("body-content");
    bodyContent.innerHTML = "<movies-page></movies-page>";
  }

  #onCancel = () => {
    editMovie = null;
    newMovie = null;
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
    this.shadowRoot.getElementById("cancel-button").addEventListener("click", this.#onCancel);
    if(editMovie){
      //Her må vi fylle ut feltene med informasjon fra editMovie
      console.log(editMovie);
      this.#titleElement.value = editMovie.title;
      this.#directorElement.value = editMovie.director;
      this.#yearElement.value = editMovie.year;
      this.#ratingElement.value = Math.floor(parseFloat(editMovie.rating));
      for(let i = 0; i < this.#genreElements.length; i++){
        const genreElement = this.#genreElements[i];
        for(let j=0; j < editMovie.genre.length; j++){
          if(genreElement.value === editMovie.genre[j]){
            genreElement.checked = true;
          }
        }
      }
    }

  }
}

customElements.define("add-edit-movie-page", TMovieForm);

