require("dotenv").config();
//Core modules
const path = require("path");

// External Modules
const express = require("express");
const session = require("express-session");
const mongoDBStore = require("connect-mongodb-session")(session);

// Local Modules
const storeRouter = require("./routes/storeRouter");
const hostRouter = require("./routes/hostRouter");
const authRouter = require("./routes/authRouter");
const rootDir = require("./utils/pathUtil");
const errorsController = require("./controller/errors");
const mongoose = require("mongoose");

const app = express();
app.set("view engine", "ejs");
app.set("views", "views");

const store = new mongoDBStore({
  uri: process.env.MONGO_URI,
  collection: "sessions",
});

app.use(express.urlencoded());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
  }),
);

app.use((req, res, next) => {
  req.isLoggedIn = req.session.isLoggedIn;
  next();
});

app.use(authRouter);
app.use(storeRouter);
app.use("/host", (req, res, next) => {
  const isLoggedIn = req.isLoggedIn || false;
  if (isLoggedIn) {
    next();
  } else {
    res.redirect("/login");
  }
});
app.use("/host", hostRouter);

app.use(express.static(path.join(rootDir, "public")));

app.use(errorsController.pageNotFound);

const PORT = 3000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on address http://localhost:${PORT}`);
    });
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err);
  });
