//Core modules

const db = require("../utils/databaseUtil");

module.exports = class Favourite {
  // Add a home to favourite list
  static addToFavourite(homeId) {
    return db.execute("INSERT IGNORE INTO favourites (homeId) VALUES (?)", [
      homeId,
    ]);
  }

  // Get all favourite home IDs
  static getFavourite() {
    return db.execute("SELECT homeId FROM favourites");
  }

  // Remove a home from favourite list
  static deleteHomeById(homeId) {
    return db.execute("DELETE FROM favourites WHERE homeId = ?", [homeId]);
  }
};
