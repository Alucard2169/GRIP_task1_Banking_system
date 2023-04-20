const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const apicache = require("apicache");
const cache = apicache.middleware;
const path = require("path");
const Router = require("./routers");

const PORT = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.static(path.join(__dirname, "public")));

const URL = process.env.DB_CONNECTION_STRING;

mongoose
  .connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    return app.listen(PORT, () => {
      console.log(`Server listening on PORT ${PORT}`);
    });
  })
  .catch((err) => {
    return console.log(err);
  });

app.get("/", (req, res) => {
  res.redirect("/api");
});

app.use("/", cache("2 minutes"), Router);
