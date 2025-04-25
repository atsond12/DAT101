import { initPrintOut, printOut, newLine } from "../../common/script/utils.mjs";
initPrintOut(document.getElementById("txtOut"));

// Objekter og klasser 

// Vi gjør dette om til en klasse for alle mennesker med alder og navn
class TPerson{
    #health = 100; // privat felt
    constructor(aName, aAge) {
        this.name = aName;
        this.age = aAge;
    }

    greet() {
        printOut("Hello, my name is " + this.name + " and I am " + this.age + " years old.");
    }
}

const test1 = 5 + 9;
const test2 = "5" + "9";


class TEmployee extends TPerson{
    constructor(aName, aAge, aSalary) {
        super(aName, aAge); // Kaller konstruktøren til TPerson
        this.salary = aSalary;
    }

    greet() {
        super.greet(); // Kaller greet() fra TPerson
        printOut("I am an employee with a salary of " + this.salary + ".");
    }
}

class TAddress{
    #persons = [];
    constructor(aStreet, aCity) {
        this.street = aStreet;
        this.city = aCity;
    }

    printAddress() {
        printOut("Address: " + this.street + ", " + this.city);
    }

    addPerson(aPerson) {
        this.#persons.push(aPerson);
    }
}

const person1 = new TPerson("John Doe", 30);
const person2 = new TEmployee("Nils Nilsson", 25, 250000);

person1.greet();
person2.greet();


