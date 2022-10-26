require("dotenv").config();
console.log("productController file: process.env.PORT: " + process.env.PORT);
var port = process.env.PORT;
var express = require("express");
var morgan = require("morgan");
var cookieParser = require("cookie-parser");
var fileUpload = require("express-fileupload");
var path = require("path");
var cors = require("cors");

var app = express();
app.use(cookieParser());
app.use(fileUpload());
app.use(express.static("public"));
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.status(200).json("OK.This is home page.");
});

app.use("/", require("./routes/productRoutes"));
app.use("/", require("./routes/userRoutes"));

app.listen(port, () => console.log(`Server started on port ${port}`));
