function encryptIt(S, K) {
  // write code here
  let encrypted = "";

  for (let char of S) {
    if (char >= "A" && char <= "Z") {
      // Rotate uppercase letters
      encrypted += String.fromCharCode(
        ((char.charCodeAt(0) - 65 + K) % 26) + 65
      );
    } else if (char >= "a" && char <= "z") {
      // Rotate lowercase letters
      encrypted += String.fromCharCode(
        ((char.charCodeAt(0) - 97 + K) % 26) + 97
      );
    } else if (char >= "0" && char <= "9") {
      // Rotate digits
      encrypted += String.fromCharCode(
        ((char.charCodeAt(0) - 48 + K) % 10) + 48
      );
    } else {
      // Keep symbols unchanged
      encrypted += char;
    }
  }

  console.log(encrypted);
}

encryptIt("All-convoYs-9-be:Alert1.", 4);
