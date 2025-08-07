class Car {
  brand: string;
  engine: string;
  color: string;
  sunroof: boolean;
  automaticTransmission: boolean;

  constructor(builder: CarBuilder) {
    this.brand = builder.brand;
    this.engine = builder.engine;
    this.color = builder.color;
    this.sunroof = builder.sunroof;
    this.automaticTransmission = builder.automaticTransmission;
  }
  public display(): void {
    console.log("Car Details:");
    console.log(`Brand: ${this.brand}`);
    console.log(`Engine: ${this.engine}`);
    console.log(`Color: ${this.color}`);
    console.log(`Sunroof: ${this.sunroof}`);
    console.log(`Automatic Transmission: ${this.automaticTransmission}`);
  }
}

class CarBuilder {
  brand: string = "";
  engine: string = "";
  color: string = "";
  sunroof: boolean = false;
  automaticTransmission: boolean = false;
  public setBrand(brand: string): CarBuilder {
    this.brand = brand;
    return this;
  }

  public setEngine(engine: string): CarBuilder {
    this.engine = engine;
    return this;
  }

  public setColor(color: string): CarBuilder {
    this.color = color;
    return this;
  }

  public addSunroof(): CarBuilder {
    this.sunroof = true;
    return this;
  }
  public setAutomaticTransmission(): CarBuilder {
    this.automaticTransmission = true;
    return this;
  }

  public build(): Car {
    return new Car(this);
  }
}

function main() {
  const teslaModelS = new CarBuilder()
    .setBrand("Tesla Model S")
    .setEngine("Electric")
    .setColor("Black")
    .addSunroof()
    .setAutomaticTransmission()
    .build();

  teslaModelS.display();
}

main();
