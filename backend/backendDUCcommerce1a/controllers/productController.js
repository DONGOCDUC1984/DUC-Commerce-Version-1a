require("dotenv").config();
console.log(
  "productController file, process.env.JWTSECRET: " + process.env.JWTSECRET
);
console.log("productController file: process.env.PORT: " + process.env.PORT);
var port = process.env.PORT;
var con = require("../models/db");
const path = require("path");
var fs = require("fs");

async function getproduct(req, res) {
  try {
    var q1 = "SELECT * FROM products WHERE owner_email = ?";
    await con.query(q1, [req.user.email], function (err, result) {
      if (err) return res.status(400).json(err);
      if (result.length > 0) {
        res.status(200).json(result);
      }
    });
  } catch (error) {
    console.log(error);
  }
}

async function getallproducts(req, res) {
  try {
    var q1 = "SELECT * FROM products ;";
    await con.query(q1, function (err, result) {
      if (err) return res.status(400).json(err);
      if (result.length > 0) {
        res.status(200).json(result);
      }
    });
  } catch (error) {
    console.log(error);
  }
}

async function postproduct(req, res) {
  //console.log("req.body: ", req.body);
  //console.log("req.files: ", req.files);

  var productinfo = JSON.parse(req.body.document);

  var filename = req.user.email + "_" + Date.now() + "_" + req.files.image.name;
  var file = req.files.image;

  var uploadpath = "./public/uploads/images/" + filename;
  file.mv(uploadpath, (err) => {
    if (err) throw err;
  });

  try {
    const q1 =
      "INSERT INTO products(`name`,`description`,`type`,`price`,`url_img`,`owner_email`,`tel`,`city`) VALUES (?)";
    const values = [
      productinfo.name,
      productinfo.description,
      productinfo.type,
      productinfo.price,
      `http://localhost:${port}/uploads/images/${filename}`,
      req.user.email,
      productinfo.tel,
      productinfo.city,
    ];

    await con.query(q1, [values], function (err, result) {
      if (err) return res.status(500).json(err);

      res
        .status(200)
        .json({
          name: productinfo.name,
          description: productinfo.description,
          type: productinfo.type,
          price: productinfo.price,
          owner_email: req.user.email,
          tel: productinfo.tel,
          city: productinfo.city,
          info: "Product Was Created Successfully",
        });
    });
  } catch (error) {
    console.log(error);
  }
}

async function updateproduct(req, res) {
  var { id, newDescription, newPrice } = req.body;
  //console.log("req.params.id: ", req.params.id);

  try {
    var q1 = `SELECT * FROM products WHERE id =  ${id} `;
    await con.query(q1, async function (err, result1) {
      if (err) return res.status(400).json(err);
      if (result1.length == 0) {
        return res.status(409).json("Product does not exist!");
      }
      if (result1.length > 0 && result1[0].owner_email !== req.user.email) {
        return res.status(409).json("Not Authorized!");
      } else {
        //console.log("result1[0].owner_email: ", result1[0].owner_email);
        // console.log("req.user.email: ", req.user.email);

        const q2 = `UPDATE products SET description="${newDescription}" ,price= ${newPrice} WHERE id = ${id};`;

        await con.query(q2, (err, result2) => {
          if (err) return res.status(500).json(err);
          return res.json({
            id: id,
            description: newDescription,
            price: newPrice,
            info: "Product Was Updated  Successfully",
          });
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
}

async function deleteproduct(req, res) {
  try {
    var q1 = `SELECT * FROM products WHERE id =  ${req.params.id} `;
    await con.query(q1, async function (err, result1) {
      if (err) return res.status(400).json(err);
      if (result1.length == 0) {
        return res.status(409).json("Product does not exist!");
      }
      if (result1[0].owner_email !== req.user.email && req.user.isAdmin == 0) {
        return res.status(409).json("Not Authorized!");
      } else {
        const q2 = `DELETE FROM products WHERE id=${req.params.id} ;`;

        await fs.unlink(
          "./public/uploads/images/" + path.basename(result1[0].url_img),

          function (err) {
            if (err) throw err;
          }
        );
        await con.query(q2, (err, result2) => {
          if (err) return res.status(500).json(err);
          return res.status(200).json({
            id: parseInt(req.params.id),
            info: "product was deleted.",
          });
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getproduct,
  getallproducts,
  postproduct,
  updateproduct,
  deleteproduct,
};
