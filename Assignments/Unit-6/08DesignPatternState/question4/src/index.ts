//ATMState Interface
interface ATMState {
  insertCard(): void;
  enterPin(pin: number): void;
  withdrawCash(amount: number): void;
}

//Define the ATMContext
class ATM {
  private idleState: ATMState;
  private cardInsertedState: ATMState;
  private authenticatedState: ATMState;
  private dispensingState: ATMState;

  private currentState: ATMState;

  constructor() {
    this.idleState = new IdleState(this);
    this.cardInsertedState = new CardInsertedState(this);
    this.authenticatedState = new AuthenticatedState(this);
    this.dispensingState = new DispensingCashState(this);

    this.currentState = this.idleState;
  }

  // State transitions
  setState(state: ATMState) {
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

  enterPin(pin: number) {
    this.currentState.enterPin(pin);
  }

  withdrawCash(amount: number) {
    this.currentState.withdrawCash(amount);
  }
}

//Implement All State Classes
class IdleState implements ATMState {
  constructor(private atm: ATM) {}

  insertCard(): void {
    console.log("💳 Card inserted. Please enter your PIN.");
    this.atm.setState(this.atm.getCardInsertedState());
  }

  enterPin(pin: number): void {
    console.log("❌ No card inserted.");
  }

  withdrawCash(amount: number): void {
    console.log("❌ Please insert card and authenticate first.");
  }
}

class CardInsertedState implements ATMState {
  constructor(private atm: ATM) {}

  insertCard(): void {
    console.log("❌ Card already inserted.");
  }

  enterPin(pin: number): void {
    if (pin === 1234) {
      console.log("✅ PIN accepted. You can withdraw cash.");
      this.atm.setState(this.atm.getAuthenticatedState());
    } else {
      console.log("❌ Incorrect PIN.");
    }
  }

  withdrawCash(amount: number): void {
    console.log("❌ Enter PIN before withdrawing.");
  }
}

class AuthenticatedState implements ATMState {
  constructor(private atm: ATM) {}

  insertCard(): void {
    console.log("❌ Card already inserted and authenticated.");
  }

  enterPin(pin: number): void {
    console.log("✅ Already authenticated.");
  }

  withdrawCash(amount: number): void {
    console.log(`💵 Dispensing $${amount}...`);
    this.atm.setState(this.atm.getDispensingState());
  }
}

class DispensingCashState implements ATMState {
  constructor(private atm: ATM) {}

  insertCard(): void {
    console.log("⏳ Please wait. Dispensing in progress.");
  }

  enterPin(pin: number): void {
    console.log("⏳ Dispensing in progress. Please wait.");
  }

  withdrawCash(amount: number): void {
    console.log("⏳ Already dispensing cash.");
  }

  completeDispense(): void {
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
