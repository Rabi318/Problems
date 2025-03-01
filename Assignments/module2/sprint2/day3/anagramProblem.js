/* problem statement
 An anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

For example, the word anagram can be rearranged into

nag a ram

Given 2 strings (S1 and S2), write a program that detects if both are anagrams of each other.

If they are anagrams, print

True

Else print False 
*/

function anagramDetector(S1, S2) {
  let str1 = S1.replace(/\s+/g, "").toLowerCase();
  let str2 = S2.replace(/\s+/g, "").toLowerCase();
  if (str1.length !== str2.length) {
    console.log("False");
    return;
  }

  let sortedStr1 = str1.split("").sort().join("");
  let sortedStr2 = str2.split("").sort().join("");

  console.log(sortedStr1 === sortedStr2 ? "True" : "False");
}
