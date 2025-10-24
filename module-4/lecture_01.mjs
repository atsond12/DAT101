"use strict";
import { printOut, newLine} from "../../common/script/utils.mjs";

const Person = { fName: "", lName: "" };
const persons = [];

function addNewPerson(aFName, aLName) {
  const newPerson = Object.create(Person);
  newPerson.fName = aFName;
  newPerson.lName = aLName;
  persons.push(newPerson);
}

addNewPerson("Arne-Thomas", "Aas");
addNewPerson("Truls", "Jensen");
addNewPerson("Nina", "Nilsen");
addNewPerson("Hans", "Hansen")

let text = "Personer:<br />";
for(let i = 0; i < persons.length; i++){
  const person = persons[i];
  text += person.fName + " " + person.lName + "<br />";
}

printOut(text);

