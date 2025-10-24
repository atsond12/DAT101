"use strict";

const container = document.getElementById("container");
let input = document.createElement("input");
input.type = "text";
input.placeholder = "Skriv inn brukernavn";
container.appendChild(input);
input = document.createElement("input");
input.type="button";
input.value="Log in";
container.appendChild(input);