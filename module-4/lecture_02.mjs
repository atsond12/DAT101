"use strict";
import { printOut, newLine} from "../../common/script/utils.mjs";

class TAddress{
  constructor(aStreet, aZip, aCity){
    this.street = aStreet;
    this.zip = aZip;
    this.city = aCity;
    this.country = "Norway";
  }
}

class TPerson extends TAddress{
  #firstName = "";
  #lastName = "";
  constructor(aFirstName, aLastName, aStreet, aZip, aCity){
    super(aStreet, aZip, aCity);
    this.#firstName = aFirstName;
    this.#lastName = aLastName;
  }

  getName(){
    return this.#firstName + " " + this.#lastName;
  }
}

const person = new TPerson("Ola", "Norman", "Måkeveien 22", "4990", "Oslo");
person.country = "Sweden";


class TBook{
  #ISBN = "";
  constructor(aISBN, aTitle, aAuthor, aGenre, aYear, aRating = 0){
    this.#ISBN = aISBN;
    this.title = aTitle;
    this.author = aAuthor;
    this.genre = aGenre;
    this.year = aYear;
    this.rating = aRating;
  }

  get ISBN(){
    return this.#ISBN;
  }
}

const book = new TBook("978-3-16-148410-0", "The Great Book", "John Doe", "Fiction", 2020, 4.5);
printOut(book);
book.ISBN = "123-123425-123-546";
printOut(book.ISBN);