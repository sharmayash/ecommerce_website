const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  username: {
    type: String,
    required: true,
    max: 40
  },
  address: {
    type: String,
    required: true
  },
  wishlist: [
    {
      name: {
        type: String,
        required: true
      },
      brand: {
        type: String,
        required: true
      }
    }
  ]
});

module.exports = Profile = mongoose.model("profiles", ProfileSchema);
