"use strict";
class VendingMachine {
    constructor() {
        this.idleState = new IdleState(this);
        this.processingState = new ProcessingState(this);
        this.dispensingState = new DispensingState(this);
        this.currentState = this.idleState;
    }
    // State setters and getters
    setState(state) {
        this.currentState = state;
    }
    getIdleState() {
        return this.idleState;
    }
    getProcessingState() {
        return this.processingState;
    }
    getDispensingState() {
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
class IdleState {
    constructor(machine) {
        this.machine = machine;
    }
    insertCoin() {
        console.log("Coin inserted. Moving to processing state.");
        this.machine.setState(this.machine.getProcessingState());
    }
    selectProduct() {
        console.log("Insert coin first.");
    }
    dispense() {
        console.log("Nothing to dispense. Insert coin and make selection.");
    }
}
class ProcessingState {
    constructor(machine) {
        this.machine = machine;
    }
    insertCoin() {
        console.log("Coin already inserted.");
    }
    selectProduct() {
        console.log("Product selected. Dispensing...");
        this.machine.setState(this.machine.getDispensingState());
    }
    dispense() {
        console.log("Select a product first.");
    }
}
class DispensingState {
    constructor(machine) {
        this.machine = machine;
    }
    insertCoin() {
        console.log("Please wait, dispensing in progress.");
    }
    selectProduct() {
        console.log("Already dispensing.");
    }
    dispense() {
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
