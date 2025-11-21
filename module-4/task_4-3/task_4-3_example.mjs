"use strict";

const CarTypes = [
  { value: 1, caption: "Aston Martin" },
  { value: 2, caption: "Bentley" },
  { value: 3, caption: "Alfa Romeo" },
  { value: 4, caption: "Ferrari" },
  { value: 5, caption: "Subaru" },
  { value: 6, caption: "Porsche" },
  { value: 7, caption: "Tesla" },
  { value: 8, caption: "Toyota" },
  { value: 9, caption: "Renault" },
  { value: 10, caption: "Peugeot" },
  { value: 11, caption: "Suzuki" },
  { value: 12, caption: "Mitsubishi" },
  { value: 13, caption: "Nissan" },
];

const GirlsNames = ["Anne", "Inger", "Kari", "Marit", "Ingrid", "Liv", "Eva", "Berit", "Astrid", "Bjørg", "Hilde", "Anna", "Solveig", "Marianne", "Randi", "Ida", "Nina", "Maria", "Elisabeth", "Kristin"];

const MovieGenre = [
  "Action",
  "Adventure",
  "Animation",
  "Biography",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "Film Noir",
  "History",
  "Horror",
  "Music",
  "Musical",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Short",
  "Sport",
  "Superhero",
  "Thriller",
  "War",
  "Western",
];

//--- Part 1 ----------------------------------------------------------------------------------------------
/* Put your code below here!*/
function cmbTask1CalculateClick() {
  const txtTask1Output = document.getElementById("txtTask1Output");
  const txtRectHeight = document.getElementById("txtRectHeight");
  const txtRectWidth = document.getElementById("txtRectWidth");
  const width = parseInt(txtRectWidth.value);
  const height = parseInt(txtRectHeight.value);
  const area = width * height;
  const perimeter = 2 * (width + height);
  txtTask1Output.innerHTML = `width: ${width}, height: ${height}`;
  txtTask1Output.innerHTML += `<br/>Circumference = ${perimeter}, Area = ${area}`;
}

let cmbTask1Calculate = document.getElementById("cmbTask1Calculate");
cmbTask1Calculate.onclick = cmbTask1CalculateClick;
//--- Part 2 ----------------------------------------------------------------------------------------------
/* Put your code below here!*/

function txtTask2WordKeyPress(aEvent){
  const txtTask2Output = document.getElementById("txtTask2Output");
  //txtTask2Output.innerHTML = `You pressed the key: ${aEvent.key}`;
  if(aEvent.key === "Enter"){
    const word = txtTask2Word.value;
    task2Words.push(word);
    txtTask2Output.innerHTML = `You have entered ${task2Words.length} words: <br/>`;
    txtTask2Output.innerHTML += task2Words.join(", ");
    txtTask2Word.value = "";
  }
}

const txtTask2Word = document.getElementById("txtTask2Word");
txtTask2Word.addEventListener("keypress", txtTask2WordKeyPress);
const task2Words = [];


//--- Part 3 ----------------------------------------------------------------------------------------------
/* Put your code below here!*/


//--- Part 4 ----------------------------------------------------------------------------------------------
/* Put your code below here!*/

//--- Part 5 ----------------------------------------------------------------------------------------------
/* Put your code below here!*/

//--- Part 6 ----------------------------------------------------------------------------------------------
/* Put your code below here!*/

//--- Part 7 ----------------------------------------------------------------------------------------------
/* Put your code below here!*/
