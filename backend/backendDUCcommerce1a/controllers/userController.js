require("dotenv").config();
console.log(
  "userController file, process.env.JWTSECRET: " + process.env.JWTSECRET
);
var con = require("../models/db");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

function aboutuser(req, res) {
  res.status(200).json(req.user);
}

async function register(req, res) {
  try {
    var { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400).json("Please add all fields.");
    }
    var q1 = "SELECT * FROM users WHERE email = ? ";
    await con.query(q1, [email], async function (err, result) {
      if (err) return res.status(400).json(err);
      if (result.length > 0) {
        return res.status(409).json("User already existed!");
      }
    });

    var hashedPassword = await bcrypt.hashSync(password, 10);

    const q2 =
      "INSERT INTO users(`name`,`email`,`password`,`isAdmin`) VALUES (?)";
    const values = [name, email, hashedPassword, 0];

    con.query(q2, [values], async function (err, result) {
      if (err) return res.status(500).json(err);

      var token = await jwt.sign(
        { name: name, email: email },
        process.env.JWTSECRET
      );
      res.cookie("token", token, { httpOnly: true }).json({
        message: "User Was Created Successfully",
        name: name,
        email: email,
        result: result,
      });
    });
  } catch (error) {
    console.log(error);
  }
}

async function login(req, res) {
  var { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json("Please add all fields.");
  }

  try {
    var q1 = "SELECT * FROM users WHERE email = ?";
    await con.query(q1, [email], async function (err, result) {
      if (err) return res.status(400).json(err);
      if (
        result.length > 0 &&
        (await bcrypt.compare(password, result[0].password))
      ) {
        var token = await jwt.sign(
          { name: result[0].name, email: result[0].email },
          process.env.JWTSECRET
        );
        res.cookie("token", token, { httpOnly: true }).json({
          id: result[0].id,
          name: result[0].name,
          email: result[0].email,
          isAdmin: result[0].isAdmin,
        });
      } else {
        res
          .status(400)
          .json("Message from backend: Wrong email or wrong password");
      }
    });
  } catch (error) {
    console.log(error);
  }
}

async function createadmin(req, res) {
  try {
    var hashedPassword = await bcrypt.hashSync("NGOCDUC84", 10);

    const q1 =
      "INSERT INTO users(`name`,`email`,`password`,`isAdmin` ) VALUES (?)";
    const values = ["NGOC DUC", "NGOCDUC84@gmail.com", hashedPassword, 1];

    await con.query(q1, [values], async function (err, result) {
      if (err) {
        return res.status(400).json(err);
      } else {
        var token = await jwt.sign(
          { name: "NGOC DUC", email: "NGOCDUC84@gmail.com" },
          process.env.JWTSECRET
        );
        res.cookie("token", token, { httpOnly: true }).json({
          message: "Admin Was Created Successfully",
          name: "NGOC DUC",
          email: "NGOCDUC84@gmail.com",
          result: result,
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
}

function logout(req, res) {
  res.clearCookie("token").json("Logged out.");
}

module.exports = { aboutuser, register, login, createadmin, logout };
