const inputs = [
  "electronics",
  "clothing",
  "electronics",
  "toys",
  "clothing",
  "toys",
  "toys",
];
function CountCategory(inputs) {
  const categoryCount = inputs.reduce((acc, category) => {
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});
  const sortedEntries = Object.entries(categoryCount).sort(
    (a, b) => a[1] - b[1]
  );

  const sortedObject = Object.fromEntries(sortedEntries);

  return sortedObject;
}
console.log(CountCategory(inputs));
