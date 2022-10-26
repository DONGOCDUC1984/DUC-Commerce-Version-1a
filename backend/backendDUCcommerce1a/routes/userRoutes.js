var express = require("express");
var router = express.Router();
var {
  aboutuser,
  register,
  login,
  createadmin,
  logout,
} = require("../controllers/userController");
var { authenticate } = require("../middleware/util");

router.get("/aboutuser", authenticate, aboutuser);
router.post("/register", register);
router.post("/login", login);
router.post("/createadmin", createadmin);
router.post("/logout", logout);

module.exports = router;
