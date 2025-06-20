module.exports = (action, book, readerName) => {
  console.log(
    `[${new Date().toISOString()}] ${readerName} ${action} "${book.title}"`
  );
};
