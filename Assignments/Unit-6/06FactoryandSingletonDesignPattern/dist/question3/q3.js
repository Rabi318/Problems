"use strict";
// 2. Concrete implementations
class EmailNotifier {
    send(message) {
        console.log(`Sending EMAIL: ${message}`);
    }
}
class SMSNotifier {
    send(message) {
        console.log(`Sending SMS: ${message}`);
    }
}
class PushNotifier {
    send(message) {
        console.log(`Sending PUSH: ${message}`);
    }
}
// 3. Factory class
class NotifierFactory {
    static createNotifier(type) {
        switch (type.toLowerCase()) {
            case "email":
                return new EmailNotifier();
            case "sms":
                return new SMSNotifier();
            case "push":
                return new PushNotifier();
            default:
                throw new Error(`Unsupported notifier type: ${type}`);
        }
    }
}
const email = NotifierFactory.createNotifier("email");
email.send("Welcome!");
const sms = NotifierFactory.createNotifier("sms");
sms.send("Your OTP is 123456");
const push = NotifierFactory.createNotifier("push");
push.send("You have a new message");
