"use strict";
class OldPrinter {
    print() {
        console.log("Printing document...");
    }
}
class SmartPrinter {
    print() {
        console.log("Printing document...");
    }
    scan() {
        console.log("Scanning document...");
    }
    fax() {
        console.log("Faxing document...");
    }
}
const basicPrinter = new OldPrinter();
basicPrinter.print();
const smartPrinter = new SmartPrinter();
smartPrinter.print();
