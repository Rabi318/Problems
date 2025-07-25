"use strict";
class CardPayment {
    pay(amount) {
        console.log(`Paid ₹${amount} using Card`);
    }
}
class UPIPayment {
    pay(amount) {
        console.log(`Paid ₹${amount} using UPI`);
    }
}
class BitcoinPayment {
    pay(amount) {
        console.log(`Paid ₹${amount} using Bitcoin`);
    }
}
class Payment {
    constructor(strategy) {
        this.strategy = strategy;
    }
    setStrategy(strategy) {
        this.strategy = strategy;
    }
    process(amount) {
        this.strategy.pay(amount);
    }
}
const payment = new Payment(new CardPayment());
payment.process(1000); // Output: Paid ₹1000 using Card
payment.setStrategy(new BitcoinPayment());
payment.process(2000); // Output: Paid ₹2000 using Bitcoin
payment.setStrategy(new UPIPayment());
payment.process(1500); // Output: Paid ₹1500 using UPI
