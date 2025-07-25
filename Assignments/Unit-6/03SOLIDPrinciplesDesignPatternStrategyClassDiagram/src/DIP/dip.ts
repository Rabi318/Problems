interface Database {
  save(data: string): void;
}

class MySQLService implements Database {
  save(data: string): void {
    console.log("Saving to MySQL:", data);
  }
}

class UserService {
  private db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  register(user: string): void {
    this.db.save(user);
  }
}

const mysql = new MySQLService();
const userService = new UserService(mysql);

userService.register("Alice");
