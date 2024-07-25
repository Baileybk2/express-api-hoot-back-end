const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
)

const hootSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["News", "Sports", "Games", "Movies", "Music", "Television"],
    },
    // this is going to reference the user model by the objectId
    // referencing data..
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    comments: [commentSchema],
  },
  // this gives a createdAt property and updatedAt property
  // you want as much info as possible and the timestamps can help with debugging
  { timestamps: true }
)

const Hoot = mongoose.model("Hoot", hootSchema)

module.exports = Hoot
