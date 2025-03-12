function Book(title, author, year) {
  this.title = title;
  this.author = author;
  this.year = year;
  this.isCheckedOut = false;
}

//Method to toggle the checkout status
Book.prototype.toggleCheckOutStatus = function () {
  this.isCheckedOut = !this.isCheckedOut;
};

Book.prototype.getBookInfo = function () {
  return `${this.title} by ${this.author} (published in ${
    this.year
  }) - checkout: ${this.isCheckedOut ? "Yes" : "No"}`;
};

const books = [
  new Book("The Kill a Mockingbird", "Harper Lee", 1960),
  new Book("Rick Dad Poor Dad", "Robert T. Kiyosaki", 1997),
  new Book("Think and Grow Rich", "Nepoleon Hill", 1937),
  new Book("Atomic Habits", "James Clear", "2018"),
  new Book("How to Win Friends and Influence People", "Dale Carnegie", 1936),
];
books[0].toggleCheckOutStatus();
books[2].toggleCheckOutStatus();

books.forEach((book) => {
  console.log(book.getBookInfo());
});
