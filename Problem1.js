class NameConverter {
  // Check if the input is  string then split the number of words
  splitWords(input) {
    if (typeof input !== "string") {
      throw new Error("Enter a string input");
    }
    return input.trim().split(/[\s-_]+/);
  }

  // Convert the word style into a Pascal
  toPascalCase(input) {
    const words = this.splitWords(input);
    const pascalWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    );
    return pascalWords.join("");
  }

  // Convert the word style into a Kebab
  toKebabCase(input) {
    const words = this.splitWords(input);
    return words.map((word) => word.toLowerCase()).join("-");
  }
  // Convert the word style into a Camel
  toCamelCase(input) {
    const pascal = this.toPascalCase(input);
    return pascal.charAt(0).toLowerCase() + pascal.slice(1);
  }

  // Convert the word style into a Snake
  toSnakeCase(input) {
    const words = this.splitWords(input);
    return words.map((word) => word.toLowerCase()).join("_");
  }
}

const converter1 = new NameConverter();
console.log("Case 1: \n");
console.log(converter1.toPascalCase("hello_word"));
console.log(converter1.toKebabCase("hello_word"));
console.log(converter1.toSnakeCase("hello_word"));
console.log(converter1.toCamelCase("hello_word"));

console.log("\n");

const converter2 = new NameConverter();
console.log("Case 2: \n");
console.log(converter2.toPascalCase("hello word"));
console.log(converter2.toKebabCase("hello word"));
console.log(converter2.toSnakeCase("hello word"));
console.log(converter2.toCamelCase("hello word"));
