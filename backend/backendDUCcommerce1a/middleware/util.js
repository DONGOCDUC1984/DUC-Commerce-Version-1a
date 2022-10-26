require("dotenv").config();
console.log("util file, process.env.JWTSECRET: " + process.env.JWTSECRET);
var con = require("../models/db");
var jwt = require("jsonwebtoken");

async function authenticate(req, res, next) {
  try {
    var token = req.cookies.token;
    if (!token) return res.status(401).json("Not authorized!");

    var decoded = jwt.verify(token, process.env.JWTSECRET);

    var q1 = "SELECT * FROM users WHERE email =? ";

    con.query(q1, [decoded.email], async function (err, result) {
      if (err) return res.status(400).json(err);

      if (result.length > 0) {
        req.user = result[0];
      }

      next();
    });
  } catch (error) {
    console.log(error);
  }
}

function checkAdmin(req, res, next) {
  try {
    if (req.user && req.user.isAdmin == false) {
      return res.status(400).json("Not Admin.So Not Authorized");
    } else {
      return next();
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = { authenticate, checkAdmin };
