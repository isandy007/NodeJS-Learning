const Favourite = require("../models/favourite");
const Home = require("../models/home");

exports.getIndex = (req, res, next) => {
  Home.fetchAll().then(([rows]) => {
    res.render("store/index", {
      homes: rows,
      pageTitle: "Welcome to airbnb",
      currentPage: "index",
    });
  });
};

exports.getHomes = (req, res, next) => {
  Home.fetchAll().then(([rows]) => {
    res.render("store/home-list", {
      homes: rows,
      pageTitle: "Homes list",
      currentPage: "home",
    });
  });
};

exports.getBookings = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "My Bookings",
    currentPage: "bookings",
  });
};

exports.getFavouriteList = (req, res, next) => {
  Promise.all([Favourite.getFavourite(), Home.fetchAll()])

    .then(([[favouriteRows], [homes]]) => {
      const favouriteIds = favouriteRows.map((row) => String(row.homeId));

      const favouriteHomes = homes.filter((home) =>
        favouriteIds.includes(String(home.id)),
      );

      res.render("store/favourite-list", {
        favouriteHomes: favouriteHomes,
        pageTitle: "My Favourites",
        currentPage: "favourites",
      });
    })

    .catch(next);
};

exports.postAddToFavourite = (req, res, next) => {
  const homeId = req.body.id;

  Favourite.addToFavourite(homeId)
    .then(() => {
      res.redirect("/favourites");
    })
    .catch(next);
};

exports.postRemoveFromFavourite = (req, res, next) => {
  const homeId = req.params.homeId;
  Favourite.deleteHomeById(homeId)
    .then(() => {
      res.redirect("/favourites");
    })
    .catch(next);
};

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.getHomeById(homeId).then(([homes]) => {
    const homeFound = homes[0];
    if (!homeFound) {
      console.log("Home is not found");
      res.redirect("/homes");
    } else {
      res.render("store/home-detail", {
        home: homeFound,
        pageTitle: "Home detail",
        currentPage: "home",
      });
    }
  });
};
