"use strict";
import { printOut } from "../../common/script/utils.mjs";

// Random, 0.0 til 0.9999

// Alle tall fra og med 100 og 110

let rnd = Math.random();
printOut("random: " + rnd);

rnd = rnd * 11;
printOut("random: " + rnd);

rnd = Math.floor(rnd) + 100;
printOut("random: " + rnd);
printOut("-------------------------");

rnd = Math.floor( Math.random() * 11 ) + 100;
printOut(rnd);