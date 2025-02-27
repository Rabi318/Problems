function ModifyAndMerge(arr1, arr2) {
  let modifiedArr1 = arr1.slice();

  const index = modifiedArr1.indexOf("bike");
  if (index !== -1) {
    modifiedArr1.splice(index, 1, "bus", "scooter");
  }
  return modifiedArr1.concat(arr2);
}

let arr1 = ["car", "bike", "train"];
let arr2 = ["plane", "ship"];

console.log(ModifyAndMerge(arr1, arr2));
