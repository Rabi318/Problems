"use strict";
// Concrete Observer: Smartphone
class Smartphone {
    update() {
        console.log("Smartphone received notification");
    }
}
// Concrete Observer: Tablet
class Tablet {
    update() {
        console.log("Tablet received notification");
    }
}
// Subject: NotificationCenter
class NotificationCenter {
    constructor() {
        this.observers = [];
    }
    attach(observer) {
        this.observers.push(observer);
        console.log(`Observer added: ${observer.constructor.name}`);
    }
    detach(observer) {
        this.observers = this.observers.filter((obs) => obs !== observer);
        console.log(`Observer removed: ${observer.constructor.name}`);
    }
    notify() {
        for (const observer of this.observers) {
            observer.update();
        }
    }
}
// Example usage
const notificationCenter = new NotificationCenter();
const phone = new Smartphone();
const tablet = new Tablet();
notificationCenter.attach(phone);
notificationCenter.attach(tablet);
notificationCenter.notify();
