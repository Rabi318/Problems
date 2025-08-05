"use strict";
//Define the ATMContext
class ATM {
    constructor() {
        this.idleState = new IdleState(this);
        this.cardInsertedState = new CardInsertedState(this);
        this.authenticatedState = new AuthenticatedState(this);
        this.dispensingState = new DispensingCashState(this);
        this.currentState = this.idleState;
    }
    // State transitions
    setState(state) {
        this.currentState = state;
    }
    getIdleState() {
        return this.idleState;
    }
    getCardInsertedState() {
        return this.cardInsertedState;
    }
    getAuthenticatedState() {
        return this.authenticatedState;
    }
    getDispensingState() {
        return this.dispensingState;
    }
    // Delegated methods
    insertCard() {
        this.currentState.insertCard();
    }
    enterPin(pin) {
        this.currentState.enterPin(pin);
    }
    withdrawCash(amount) {
        this.currentState.withdrawCash(amount);
    }
}
//Implement All State Classes
class IdleState {
    constructor(atm) {
        this.atm = atm;
    }
    insertCard() {
        console.log("💳 Card inserted. Please enter your PIN.");
        this.atm.setState(this.atm.getCardInsertedState());
    }
    enterPin(pin) {
        console.log("❌ No card inserted.");
    }
    withdrawCash(amount) {
        console.log("❌ Please insert card and authenticate first.");
    }
}
class CardInsertedState {
    constructor(atm) {
        this.atm = atm;
    }
    insertCard() {
        console.log("❌ Card already inserted.");
    }
    enterPin(pin) {
        if (pin === 1234) {
            console.log("✅ PIN accepted. You can withdraw cash.");
            this.atm.setState(this.atm.getAuthenticatedState());
        }
        else {
            console.log("❌ Incorrect PIN.");
        }
    }
    withdrawCash(amount) {
        console.log("❌ Enter PIN before withdrawing.");
    }
}
class AuthenticatedState {
    constructor(atm) {
        this.atm = atm;
    }
    insertCard() {
        console.log("❌ Card already inserted and authenticated.");
    }
    enterPin(pin) {
        console.log("✅ Already authenticated.");
    }
    withdrawCash(amount) {
        console.log(`💵 Dispensing $${amount}...`);
        this.atm.setState(this.atm.getDispensingState());
    }
}
class DispensingCashState {
    constructor(atm) {
        this.atm = atm;
    }
    insertCard() {
        console.log("⏳ Please wait. Dispensing in progress.");
    }
    enterPin(pin) {
        console.log("⏳ Dispensing in progress. Please wait.");
    }
    withdrawCash(amount) {
        console.log("⏳ Already dispensing cash.");
    }
    completeDispense() {
        console.log("✅ Cash dispensed. Returning to idle.");
        this.atm.setState(this.atm.getIdleState());
    }
}
//Usage
const atm = new ATM();
atm.withdrawCash(299);
atm.insertCard();
atm.enterPin(1234);
atm.withdrawCash(200);
