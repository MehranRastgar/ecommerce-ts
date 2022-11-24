import { Schema, model, models, Types } from "mongoose";

const address = new Schema({
  lat: { type: Number, required: false },
  lng: { type: Number, required: false },
  postal_code: { type: Number, required: false },
  province: { type: String, required: false },
  city: { type: String, required: false },
  county: { type: String, required: false },
  district: { type: String, required: false },
  region: { type: String, required: false },
  neighbourhood: { type: String, required: false },
  plaque: { type: Number, required: false },
  unit: { type: Number, required: false },
  loc_address: { type: String, required: false },
  description: { type: String, required: false },
  address_compact: { type: String, required: false },
  receiver_name: { type: String, required: false },
  receiver_phone: { type: Number, required: false },
});
const Payment = new Schema({
  authority: { type: String },
  isPayed: { type: Boolean },
  gateway: { type: Object },
});

const OrderSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "Client",
      autopopulate: true,
    },
    // userId: { type: String, required: true },
    cart: { type: Array },
    price: { type: String },
    address: { type: Object },
    status: { type: String, default: "pending" },
    payment: Payment,
    deliverycode: { type: String },
  },
  { timestamps: true }
);

const Order = models.Order || model("Order", OrderSchema);

export default Order;
