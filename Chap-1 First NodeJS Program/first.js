console.log("Hello, World! I am about to be an developer.");

const fs = require("fs");
fs.writeFile("output.txt", "Writing file again", (err) => {
  if (err) console.log("Eror occured");
  else console.log("File is written succesfully.");
});
