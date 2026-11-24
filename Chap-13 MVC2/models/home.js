//Core modules
const fs = require("fs");
const path = require("path");

//Local modules
const rootDir = require("../utils/pathUtil");

module.exports = class Home {
  constructor(houseName, price, location, rating, photoURL) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoURL = photoURL;
  }

  save() {
    Home.fetchAll((registeredHomes) => {
      registeredHomes.push(this);
      const homeDataPath = path.join(rootDir, "data", "homes.json");
      fs.writeFile(
        homeDataPath,
        JSON.stringify(registeredHomes),
        (error) => {},
      );
    });
  }

  static fetchAll(callback) {
    const homeDataPath = path.join(rootDir, "data", "homes.json");

    fs.readFile(homeDataPath, (err, data) => {
      if (err) {
        if (err.code === "ENOENT") {
          return callback([]);
        }
        console.error("Error reading homes.json:", err);
        return callback([]);
      }

      if (!data.length) {
        return callback([]);
      }

      try {
        callback(JSON.parse(data.toString()));
      } catch (error) {
        console.error("Invalid JSON in homes.json:", error);
        callback([]);
      }
    });
  }
};
