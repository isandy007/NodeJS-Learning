const fs = require("fs");

console.log("1. Before reading the file");

// Synchronous (blocking) operation
console.log("2. Reading the file synchronously...");
const dataSync = fs.readFileSync("user-details.txt", "utf8");
console.log("3. Synchronous read complete.");

// Asynchronous (blocking) operation
console.log("4. Reading the file asynchronously...");
fs.readFile("user-details.txt", "utf8", (err, dataAsync) => {
  if (err) throw err;
  console.log("5. Asynchronous read complete.");
});

console.log("6. End of the script.");
