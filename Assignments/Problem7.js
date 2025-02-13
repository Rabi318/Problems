let sentenceBuilder = {
  subject: "I",
  verb: "am",
  object: "coding",
  invalidPropertyFlag: false, // Flag to track invalid property update

  // Method to build the sentence
  buildSentence: function () {
    // If any property is empty, return "Incomplete sentence"
    if (!this.subject || !this.verb || !this.object) {
      return "Incomplete sentence";
    }

    // If the flag is set to true, return "Invalid property"
    if (this.invalidPropertyFlag) {
      return "Invalid property";
    }

    // Otherwise, build the sentence if all properties exist
    return this.subject + " " + this.verb + " " + this.object; // Concatenate the sentence
  },

  // Method to update a property dynamically
  updateProperty: function (property, value) {
    // Reset the invalid property flag
    this.invalidPropertyFlag = false;

    // Check if the property exists and is valid
    if (property === "subject") {
      this[property] = value; // Update the subject
      // If the subject is "The cat", automatically set the verb to "is"
      if (value === "The cat" && !this.verb.startsWith("is")) {
        this.verb = "is " + this.verb.split(" ")[1]; // Maintain the action part (e.g., "learning")
      }
    } else if (property === "verb" || property === "object") {
      this[property] = value; // Update the verb or object
    } else {
      this.invalidPropertyFlag = true; // Set the flag if invalid property is updated
      return "Invalid property"; // Return error message for invalid property
    }
  },
};

// Example usage:

// Before updating, it will print the initial sentence: "I am coding"
console.log(sentenceBuilder.buildSentence()); // Output: "I am coding"

// Updating the verb to "am learning"
sentenceBuilder.updateProperty("verb", "am learning");
// Now it should print: "I am learning coding"
console.log(sentenceBuilder.buildSentence()); // Output: "I am learning coding"

// Update the subject to "The cat"
sentenceBuilder.updateProperty("subject", "The cat");
// The verb should automatically change to "is" and keep the action (learning)
console.log(sentenceBuilder.buildSentence()); // Output: "The cat is learning coding"

// Trying to update a non-existent property "mood"
sentenceBuilder.updateProperty("mood", "happy");
console.log(sentenceBuilder.buildSentence()); // Output: "Invalid property"

// Example 5: Updating the verb to an empty string
sentenceBuilder.updateProperty("verb", "");
console.log(sentenceBuilder.buildSentence()); // Output: "Incomplete sentence"
