interface Printable {
  print(): void;
}

interface Scannable {
  scan(): void;
}

interface Faxable {
  fax(): void;
}

class OldPrinter implements Printable {
  print(): void {
    console.log("Printing document...");
  }
}

class SmartPrinter implements Printable, Scannable, Faxable {
  print(): void {
    console.log("Printing document...");
  }

  scan(): void {
    console.log("Scanning document...");
  }

  fax(): void {
    console.log("Faxing document...");
  }
}

const basicPrinter = new OldPrinter();
basicPrinter.print();

const smartPrinter = new SmartPrinter();
smartPrinter.print();
