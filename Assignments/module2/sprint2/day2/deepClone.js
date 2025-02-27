function deepClone(obj) {
  const jsonString = JSON.stringify(obj);
  const clonedObj = JSON.parse(jsonString);
  return clonedObj;
}

const original = { name: "Alice", hobbies: ["reading", "traveling"] };

const cloned = deepClone(original);

cloned.hobbies.push("coding");

console.log("Original:", original);
console.log("Clone:", cloned);
