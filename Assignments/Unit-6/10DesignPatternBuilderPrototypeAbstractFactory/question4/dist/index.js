"use strict";
class Book {
    constructor(title, author, reviews) {
        this.title = title;
        this.author = author;
        this.reviews = reviews;
    }
    clone() {
        // Deep copy of the reviews array
        const copiedReviews = [...this.reviews]; // Creates a new array with same strings
        return new Book(this.title, this.author, copiedReviews);
    }
    display() {
        console.log(`Title: ${this.title}`);
        console.log(`Author: ${this.author}`);
        console.log(`Reviews: ${this.reviews.join(", ")}`);
    }
}
function main() {
    const originalReviews = ["Excellent read", "Very detailed"];
    const originalBook = new Book("Design Patterns", "Erich Gamma", originalReviews);
    const clonedBook = originalBook.clone();
    clonedBook.reviews.push("Loved the Prototype pattern!");
    console.log("Original Book:");
    originalBook.display();
    console.log("\nCloned Book:");
    clonedBook.display();
}
main();
