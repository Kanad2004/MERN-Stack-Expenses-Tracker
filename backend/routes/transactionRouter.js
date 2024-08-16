const express = require("express");
const transactionController = require("../controllers/transactionController");
const isAuth = require("../middlewares/isAuth");
const transactionRouter = express.Router();

//!Create
transactionRouter.post(
  "/api/v1/transactions/create",
  isAuth,
  transactionController.create
);

//!lists
transactionRouter.get(
  "/api/v1/transactions/lists",
  isAuth,
  transactionController.getFilteredTransactions
);

//!Update
transactionRouter.put('/api/v1/transactions/update/:id', isAuth, transactionController.update);

//!Delete
transactionRouter.delete('/api/v1/transactions/delete/:id', isAuth, transactionController.delete);

module.exports = transactionRouter;
