"use strict";
// PremiumBook class implements Book
class PremiumBook {
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }
    getCategory() {
        return "Premium Book";
    }
}
// RegularBook class implements Book
class RegularBook {
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }
    getCategory() {
        return "Regular Book";
    }
}
// BookFactory class
class BookFactory {
    static createBook(title, price) {
        if (price > 1000) {
            return new PremiumBook(title, price);
        }
        else {
            return new RegularBook(title, price);
        }
    }
}
