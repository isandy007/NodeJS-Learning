//Core modules
const fs = require("fs");
const path = require("path");

//Local modules
const rootDir = require("../utils/pathUtil");

const favouriteDataPath = path.join(rootDir, "data", "favourite.json");

module.exports = class Favourite {
  static addToFavourite(homeId, callback) {
    Favourite.getFavourite((favourites) => {
      if (favourites.includes(homeId)) {
        console.log("Home already marked favourite");
      } else {
        favourites.push(homeId);
        fs.writeFile(favouriteDataPath, JSON.stringify(favourites), callback);
      }
    });
  }

  static getFavourite(callback) {
    fs.readFile(favouriteDataPath, (err, data) => {
      callback(!err ? JSON.parse(data) : []);
    });
  }

  static deleteHomeById(delHomeId, callback) {
    Favourite.getFavourite((homeIds) => {
      homeIds = homeIds.filter((homeId) => homeId !== delHomeId);
      fs.writeFile(favouriteDataPath, JSON.stringify(homeIds), callback);
    });
  }
};
