// External Modules
const express = require("express");
const userRouter = express.Router();

// Local Modules
const homesController = require("../controller/homes");

userRouter.get("/", homesController.getHomes);

module.exports = userRouter;
