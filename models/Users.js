const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      trim: true
    },
    phone: {
      type: Number,
      trim: true
    },
    address: {
      type: String,
      trim: true
    },
    permissions: [
      {
        type: String
      }
    ],
    roles: [
      {
        ref: "roles",
        type: mongoose.Schema.Types.ObjectId
      }
    ]
  },
  {
    timestamps: true,
    versionKey: false
  }
);

module.exports = mongoose.model("users", UserSchema);
