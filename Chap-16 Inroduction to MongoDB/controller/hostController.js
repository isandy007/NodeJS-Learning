const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
  res.render("host/edit-home", {
    pageTitle: "Register Your Home on AirBnB",
    currentPage: "addHome",
    editing: false,
  });
};

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";

  Home.getHomeById(homeId)
    .then((home) => {
      if (!home) {
        console.log("Home not found for editing");
        return res.redirect("/host/host-home-list");
      }

      res.render("host/edit-home", {
        home: home,
        pageTitle: "Edit Your Home",
        currentPage: "host-homes",
        editing: editing,
      });
    })
    .catch(next);
};

exports.getHostHomes = (req, res, next) => {
  Home.fetchAll().then((rows) => {
    res.render("host/host-home-list", {
      homes: rows,
      pageTitle: "Host homes list",
      currentPage: "host-homes",
    });
  });
};

exports.postAddHome = (req, res, next) => {
  const { houseName, price, location, rating, photoURL, description } =
    req.body;
  const home = new Home(
    houseName,
    price,
    location,
    rating,
    photoURL,
    description,
  );
  home
    .save()
    .then(() => {
      console.log("Home added successfuly");
      res.redirect("/host/host-home-list");
    })
    .catch((error) => {
      console.log("Error found during adding home:", error);
    });
};

exports.postEditHome = (req, res, next) => {
  const { id, houseName, price, location, rating, photoURL, description } =
    req.body;

  const homeData = {
    houseName,
    price,
    location,
    rating,
    photoURL,
    description,
  };

  Home.updateHomeById(id, homeData)
    .then((result) => {
      if (result.matchedCount === 0) {
        return res.redirect("/host/host-home-list");
      }

      res.redirect("/host/host-home-list");
    })
    .catch(next);
};

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;

  Home.deleteHomeById(homeId)
    .then(() => {
      res.redirect("/host/host-home-list");
    })
    .catch(next);
};
