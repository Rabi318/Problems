// Observer interface
interface Observer {
  update(): void;
}

// Concrete Observer: Smartphone
class Smartphone implements Observer {
  update(): void {
    console.log("Smartphone received notification");
  }
}

// Concrete Observer: Tablet
class Tablet implements Observer {
  update(): void {
    console.log("Tablet received notification");
  }
}

// Subject: NotificationCenter
class NotificationCenter {
  private observers: Observer[] = [];

  attach(observer: Observer): void {
    this.observers.push(observer);
    console.log(`Observer added: ${observer.constructor.name}`);
  }

  detach(observer: Observer): void {
    this.observers = this.observers.filter((obs) => obs !== observer);
    console.log(`Observer removed: ${observer.constructor.name}`);
  }

  notify(): void {
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
