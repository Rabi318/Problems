// Book interface
interface Book {
  getCategory(): string;
}

// PremiumBook class implements Book
class PremiumBook implements Book {
  constructor(private title: string, private price: number) {}

  getCategory(): string {
    return "Premium Book";
  }
}

// RegularBook class implements Book
class RegularBook implements Book {
  constructor(private title: string, private price: number) {}

  getCategory(): string {
    return "Regular Book";
  }
}

// BookFactory class
class BookFactory {
  static createBook(title: string, price: number): Book {
    if (price > 1000) {
      return new PremiumBook(title, price);
    } else {
      return new RegularBook(title, price);
    }
  }
}
