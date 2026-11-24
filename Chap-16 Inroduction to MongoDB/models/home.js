//External module
const { ObjectId } = require("mongodb");
//local module
const { getDB } = require("../utils/databaseUtil");

module.exports = class Home {
  constructor(houseName, price, location, rating, photoURL, description, id) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoURL = photoURL;
    this.description = description;
    this.id = id;
  }

  save() {
    const db = getDB();
    return db.collection("homes").insertOne(this);
  }

  static updateHomeById(homeId, homeData) {
    const db = getDB();

    return db.collection("homes").updateOne(
      { _id: new ObjectId(homeId) },
      {
        $set: {
          houseName: homeData.houseName,
          price: homeData.price,
          location: homeData.location,
          rating: homeData.rating,
          photoURL: homeData.photoURL,
          description: homeData.description,
        },
      },
    );
  }

  static fetchAll() {
    const db = getDB();
    return db.collection("homes").find().toArray();
  }

  static getHomeById(homeId) {
    const db = getDB();

    return db.collection("homes").findOne({
      _id: new ObjectId(homeId),
    });
  }
  static deleteHomeById(homeId) {
    const db = getDB();

    return db.collection("homes").deleteOne({
      _id: new ObjectId(homeId),
    });
  }
};
