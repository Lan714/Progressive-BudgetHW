const { model, Schema } = require("mongoose");

const Transaction = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true
    },
    value: {
      type: Number,
      required: true
    },
    { timestamps: true }
  })

module.exports = model("Transaction", transactionSchema);

