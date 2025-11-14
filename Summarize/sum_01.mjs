"use strict";
import { printOut, newLine } from "../../common/script/utils.mjs";
let inputAge1 = document.getElementById("inputAge1");
let inputAge2 = document.getElementById("inputAge2");

const adultLimit = 18;
const ageMovieLimit = 15;

let age1 = 0;
let age2 = 0;

document.getElementById("cmbOk").addEventListener("click", (aEvent) => {
  age1 = parseInt(inputAge1.value);
  age2 = parseInt(inputAge2.value);

  if(age2 > age1){
    let tempAge = age1;
    age1 = age2; 
    age2 = tempAge;
  }

  if(age1 >= ageMovieLimit){
    printOut("Person 1 can go to the movie.");
    if(age2 >= ageMovieLimit){
      printOut("Person 2 can go to the movie.");
    }else if(age1 >= adultLimit){
      printOut("Person 2 can go along with Person 1");
    }else{
      printOut("Person 2 cannot go to the movie.");
    }
  }else{
    printOut("Person 1 cannot go to the movie.");
    if(age2 > ageMovieLimit){
      printOut("Person 2 can go to the movie.");
    }else{
      printOut("Person 2 cannot go to the movie.");
    }
  }

  printOut(age1);
  printOut(age2);
});
