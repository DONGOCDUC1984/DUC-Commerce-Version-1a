var mysql = require("mysql");
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "abc",
  database: "duccommerce1a",
});
con.connect(function (err) {
  if (err) throw err;
  console.log("Connected! DUC.");
});

module.exports = con;
