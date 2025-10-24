"use strict";
import { printOut, newLine } from "../../common/script/utils.mjs";

const AccountTypes = {
  Normal: "Brukskonto",
  Saving: "Sparekonto",
  Credit: "Kredittkonto",
  Pensjon: "Pensjonskonto",
};

class TBankAccount {
  #type = 0;
  #balance = 0;
  #withdrawCount = 0;

  constructor(aType) {
    this.#type = aType;
  }

  toString() {
    return this.#type;
  }

  setType(aType) {
    let txtOut = "The account type has change from " + this.toString();
    this.#type = aType;
    txtOut += " to " + this.toString();
    printOut(txtOut);
  }

  getBalance() {
    return this.#balance;
  }

  deposit(aAmount) {
    this.#withdrawCount = 0;
    this.#balance += aAmount;
    printOut("Deposit of " + aAmount + ", new balance is " + this.#balance);
  }

  withdraw(aAmount) {
    switch (this.#type) {
      case AccountTypes.Pensjon:
        printOut("You can not withdraw from " + this.#type);
        return;
      case AccountTypes.Saving:
        this.#withdrawCount++;
        if(this.#withdrawCount <= 3){
          printOut("You can not withdraw from " + this.#type + " more than three times");
          return;
        }
        break;
    }
    this.#balance -= aAmount;
    printOut("Withdraw of " + aAmount + ", new balance is " + this.#balance);
  }
}

printOut("--- Part 1 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
// Print all these types on a single comma-separated line:
// Get all object values:
const accountTypeValues = Object.values(AccountTypes);
// Join them in a single string with commas:
const part1Text = accountTypeValues.join(", ");
// Print the result:
printOut(part1Text);
printOut(newLine);

printOut("--- Part 2 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/

const myAccount = new TBankAccount(AccountTypes.Normal);
myAccount.setType(AccountTypes.Saving);

printOut(newLine);

printOut("--- Part 3 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
myAccount.deposit(100);
myAccount.withdraw(25);
printOut("My account balance is " + myAccount.getBalance());

printOut(newLine);

printOut("--- Part 4 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
myAccount.deposit(25);
myAccount.withdraw(30);
myAccount.withdraw(30);
myAccount.withdraw(30);
myAccount.withdraw(30);

printOut(newLine);

printOut("--- Part 5 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
printOut("Replace this with you answer!");
printOut(newLine);

printOut("--- Part 6 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
printOut("Replace this with you answer!");
printOut(newLine);

printOut("--- Part 7 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
printOut("Replace this with you answer!");
printOut(newLine);
