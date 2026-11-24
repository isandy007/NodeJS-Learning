const Favourite = require("../models/favourite");
const Home = require("../models/home");

exports.getIndex = (req, res, next) => {
  Home.find()
    .then((rows) => {
      res.render("store/index", {
        homes: rows,
        pageTitle: "Welcome to airbnb",
        currentPage: "index",
        isLoggedIn: req.isLoggedIn,
      });
    })
    .catch(next);
};

exports.getHomes = (req, res, next) => {
  Home.find()
    .then((rows) => {
      res.render("store/home-list", {
        homes: rows,
        pageTitle: "Homes list",
        currentPage: "home",
        isLoggedIn: req.isLoggedIn,
      });
    })
    .catch(next);
};

exports.getBookings = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "My Bookings",
    currentPage: "bookings",
    isLoggedIn: req.isLoggedIn,
  });
};

exports.getFavouriteList = (req, res, next) => {
  Favourite.find()
    .populate("houseId")
    .then((favourites) => {
      const favouriteHomes = favourites.map((favourite) => favourite.houseId);
      res.render("store/favourite-list", {
        favouriteHomes: favouriteHomes,
        pageTitle: "My Favourites",
        currentPage: "favourites",
        isLoggedIn: req.isLoggedIn,
      });
    })
    .catch(next);
};

exports.postAddToFavourite = (req, res, next) => {
  const homeId = req.body.id;

  Favourite.findOne({ houseId: homeId })
    .then((favourite) => {
      if (!favourite) {
        return Favourite.create({ houseId: homeId });
      }
    })
    .then(() => {
      res.redirect("/favourites");
    })
    .catch(next);
};

exports.postRemoveFromFavourite = (req, res, next) => {
  const homeId = req.params.homeId;
  Favourite.findOneAndDelete({ houseId: homeId })
    .then(() => {
      res.redirect("/favourites");
    })
    .catch(next);
};

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;

  Home.findById(homeId)
    .then((homeFound) => {
      if (!homeFound) {
        console.log("Home is not found");
        return res.redirect("/homes");
      }

      res.render("store/home-detail", {
        home: homeFound,
        pageTitle: "Home detail",
        currentPage: "home",
        isLoggedIn: req.isLoggedIn,
      });
    })
    .catch(next);
};
