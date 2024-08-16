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

  //!update
  update: asyncHandler(async (req, res) => {
    //!Find the transaction
    const transaction = await Transaction.findById(req.params.id);
    if (transaction && transaction.user.toString() === req.user.toString()) {
      transaction.type = req.body.type || transaction.type;
      transaction.category = req.body.category || transaction.category;
      transaction.amount = req.body.amount || transaction.amount;
      transaction.date = req.body.date || transaction.date;
      transaction.description = req.body.description || transaction.description;

      const updatedTransaction = await transaction.save();
      res.json(updatedTransaction);
    }
  }),

  //!Delete
  delete: asyncHandler(async (req, res) => {
    const transaction = await Transaction.findById(req.params.id);
    if (transaction && transaction.user.toString() === req.user.toString()) {
      await transaction.deleteOne(); // Use deleteOne instead of remove
      res.json({ message: "Transaction deleted successfully" });
    } else {
      res.status(404);
      throw new Error("Transaction not found or user unauthorized");
    }
  }),
};

module.exports = transactionController;
