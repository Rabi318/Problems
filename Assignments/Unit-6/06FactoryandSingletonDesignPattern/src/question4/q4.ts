// 1. Character Interface
interface GameCharacter {
  getStats(): string;
}

// 2. Concrete Character Classes
class Warrior implements GameCharacter {
  constructor(private name: string) {}

  getStats(): string {
    return `Warrior ${this.name} - Strength: 90, Defense: 80`;
  }
}

class Archer implements GameCharacter {
  constructor(private name: string) {}

  getStats(): string {
    return `Archer ${this.name} - Agility: 80, Strength: 40`;
  }
}

class Mage implements GameCharacter {
  constructor(private name: string) {}

  getStats(): string {
    return `Mage ${this.name} - Intelligence: 90, Mana: 100`;
  }
}

// 3. Factory Class
class CharacterFactory {
  static createCharacter(type: string, name: string): GameCharacter {
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
