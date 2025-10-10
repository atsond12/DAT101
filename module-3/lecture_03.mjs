"use strict";
import { printOut } from "../../common/script/utils.mjs";

let aNumber3 = 0;
aNumber3 = 3;

function sum(aNumber1, aNumber2, aNumber3 = 0, aNumber4 = 0){
  let calc = aNumber1 + aNumber2 + aNumber3 + aNumber4;
  return calc;
}
// Lambda
let result = sum(1,2);
printOut(result);

