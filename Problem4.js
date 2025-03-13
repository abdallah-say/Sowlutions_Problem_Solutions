// Function to check if a bracket sequence is valid
function isValidBracketSequence(s) {
  let stack = []; // Stack to keep track of open brackets

  // Object to map open brackets to their corresponding close brackets
  let bracketPairs = {
    "(": ")",
    "[": "]",
    "{": "}",
  };

  // Iterate through each character in the input string
  for (let i = 0; i < s.length; i++) {
    let char = s[i];

    // If the character is an open bracket, push it onto the stack
    if (bracketPairs[char]) {
      stack.push(char);
    } else if (char === ")" || char === "]" || char === "}") {
      // If it's a closing bracket, check if it matches the last open bracket

      // If the stack is empty, there's no matching open bracket
      if (stack.length === 0) return false;

      let lastOpen = stack.pop(); // Get the last open bracket

      // If the brackets don't match, the sequence is invalid
      if (bracketPairs[lastOpen] !== char) return false;
    }
  }

  // If the stack is empty, all brackets are matched and the sequence is valid
  return stack.length === 0;
}

// Test cases
console.log(isValidBracketSequence("()[]{}")); // true: All brackets are matched
console.log(isValidBracketSequence("([{}])")); // true: Nested brackets are matched
console.log(isValidBracketSequence("(")); // false: Open bracket with no matching close
console.log(isValidBracketSequence("[(]")); // false: Mismatched brackets
console.log(isValidBracketSequence("{[}]")); // false: Incorrect nesting order
