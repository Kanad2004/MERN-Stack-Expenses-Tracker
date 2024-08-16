const express = require("express");
const transactionController = require("../controllers/transactionController");
const isAuth = require("../middlewares/isAuth");
const transactionRouter = express.Router();

transactionRouter.post(
  "/api/v1/transactions/create",
  isAuth,
  transactionController.create
);

transactionRouter.get(
  "/api/v1/transactions/lists",
  isAuth,
  transactionController.lists
);

module.exports = transactionRouter;
