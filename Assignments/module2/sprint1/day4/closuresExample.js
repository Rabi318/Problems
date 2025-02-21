function Outerfun() {
  let messaage = "Hello from outer function";
  return function inerfun() {
    console.log(messaage);
  };
}

const closure = Outerfun();
closure();
