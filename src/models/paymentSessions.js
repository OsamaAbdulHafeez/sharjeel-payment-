import mongoose, { Schema } from "mongoose";


const paymentDetailsSchema = new Schema({
  paymentId: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  paymentStatus: { type: String, required: true },
});


const dataSchema = new Schema({
  sessionId: {
    type: String,
    required: true,
    index: true
  },
  status: {
    type: String,
    default: 'pending'
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'usd'
  },
  // productDetails: {
  //   title: { type: String, required: true },
  //   description: { type: String, required: true },
  //   image: { type: String },
  // },
  clientDetails: {
    clientName: { type: String, required: true },
    clientNum: { type: String, required: true },
    clientEmail: { type: String, required: true, index: false, unique: false },
  },
  paymentDetails: paymentDetailsSchema,
  createdAt: { type: Date, default: Date.now },
  sessionUrl: { type: String },
});


const paymentSessions = mongoose.models.paymentSessions || mongoose.model("paymentSessions", dataSchema);

export default paymentSessions;
