const fs = require("fs");
const csv = require("csv-parser");

// Function to read data from a CSV file
function loadData(file) {
  return new Promise((resolve, reject) => {
    const data = [];
    fs.createReadStream(file) // Read CSV file as a stream
      .pipe(csv()) // Parse CSV content
      .on("data", (row) => {
        // Convert 'Result' to a boolean value
        row.Result = String(row.Result).trim().toLowerCase() === "true";
        data.push(row); // Add each row to the data array
      })
      .on("end", () => resolve(data)) // Resolve the promise when done
      .on("error", (error) => reject(error)); // Reject if an error occurs
  });
}

// Function to calculate win rates for each characteristic
function winRatesCalculation(data) {
  // Calculate overall win rate
  const allWinsRate = data.filter((row) => row.Result).length / data.length;

  // Define categories to evaluate
  const suits = ["Diamonds", "Hearts", "Spades", "Joker"];
  const animals = ["Lion", "Fox", "Parrot", "Seal", "Snake"];
  const fruits = ["Apple", "Bananas", "Mango", "Watermelon"];

  // Initialize rating objects for each category
  const suitRating = {};
  const animalRating = {};
  const fruitRating = {};

  // Calculate win rates for each suit
  suits.forEach((suit) => {
    const suitData = data.filter((row) => row["Card Suit"] === suit);
    suitRating[suit] =
      suitData.length > 0
        ? suitData.filter((row) => row.Result).length / suitData.length
        : allWinsRate; // Default to overall rate if no data
  });

  // Calculate win rates for each animal
  animals.forEach((animal) => {
    const animalData = data.filter((row) => row["Animal Name"] === animal);
    animalRating[animal] =
      animalData.length > 0
        ? animalData.filter((row) => row.Result).length / animalData.length
        : allWinsRate;
  });

  // Calculate win rates for each fruit
  fruits.forEach((fruit) => {
    const fruitData = data.filter((row) => row.Fruit === fruit);
    fruitRating[fruit] =
      fruitData.length > 0
        ? fruitData.filter((row) => row.Result).length / fruitData.length
        : allWinsRate;
  });

  return { allWinsRate, suitRating, animalRating, fruitRating };
}

// Function to calculate the probability of beating the boss
function probabilityToBeatBoss(
  suit,
  animal,
  fruit,
  suitRating,
  animalRating,
  fruitRating
) {
  // Get probabilities from the ratings
  const probSuit = suitRating[suit] || 0;
  const probAnimal = animalRating[animal] || 0;
  const probFruit = fruitRating[fruit] || 0;

  // Combine probabilities by averaging (assuming they are independent)
  const combinedProb = (probSuit + probAnimal + probFruit) / 3;

  return combinedProb;
}

// Test cases
(async () => {
  try {
    // Load data from CSV and process it
    const data = await loadData("prediction.csv");

    // Calculate win rates for each characteristic
    const { suitRating, animalRating, fruitRating } = winRatesCalculation(data);

    // Predict the probability of beating the boss
    const predProb = probabilityToBeatBoss(
      "Hearts", // Suit
      "Lion", // Animal
      "Mango", // Fruit
      suitRating,
      animalRating,
      fruitRating
    );

    // Display the predicted probability as a percentage
    console.log(
      `Probability to beat the boss: ${(predProb * 100).toFixed(1)}%`
    );
  } catch (error) {
    console.error("Error loading or processing data:", error);
  }
})();
