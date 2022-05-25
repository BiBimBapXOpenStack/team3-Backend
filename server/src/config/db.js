const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "11111111",
  database: "test",
});

db.connect((err) => {
  if (err) return console.error("error" + err.message);
});

module.exports = db;
