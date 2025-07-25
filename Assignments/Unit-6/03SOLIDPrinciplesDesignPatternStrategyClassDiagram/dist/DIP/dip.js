"use strict";
class MySQLService {
    save(data) {
        console.log("Saving to MySQL:", data);
    }
}
class UserService {
    constructor(db) {
        this.db = db;
    }
    register(user) {
        this.db.save(user);
    }
}
const mysql = new MySQLService();
const userService = new UserService(mysql);
userService.register("Alice");
