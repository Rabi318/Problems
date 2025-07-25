abstract class ACDuck {
  swin(): void {
    console.log("I can swin");
  }
  abstract sound(): void;

  abstract flight(): void;
}

class ACIndianDuck extends ACDuck {
  sound(): void {
    console.log("Quack Quack");
  }
  flight(): void {
    console.log("I can fly 1km");
  }
}

const abobj = new ACIndianDuck();
abobj.swin();
