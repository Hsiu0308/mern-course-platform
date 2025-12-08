const mongoose = require("mongoose");
const { Schema } = mongoose;

const courseSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    default: "",
  },
  instructor: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  student: {
    type: [String],
    default: [],
  },
});

module.exports = mongoose.model("Course", courseSchema);
