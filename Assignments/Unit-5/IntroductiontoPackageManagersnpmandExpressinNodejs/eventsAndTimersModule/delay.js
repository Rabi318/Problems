function delayMessage(message, time) {
  return new Promise((resolve, reject) => {
    if (!message || isNaN(time)) {
      reject(new Error("Invalid message or time"));
    } else {
      setTimeout(() => {
        resolve(message);
      }, Number(time));
    }
  });
}

module.exports = delayMessage;
