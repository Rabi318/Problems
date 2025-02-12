//! Generate random password

function generatePassowrd(
  length,
  includeSpecialChars = false,
  includeNumbers = true
) {
  const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerCase = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const specialChars = "!@#$%^&*";

  let charSet = upperCase + lowerCase;

  if (includeNumbers) charSet += numbers;
  if (includeSpecialChars) charSet += specialChars;

  let password = "";
  password += upperCase[Math.floor(Math.random() * upperCase.length)];
  if (includeNumbers)
    password += numbers[Math.floor(Math.random() * numbers.length)];
  if (includeSpecialChars)
    password += specialChars[Math.floor(Math.random() * specialChars.length)];

  for (let i = password.length; i < length; i++) {
    password += charSet[Math.floor(Math.random() * charSet.length)];
  }

  return password;
}

const password = generatePassowrd(8, true, true);
console.log(password);
