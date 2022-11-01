const mongoose = require("mongoose");


const userOtpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports  = mongoose.model("UserOTP", userOtpSchema);