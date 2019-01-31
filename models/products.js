const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  image: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
    max: 50
  },
  company: {
    type: String,
    required: true
  },
  specs: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  reviews: [
    {
      commentBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
      },
      text: {
        type: String,
        required: true
      }
      // likes: [
      //   {
      //     user: {
      //       type: mongoose.Schema.Types.ObjectId,
      //       ref: "users"
      //     }
      //   } 
      //]
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Product = mongoose.model("products", ProductSchema);
