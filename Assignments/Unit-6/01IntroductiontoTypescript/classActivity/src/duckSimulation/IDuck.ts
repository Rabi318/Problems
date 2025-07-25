interface IDuck {
  swin(): void;
  sound(): void;
  fly(): void;
}

class IDuckIndianDuck implements IDuck {
  swin(): void {
    console.log("I know swimming");
  }
  sound(): void {
    console.log("Quack Quack");
  }
  fly(): void {
    console.log("I can fly 1km");
  }
}

const obj = new IDuckIndianDuck();
obj.swin();
