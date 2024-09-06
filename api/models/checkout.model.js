import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  ItemsN: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const CheckDSchema = new mongoose.Schema(
  {
    CurrentuserId: {
      type: String,
      required: true,
    },
    Username: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['processing', 'Approve', 'Reject'], 
      default: 'processing' 
  },

    items: [itemSchema],
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const CheckD = mongoose.model("CheckD", CheckDSchema);

export default CheckD;
