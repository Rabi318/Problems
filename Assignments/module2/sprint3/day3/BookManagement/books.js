function Book(title, autor, year) {
  this.title = title;
  this.autor = autor;
  this.year = year;
}

Book.prototype.getSummary = function () {
  return `${this.title} by ${this.autor}, published in ${this.year}`;
};

const books = [
  new Book("To Kill a Mockingbird", "Harper Lee", 1960),
  new Book("1984", "George Orwell", 1949),
  new Book("The Great Gatsby", "F. Scott Fitzgerald", 1925),
  new Book("Pride and Prejudice", "Jane Austen", 1813),
];

module.exports = books;
