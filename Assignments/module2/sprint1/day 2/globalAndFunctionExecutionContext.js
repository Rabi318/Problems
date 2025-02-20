let age = 24;

function displayAge() {
  console.log("Age before update : ", age);
}

function changeAge() {
  age = 30;
  console.log("After update : ", age);
}

displayAge();
changeAge();
displayAge();
