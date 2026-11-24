//Core modules
const path = require("path");

// External Modules
const express = require("express");
const hostRouter = express.Router();

// Local Modules
const rootDir = require("../utils/pathUtil");

hostRouter.get("/add-home", (req, res, next) => {
  res.render("addHome", { pageTitle: "Register Your Home on AirBnB" });
});

const registeredHomes = [];

hostRouter.post("/add-home", (req, res, next) => {
  console.log(
    "Home registration successful for:",
    req.body,
    req.body.houseName,
  );
  registeredHomes.push({
    houseName: req.body.houseName,
    houseAddress: req.body.houseAddress,
  });
  res.render("homeAdded", { pageTitle: "Home added successfully" });
});

exports.hostRouter = hostRouter;
exports.registeredHomes = registeredHomes;
