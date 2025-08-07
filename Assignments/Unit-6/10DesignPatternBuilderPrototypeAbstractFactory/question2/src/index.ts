class GameCharacter {
  name: string;
  level: number;
  weapon: string;

  constructor(name: string, level: number, weapon: string) {
    this.name = name;
    this.level = level;
    this.weapon = weapon;
  }
  public clone(): GameCharacter {
    return new GameCharacter(this.name, this.level, this.weapon);
  }
  public display(): void {
    console.log(
      `Name: ${this.name}, Level: ${this.level}, Weapon: ${this.weapon}`
    );
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
