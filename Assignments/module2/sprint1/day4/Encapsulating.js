function createBankAccount(initialBalance) {
  let balance = initialBalance;

  return {
    deposit: function (amount) {
      if (amount > 0) {
        balance += amount;
      }
      return balance;
    },
    withdraw: function (amount) {
      if (amount > 0 && amount <= balance) {
        balance -= amount;
      }
      return balance;
    },
    getBalance: function () {
      return balance;
    },
  };
}
const account = createBankAccount(1000);
console.log(account.deposit(500));
console.log(account.getBalance());
console.log(account.withdraw(200));
console.log(account.getBalance());
