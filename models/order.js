const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  user: {
    name: String,
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    email: String,
  },
  products: [
    {
      product: {
        _id: Schema.Types.ObjectId,
        title: String,
        price: Number,
        imageUrl: String,
        description: String,
      },
      quantity: Number,
    },
  ],
});

module.exports = mongoose.model("Order", orderSchema);
