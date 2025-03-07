const Book = require("./books");

function Member(name, borrowedBooks = []) {
  this.name = name;
  this.borrowedBooks = borrowedBooks;
}

Member.prototype.borrowBook = function (book) {
  if (this.borrowedBooks.lenght < 3) {
    console.log(`${this.name} can not borrow more than 3 books`);
    return;
  }
  if (book.isAvailable) {
    book.isAvailable = false;
    this.borrowedBooks.push(book);
    console.log(`${book.title} is borrowed by ${this.name}`);
  } else {
    console.log("Book is already Borrowed");
  }
};

function PremiumMember(
  name,
  borrowedBooks = [],
  specialCollectionAccess = true
) {
  const premiumMember = Object.create(Member.prototype);
  premiumMember.name = name;
  premiumMember.borrowedBooks = borrowedBooks;
  premiumMember.specialCollectionAccess = specialCollectionAccess;
  return premiumMember;
}

PremiumMember.prototype.borrowBook = function (book) {
  if (this.borrowedBooks.length >= 5) {
    console.log(`${this.name} can not borrow more than 5 books`);
    return;
  }
  if (book.isAvailable) {
    book.isAvailable = false;
    this.borrowedBooks.push(book);
    console.log(`${book.title} is borrowed by ${this.name}`);
  } else {
    console.log("Book is already Borrowed");
  }
};

PremiumMember.prototype.borrowBookWithCall = function (book) {
  if (this.borrowedBooks.length >= 5) {
    console.log(`${this.name} can not borrow more than 5 books`);
    return;
  }
  if (book.isAvailable) {
    book.isAvailable = false;
    this.borrowedBooks.push(book);
    console.log(`${book.title} is borrowed by ${this.name}`);
  } else {
    console.log("Book is already Borrowed");
  }
};

module.exports = { Member, PremiumMember };
