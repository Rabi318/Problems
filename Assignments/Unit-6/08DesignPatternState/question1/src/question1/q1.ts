interface State {
  insertCoin(): void;
  selectProduct(): void;
  dispense(): void;
}

class VendingMachine {
  private idleState: State;
  private processingState: State;
  private dispensingState: State;

  private currentState: State;

  constructor() {
    this.idleState = new IdleState(this);
    this.processingState = new ProcessingState(this);
    this.dispensingState = new DispensingState(this);

    this.currentState = this.idleState;
  }

  // State setters and getters
  setState(state: State) {
    this.currentState = state;
  }

  getIdleState(): State {
    return this.idleState;
  }

  getProcessingState(): State {
    return this.processingState;
  }

  getDispensingState(): State {
    return this.dispensingState;
  }

  // Action methods that delegate to the current state
  insertCoin() {
    this.currentState.insertCoin();
  }

  selectProduct() {
    this.currentState.selectProduct();
  }

  dispense() {
    this.currentState.dispense();
  }
}

class IdleState implements State {
  constructor(private machine: VendingMachine) {}

  insertCoin(): void {
    console.log("Coin inserted. Moving to processing state.");
    this.machine.setState(this.machine.getProcessingState());
  }

  selectProduct(): void {
    console.log("Insert coin first.");
  }

  dispense(): void {
    console.log("Nothing to dispense. Insert coin and make selection.");
  }
}

class ProcessingState implements State {
  constructor(private machine: VendingMachine) {}

  insertCoin(): void {
    console.log("Coin already inserted.");
  }

  selectProduct(): void {
    console.log("Product selected. Dispensing...");
    this.machine.setState(this.machine.getDispensingState());
  }

  dispense(): void {
    console.log("Select a product first.");
  }
}

class DispensingState implements State {
  constructor(private machine: VendingMachine) {}

  insertCoin(): void {
    console.log("Please wait, dispensing in progress.");
  }

  selectProduct(): void {
    console.log("Already dispensing.");
  }

  dispense(): void {
    console.log("Product dispensed. Returning to idle state.");
    this.machine.setState(this.machine.getIdleState());
  }
}

const vendingMachine = new VendingMachine();

vendingMachine.selectProduct();
vendingMachine.dispense();
vendingMachine.insertCoin();
vendingMachine.insertCoin();

vendingMachine.selectProduct();
vendingMachine.insertCoin();

vendingMachine.dispense();
