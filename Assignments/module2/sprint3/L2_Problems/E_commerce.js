function Product(name, price) {
  this.name = name;
  this.price = price;
}

Product.prototype.getDetails = function () {
  return `Product: ${this.name}, Price:${this.price}, Quantity: ${this.quantity}`;
};

function Electronic(name, price, quantity, brand, model) {
  const electronic = Object.create(Product.prototype);
  electronic.name = name;
  electronic.price = price;
  electronic.quantity = quantity;
  electronic.brand = brand;
  electronic.model = model;
  return electronic;
}

Electronic.prototype.powerOff = function () {
  console.log(`${this.model} is now powered off.`);
};

function Clothing(name, price, quantity, size, color) {
  const clothing = Object.create(Product.prototype);
  clothing.name = name;
  clothing.price = price;
  clothing.quantity = quantity;
  clothing.size = size;
  clothing.color = color;
  return clothing;
}
Clothing.prototype.getSize = function () {
  return `This item is size ${this.size}`;
};

Clothing.prototype.getColor = function () {
  return `This item is color ${this.color}`;
};

function Books(name, price, quantity, author, genre) {
  const books = Object.create(Product.prototype);
  books.name = name;
  books.price = price;
  books.quantity = quantity;
  books.author = author;
  books.genre = genre;
  return books;
}

Books.prototype.getAuthor = function () {
  return `The author of this book is ${this.author}`;
};
Books.prototype.getGenre = function () {
  return `The genre of this book is ${this.genre}`;
};
const laptop = new Electronic("Laptop", 50000, 10, "Lenovo", "Ideapad Gaming");
console.log(laptop.getDetails());

const tShirt = new Clothing("T-shirt", 250, 5, "M", "Blue");
console.log(tShirt.getDetails());

const book = new Books(
  "JavaScript for Beginners",
  30,
  100,
  "Lue Viten",
  "Programming"
);
console.log(book.getDetails());
