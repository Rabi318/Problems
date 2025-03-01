function startCountdown() {
  let seconds = parseInt(prompt("Enter the number of seconds:"));
  if (isNaN(seconds) || seconds <= 0) {
    console.log("Invalid input. Please enter a positive number.");
    return;
  }
  let countdown = setInterval(() => {
    console.log(`Time remaining: ${seconds} seconds`);
    seconds--;
    if (seconds < 0) {
      clearInterval(countdown);
      console.log("Time's up!");
    }
  }, 1000);

  setTimeout(() => {
    document.addEventListener("keydown", (event) => {
      if (event.key.toLowerCase() === "s") {
        clearInterval(countdown);
        console.log("Countdown stopped.");
      }
    });
  }, 100);
}
startCountdown();
