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

  Home.findById(homeId)
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
  Home.find()
    .then((allhomes) => {
      console.log(typeof allhomes);
      res.render("host/host-home-list", {
        homes: allhomes,
        pageTitle: "Host homes list",
        currentPage: "host-homes",
      });
    })
    .catch(next);
};

exports.postAddHome = (req, res, next) => {
  const { houseName, price, location, rating, photoURL, description } =
    req.body;
  const home = new Home({
    houseName,
    price,
    location,
    rating,
    photoURL,
    description,
  });

  home
    .save()
    .then(() => {
      res.redirect("/host/host-home-list");
    })
    .catch(next);
};

exports.postEditHome = (req, res, next) => {
  const { id, houseName, price, location, rating, photoURL, description } =
    req.body;
  Home.findById(id)
    .then((home) => {
      home.houseName = houseName;
      home.price = price;
      home.location = location;
      home.rating = rating;
      home.photoURL = photoURL;
      home.description = description;
      home
        .save()
        .then(() => {})
        .catch((error) => {
          console.error("Error updating home:", error);
        });
      res.redirect("/host/host-home-list");
    })
    .catch((error) => {
      console.error("Error finding home:", error);
      res.redirect("/host/host-home-list");
    });
};

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;

  Home.findByIdAndDelete(homeId)
    .then(() => {
      res.redirect("/host/host-home-list");
    })
    .catch(next);
};
