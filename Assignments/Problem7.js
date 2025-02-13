let sentenceBuilder = {
  subject: "I",
  verb: "am",
  object: "coding",
  invalidPropertyFlag: false,

  // Method to build the sentence
  buildSentence: function () {
    if (!this.subject || !this.verb || !this.object) {
      return "Incomplete sentence";
    }

    if (this.invalidPropertyFlag) {
      return "Invalid property";
    }

    return this.subject + " " + this.verb + " " + this.object;
  },

  // Method to update a property dynamically
  updateProperty: function (property, value) {
    this.invalidPropertyFlag = false;

    if (property === "subject") {
      this[property] = value;
      if (value === "The cat" && !this.verb.startsWith("is")) {
        this.verb = "is " + this.verb.split(" ")[1];
      }
    } else if (property === "verb" || property === "object") {
      this[property] = value;
    } else {
      this.invalidPropertyFlag = true;
      return "Invalid property";
    }
  },
};

// Example usage:

console.log(sentenceBuilder.buildSentence());

sentenceBuilder.updateProperty("verb", "am learning");

console.log(sentenceBuilder.buildSentence());

sentenceBuilder.updateProperty("subject", "The cat");

console.log(sentenceBuilder.buildSentence());

sentenceBuilder.updateProperty("mood", "happy");
console.log(sentenceBuilder.buildSentence());

sentenceBuilder.updateProperty("verb", "");
console.log(sentenceBuilder.buildSentence());
