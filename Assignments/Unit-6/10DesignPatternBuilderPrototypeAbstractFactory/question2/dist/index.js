"use strict";
class GameCharacter {
    constructor(name, level, weapon) {
        this.name = name;
        this.level = level;
        this.weapon = weapon;
    }
    clone() {
        return new GameCharacter(this.name, this.level, this.weapon);
    }
    display() {
        console.log(`Name: ${this.name}, Level: ${this.level}, Weapon: ${this.weapon}`);
    }
}
function main() {
    // Original character
    const warrior = new GameCharacter("Warrior", 10, "Sword");
    console.log("Original Character:");
    warrior.display();
    // Cloned character
    const warriorClone = warrior.clone();
    warriorClone.name = "Warrior Clone";
    console.log("\nCloned Character:");
    warriorClone.display();
}
main();
