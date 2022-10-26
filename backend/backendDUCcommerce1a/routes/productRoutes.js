var express = require("express");
var router = express.Router();
var {
  getproduct,
  getallproducts,
  postproduct,
  updateproduct,
  deleteproduct,
} = require("../controllers/productController");
var { authenticate } = require("../middleware/util");

router.get("/getproduct", authenticate, getproduct);
router.get("/getallproducts", getallproducts);
router.post("/postproduct", authenticate, postproduct);
router.put("/updateproduct/:id", authenticate, updateproduct);
router.delete("/deleteproduct/:id", authenticate, deleteproduct);

module.exports = router;
