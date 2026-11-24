//Core modules
const path = require("path");

//External Modules
const express = require("express");
const userRouter = express.Router();

// Local modules
const rootDir = require("../utils/pathUtil");

userRouter.get("/contact-us", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "contact-us.html"));
});

userRouter.post("/contact-us", (req, res, next) => {
  console.log(req.body);
  res.sendFile(path.join(rootDir, "views", "contact-success.html"));
});

module.exports = userRouter;
