class Book {
  title: string;
  author: string;
  reviews: string[];

  constructor(title: string, author: string, reviews: string[]) {
    this.title = title;
    this.author = author;
    this.reviews = reviews;
  }
  public clone(): Book {
    // Deep copy of the reviews array
    const copiedReviews = [...this.reviews]; // Creates a new array with same strings
    return new Book(this.title, this.author, copiedReviews);
  }

  public display(): void {
    console.log(`Title: ${this.title}`);
    console.log(`Author: ${this.author}`);
    console.log(`Reviews: ${this.reviews.join(", ")}`);
  }
}

function main() {
  const originalReviews = ["Excellent read", "Very detailed"];
  const originalBook = new Book(
    "Design Patterns",
    "Erich Gamma",
    originalReviews
  );

  const clonedBook = originalBook.clone();
  clonedBook.reviews.push("Loved the Prototype pattern!");

  console.log("Original Book:");
  originalBook.display();

  console.log("\nCloned Book:");
  clonedBook.display();
}

main();
