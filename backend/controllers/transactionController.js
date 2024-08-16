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
  getFilteredTransactions: asyncHandler(async (req, res) => {
    const { startDate, endDate, type, category } = req.query;
    let filters = {
      user: req.user,
    };
    if (startDate) {
      filters.date = { ...filters.date, $gte: new Date(startDate) };
    }

    if (endDate) {
      filters.date = { ...filters.date, $lte: new Date(endDate) };
    }
    if (type) {
      filters.type = type;
    }

    if (category) {
      if (category === "All") {
        //!No category filter needed when filtering for all
      } else if (category === "Uncategorized") {
        //!Filter for transactions that are specifically categorized as 'Uncatregorized'
        filters.category = "Uncategorized";
      } else {
        filters.category = category;
      }
    }

    const transactions = await Transaction.find(filters).sort({
      date: -1,
    });
    res.json(transactions);
  }),
};

module.exports = transactionController;
