class Employee {
  #id;
  #name;
  #email;
  #salary;
  #hireDate;
  constructor(id, name, email, salary, hireDate) {
    this.#id = id;
    this.#name = name;
    this.#email = email;
    this.#salary = salary;
    this.#hireDate = hireDate;
  }
  get id() {
    return this.#id;
  }
  set id(value) {
    if (typeof value !== "number" || value <= 0) {
      console.log("Id must be a positive number");
      return;
    } else {
      this.#id = value;
    }
  }

  get name() {
    return this.#name;
  }
  set name(value) {
    if (typeof value !== "string" || value.length < 3) {
      console.log("Name must be at least 3 characters long");
      return;
    } else {
      this.#name = value;
    }
  }
  get email() {
    return this.#email;
  }
  set email(value) {
    if (typeof value !== "string" || value.indexOf("@") === -1) {
      console.log("Invalid email format");
      return;
    } else {
      this.#email = value;
    }
  }
  get salary() {
    return this.#salary;
  }
  set salary(value) {
    if (value < 0) {
      console.log("Salary must be a positive number");
      return;
    } else {
      this.#salary = value;
    }
  }
  get hireDate() {
    return this.#hireDate;
  }
  set hireDate(value) {
    if (typeof value !== "string" || value.length < 10) {
      console.log("Hire date must be in YYYY-MM-DD format");
      return;
    } else {
      this.#hireDate = value;
    }
  }

  get Details() {
    return `ID: ${this.#id}, Name: ${this.#name}, Email: ${
      this.#email
    }, Salary: ${this.#salary}, Hire Date: ${this.#hireDate}`;
  }
  calculateCompensation() {
    return this.#salary;
  }
}

// class FullTimeEmployee extends Employee {
//   constructor(id, name, email, salary, hireDate, benefits, retirementPlan) {
//     super(id, name, email, salary, hireDate);
//     this.benefits = benefits;
//     this.retirementPlan = retirementPlan;
//   }
//   get benefits() {
//     return this.benifits;
//   }
//   set benefits(value) {
//     if (typeof value !== "string" || value.length < 3) {
//       console.log("Benifits must be at least 3 characters long");
//       return;
//     } else {
//       this.benifits = value;
//     }
//   }

//   get retirementPlan() {
//     return this.retirementPlan;
//   }
//   set retirementPlan(value) {
//     if (typeof value !== "string" || value.length < 3) {
//       console.log("Retirement Plan must be at least 3 characters long");
//       return;
//     } else {
//       this.retirementPlan = value;
//     }
//   }
//   calculateCompensation() {
//     return this.salary + 4000;
//   }
//   getFullTimeDetails() {
//     return `${super.Details}, Benifits: ${this.benifits}, Retirement Plan: ${
//       this.retirementPlan
//     }`;
//   }
// }

class FullTimeEmployee extends Employee {
  constructor(id, name, email, salary, hireDate, benefits, retirementPlan) {
    super(id, name, email, salary, hireDate);
    this._benefits = benefits;
    this._retirementPlan = retirementPlan;
  }

  get benefits() {
    return this._benefits;
  }

  set benefits(value) {
    if (typeof value !== "string" || value.length < 3) {
      console.log("Benefits must be at least 3 characters long");
      return;
    } else {
      this._benefits = value;
    }
  }

  get retirementPlan() {
    return this._retirementPlan;
  }

  set retirementPlan(value) {
    if (typeof value !== "string" || value.length < 3) {
      console.log("Retirement Plan must be at least 3 characters long");
      return;
    } else {
      this._retirementPlan = value;
    }
  }

  calculateCompensation() {
    return this.salary + 4000;
  }

  getFullTimeDetails() {
    return `${super.Details}, Benefits: ${this._benefits}, Retirement Plan: ${
      this._retirementPlan
    }`;
  }
}

class PartTimeEmployee extends Employee {
  constructor(id, name, email, hireDate, hourlyRate, hoursPerWeek) {
    super(id, name, email, hireDate);
    this._hourlyRatehourlyRate = hourlyRate;
    this._hoursPerWeek = hoursPerWeek;
  }
  get hourlyRate() {
    return this._hourlyRate;
  }
  set hourlyRate(value) {
    if (typeof value !== "number" || value <= 0) {
      console.log("Hourly Rate must be a positive number");
      return;
    } else {
      this._hourlyRate = value;
    }
  }

  get hoursPerWeek() {
    return this._hoursPerWeek;
  }

  set hoursPerWeek(value) {
    if (value <= 0 || value > 40) {
      console.log("Hours Per Week must be between 1 and 40");
      return;
    } else {
      this._hoursPerWeek = value;
    }
  }
  calculateCompensation() {
    return this._hourlyRate * this._hoursPerWeek * 4;
  }
  getPartTimeDetails() {
    return `${super.Details}, Hourly Rate: ${
      this._hourlyRate
    }, Hours Per Week: ${this._hoursPerWeek}`;
  }
}

class Contractor extends Employee {
  constructor(id, name, email, hireDate, skills, durations) {
    super(id, name, email, hireDate);
    this.skills = skills;
    this.durations = durations;
  }
  get durations() {
    return this.durations;
  }
  set durations(value) {
    if (value <= 0) {
      console.log("Durations must be a positive number");
      return;
    } else {
      this.durations = value;
    }
  }
  get skills() {
    return this.skills;
  }
  set skills(value) {
    if (!Array.isArray(value) || value.length === 0) {
      console.log("Skills must be an array with at least one skill");
      return;
    } else {
      this.skills = value;
    }
  }

  calculateCompensation() {
    return this.salary * this.durations;
  }
  getContractorDetails() {
    return `${super.Details}, Skills: ${this.skills}, Durations: ${
      this.durations
    }`;
  }
}

const fEmployee = new FullTimeEmployee(
  1,
  "Babu",
  "babu@gmail.com",
  60000,
  "2022-01-01",
  "Health Insurance",
  "Plan"
);
console.log(fEmployee.getFullTimeDetails());

const ptEmployee = new PartTimeEmployee(
  2,
  "Bob",
  "bob@example.com",
  0,
  "2024-01-01",
  25,
  20
);
console.log(ptEmployee.getPartTimeDetails());
