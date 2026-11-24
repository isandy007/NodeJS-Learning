// External module
const { ObjectId } = require("mongodb");

//Local module
const { getDB } = require("../utils/databaseUtil");

module.exports = class Favourite {
  // Add a home to favourite list
  static addToFavourite(homeId) {
    const db = getDB();

    const id = new ObjectId(homeId);

    return db
      .collection("favourites")
      .updateOne(
        { homeId: id },
        { $setOnInsert: { homeId: id } },
        { upsert: true },
      );
  }

  // Get all favourite home IDs
  static getFavourite() {
    const db = getDB();

    return db.collection("favourites").find().toArray();
  }

  // Remove a home from favourite list
  static deleteHomeById(homeId) {
    const db = getDB();

    return db.collection("favourites").deleteOne({
      homeId: new ObjectId(homeId),
    });
  }
};
