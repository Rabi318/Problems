"use strict";
class PolyDuck {
    fly() {
        console.log("Generic duck flying...");
    }
}
class DesiDuck extends PolyDuck {
    fly() {
        console.log("DesiDuck flies at 10kmph");
    }
}
class VidesiDuck extends PolyDuck {
    fly() {
        console.log("VidesiDuck flies at 20kmph");
    }
}
class SmartDuck extends PolyDuck {
    fly() {
        console.log("SmartDuck flies at 50kmph");
    }
}
// Polymorphic function
function makeDuckFly(duck) {
    duck.fly();
}
makeDuckFly(new DesiDuck()); // Output: DesiDuck flies at 10kmph
makeDuckFly(new VidesiDuck()); // Output: VidesiDuck flies at 20kmph
makeDuckFly(new SmartDuck()); // Output: SmartDuck flies at 50kmph
class User {
    constructor(name, role) {
        this.orgCode = "DuckCorp";
        this.name = name;
        this.role = role;
    }
    introduce() {
        console.log(`I am ${this.name} from ${this.orgCode}`);
    }
}
class Manager extends User {
    getRole() {
        console.log(this.role); // Accessing protected member
    }
}
const user = new User("Daffy", "Employee");
user.introduce(); // Output: I am Daffy from DuckCorp
const mgr = new Manager("Daffy", "Manager");
mgr.getRole(); // Output: Manager
