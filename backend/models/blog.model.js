const mongoose = require("mongoose");
const blogSchema = mongoose.Schema({
  title: String,
  content: String,
  image: String,
  likes: {
    type: Number,
    default: 0,
  },
  dislikes: {
    type: Number,
    default: 0,
  },
  userId: mongoose.Schema.Types.ObjectId,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const blogModel = mongoose.model("blog", blogSchema);

module.exports = { blogModel };
