interface PaymentStrategy {
  pay(amount: number): void;
}

class CardPayment implements PaymentStrategy {
  pay(amount: number): void {
    console.log(`Paid ₹${amount} using Card`);
  }
}

class UPIPayment implements PaymentStrategy {
  pay(amount: number): void {
    console.log(`Paid ₹${amount} using UPI`);
  }
}

class BitcoinPayment implements PaymentStrategy {
  pay(amount: number): void {
    console.log(`Paid ₹${amount} using Bitcoin`);
  }
}

class Payment {
  private strategy: PaymentStrategy;

  constructor(strategy: PaymentStrategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: PaymentStrategy): void {
    this.strategy = strategy;
  }

  process(amount: number): void {
    this.strategy.pay(amount);
  }
}

const payment = new Payment(new CardPayment());
payment.process(1000); // Output: Paid ₹1000 using Card

payment.setStrategy(new BitcoinPayment());
payment.process(2000); // Output: Paid ₹2000 using Bitcoin

payment.setStrategy(new UPIPayment());
payment.process(1500); // Output: Paid ₹1500 using UPI
