const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    userID: { type: String, required: true },
    desc: { type: String, max: 100 },
    img: { type: String },
    likes: { type: Array, default: [] },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("post", postSchema);
