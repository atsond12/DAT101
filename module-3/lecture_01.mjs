"use strict"
import {printOut} from "../../common/script/utils.mjs";

const text1 = "Du er gammel nok til å ta med en som ikke er  gammel nok.";
const text2 = "Du kan gå på kino!";
const text3 = "Beklager, du er ikke gammel nok!";

const ageMovie = 16;
const ageBringAlong = 18;
let age1 = 15; // Gammel nok til å ta med seg en peron under 16.
let age2 = 19; // Personen er ikke gammel nok til å gå alene.

if(age1 < age2){
  const age1Old = age1;
  age1 = age2;
  age2 = age1Old;
}

if(age1 >= ageMovie){
  printOut("Person 1: " + text2);
  if(age2 >= ageMovie){
    printOut(text2);
  }else if(age1 >= ageBringAlong){
    printOut("Person 1: " + text1);
    printOut("Person 2: " + text2);
  }else{
    printOut("Person 2: " + text3);
  }
}else{
  printOut("Vi har ingen case for dette!!!");
}


