const asyncHandler = require("express-async-handler");
const Transaction = require("../model/Transactions");

const transactionController = {
  //!add
  create: asyncHandler(async (req, res) => {
    const { type, category, amount, date, description } = req.body;
    if (!type || !amount || !date) {
      throw new Error("Type , amount and date are required");
    }
    //!Create
    const transaction = await Transaction.create({
      user: req.user,
      type,
      category,
      amount,
      date,
      description,
    });
    res.status(201).json(transaction);
  }),

  //!lists
  lists: asyncHandler(async (req, res) => {
    const transactions = await Transaction.find({ user: req.user });
    res.json(transactions);
  }),
};

module.exports = transactionController;
  