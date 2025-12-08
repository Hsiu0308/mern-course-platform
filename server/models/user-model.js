const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 1,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 6,
    maxlength: 50,
  },
  password: { type: String, required: true },
  balance: {
    type: Number,
    default: 10000,
  },
  role: { type: String, enum: ["student", "instructor"], default: "student" },
  date: { type: Date, default: Date.now },
});

//instance method
userSchema.methods.isStudent = function () {
  return this.role === "student";
};

userSchema.methods.isInstructor = function () {
  return this.role === "instructor";
};

userSchema.methods.comparePassword = async function (password, cb) {
  let result;
  try {
    result = await bcrypt.compare(password, this.password);
    return cb(null, result);
  } catch (err) {
    return cb(err, result);
  }
};

//mongoose middleware
//新用戶或更改密碼，將密碼進行雜湊處理
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

module.exports = mongoose.model("User", userSchema);
