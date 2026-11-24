//Core modules
const path = require("path");

// External Modules
const express = require("express");
const hostRouter = express.Router();

// Local Modules
const rootDir = require("../utils/pathUtil");

hostRouter.get("/add-home", (req, res, next) => {
  res.render("addHome", {
    pageTitle: "Register Your Home on AirBnB",
    currentPage: "addHome",
  });
});

const registeredHomes = [];

hostRouter.post("/add-home", (req, res, next) => {
  console.log("Home registration successful for:", req.body);
  registeredHomes.push(req.body);
  res.render("homeAdded", {
    pageTitle: "Home added successfully",
    currentPage: "addHome",
  });
});

exports.hostRouter = hostRouter;
exports.registeredHomes = registeredHomes;
