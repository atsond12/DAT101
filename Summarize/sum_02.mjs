"use strict";
import { printOut, newLine } from "../../common/script/utils.mjs";
let text = "";
const sep = " ";

//1. initializations, 2. comparison, 3. increment/decrement
for(let i = 1; i <= 10; i++ /* i = i + 1, i += 1 */){
    //text = text + i.toString() + " ";
    //text += i.toString() + " ";
    text += `${i}${sep}`;
}
printOut(text);
