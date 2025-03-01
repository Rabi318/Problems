function interval() {
  let count = 1;
  let intervalId = setInterval(function () {
    console.log("Loading...", count++);
    if (count === 6) {
      console.log("Loaded successfully!");
      clearInterval(intervalId);
    }
  }, 1000);
}

interval();
