const {
  getAllCustomer,
  getCustomerById,
  updateCustomer,
} = require("./controller");

const express = require("express");

const Router = express.Router();

// get all customer
Router.get("/api", getAllCustomer);

// get customer by id
Router.get("/api/all/:id", getCustomerById);

// update customer
Router.put("/api/choose/:senderId/:receId/:amount", updateCustomer);

module.exports = Router;
