const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
      default: "Uncategorized",
    },
    type: {
      type: String,
      required: true,
      enum: ["income", "expense"],
    },
  },
  {
    timestamps: true,
  }
);

mongoose.exports = mongoose.model("Category", categorySchema);
