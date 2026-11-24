// External modeules
const express = require("express");

const app = express();

app.use("/", (req, res, next) => {
  console.log("Came in first middleware", req.url, req.method);
  next();
});

app.use("/submit-user-data", (req, res, next) => {
  console.log("Came in second middleware", req.url, req.method);
  res.send("<h1> Welcome to Express tutorials </h1>");
});

app.use("/", (req, res, next) => {
  console.log("Came in another middleware", req.url, req.method);
  res.send("<h1> Came from another middleware </h1>");
});
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on address http://localhost:${PORT}`);
});
