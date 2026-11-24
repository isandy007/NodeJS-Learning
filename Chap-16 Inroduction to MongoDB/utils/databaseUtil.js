const mongo = require("mongodb");

const MongoClient = mongo.MongoClient;

const MONGO_URL = process.env.MONGO_URL;

let _db;
const mongoConnect = (callback) => {
  MongoClient.connect(MONGO_URL)
    .then((client) => {
      _db = client.db("airbnb");
      callback();
    })
    .catch((err) => {
      console.log("Error connecting to MongoDB:", err);
    });
};

const getDB = () => {
  if (!_db) {
    throw new Error("Database not initialized. Call mongoConnect first.");
  }
  return _db;
};

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;
