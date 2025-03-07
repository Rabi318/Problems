const { Member, PremiumMember } = require("./members");
const { Book } = require("./books");

const book1 = new Book("The Great Gatsby", "F. Scott Fitzgerald", true);
const book2 = new Book("1984", "George Orwell", true);

const member1 = new Member("Jann joi");
const premiumMember1 = new PremiumMember("Babu Sona");

member1.borrowBook(book1);
premiumMember1.borrowBook(book2);
