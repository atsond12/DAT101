"use strict"
import { printOut } from "../../common/script/utils.mjs";

const inputAge = document.getElementById("inputAge");
const inputSetAge = document.getElementById("inputSetAge");
inputSetAge.addEventListener("click", inputSetAgeClick);

printOut("Filmen har 18 års grense");

function inputSetAgeClick(){
    const age = parseInt(inputAge.value);
    if(age >= 18){
        printOut("Du kan gå på kino");
    }else{
        printOut("Beklager, spill heller et spill!");
    }
}