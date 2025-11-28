"use strict";
import { printOut, newLine } from "../../common/script/utils.mjs";

class TCDAlbum{
  #artist;
  #title;
  #year;
  #genre;
  constructor(aArtist, aTitle, aYear, aGenre){
    this.#artist = aArtist;
    this.#title = aTitle;
    this.#year = aYear;
    this.#genre = aGenre;
    this.rating = 0;
  }
  
  printOut(){
    printOut(`artist : ${this.#artist}, title : ${this.#title}, year : ${this.#year}, genre : ${this.#genre}, rating : ${this.rating}`);
  }
}

function ValidateData(artist, title, year, genre){
  let isValid = true;
  if(artist === ""){
    isValid = false;
    alert("Artist is required");
  }
  if(title === ""){
    isValid = false;
    alert("Title is required");
  }
  if(year === "" || isNaN(year) || year < 1900 || year > new Date().getFullYear()){
    isValid = false;
    alert("Year is invalid");
  }
  if(genre === ""){
    isValid = false;
    alert("Genre is required");
  }
  return isValid;
}

function ButtonAddClick(){
  const artist = txtArtist.value;
  const title = txtTitle.value;
  const year = txtYear.value;
  const genre = txtGenre.value;
  if(ValidateData(artist, title, year, genre)){
    const newCD = new TCDAlbum(artist, title, year, genre);
    cds.push(newCD);
  }
}

function ButtonShowClick(){

  for(let i = 0; i < cds.length; i++){
    cds[i].printOut();
  }
}

const cds = [];
const txtArtist = document.getElementById("txtArtist");
const txtTitle = document.getElementById("txtTitle");
const txtYear = document.getElementById("txtYear");
const txtGenre = document.getElementById("txtGenre");
//const txtRating = document.getElementById("txtRating");
const btnAdd = document.getElementById("btnAdd");
const btnShow = document.getElementById("btnShow");
btnAdd.addEventListener("click", ButtonAddClick);
btnShow.addEventListener("click", ButtonShowClick);