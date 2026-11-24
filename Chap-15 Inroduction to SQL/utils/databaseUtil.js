const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "Localhost",
  user: "root",
  password: "dataBase@107*",
  database: "airbnb",
});

module.exports = pool.promise();
