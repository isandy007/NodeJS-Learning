const runtime = () => {
  // Reference Error: x is not defined
  console.log(x);

  // Type error (num is not a function)
  let num = 5;
  num();

  // Invalid JSON parse (syntax error)
  let jsonString = "{name: 'John'}"; // Invalid JSON format (single quotes and missing    double quotes around the key)
  let parsedData = JSON.parse(jsonString);

  // File not found error (fs module)
  const fs = require("fs");
  fs.readFileSync("nonExistentFile.txt"); //Throws error ENOENT: (file not found)
};

module.exports = runtime;
