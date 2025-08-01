"use strict";
// 2. Concrete Character Classes
class Warrior {
    constructor(name) {
        this.name = name;
    }
    getStats() {
        return `Warrior ${this.name} - Strength: 90, Defense: 80`;
    }
}
class Archer {
    constructor(name) {
        this.name = name;
    }
    getStats() {
        return `Archer ${this.name} - Agility: 80, Strength: 40`;
    }
}
class Mage {
    constructor(name) {
        this.name = name;
    }
    getStats() {
        return `Mage ${this.name} - Intelligence: 90, Mana: 100`;
    }
}
// 3. Factory Class
class CharacterFactory {
    static createCharacter(type, name) {
        switch (type.toLowerCase()) {
            case "warrior":
                return new Warrior(name);
            case "archer":
                return new Archer(name);
            case "mage":
                return new Mage(name);
            default:
                throw new Error(`Unsupported character type: ${type}`);
        }
    }
}
const archer = CharacterFactory.createCharacter("Archer", "Eldrin");
console.log(archer.getStats());
const mage = CharacterFactory.createCharacter("Mage", "Gandalf");
console.log(mage.getStats());
const warrior = CharacterFactory.createCharacter("Warrior", "Thorin");
console.log(warrior.getStats());
