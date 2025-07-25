/**
 * Polymorphism : many + forms
 * compile-time
 * run time
 *
 * how to achive 3 ways
 * Mehod overloading
 * Method overriding
 * Object substitution
 *
 */

class PolyDuck {
  fly() {
    console.log("I can fly");
  }
}

class ChildDuck1 extends PolyDuck {}
class ChildDuck2 extends PolyDuck {}

const childDuck1 = new ChildDuck1();
