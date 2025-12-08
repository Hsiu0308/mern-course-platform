const router = require("express").Router();
const registerValidation = require("../validation").registerValidation;
const loginValidation = require("../validation").loginValidation;
const courseValidation = require("../validation").courseValidation;
const User = require("../models").user;
const jwt = require("jsonwebtoken");
const { user } = require("../models");

router.use((req, res, next) => {
  console.log("Auth route accessed");
  next();
});

router.get("/testAPI", (req, res) => {
  return res.send("Auth API is working");
});

router.post("/register", async (req, res) => {
  //確認數據是否符合要求
  let { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //確認信箱是否已經被註冊
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("此信箱已被註冊");

  //創建新用戶
  let { email, username, password, role } = req.body;
  let newUser = new User({
    email,
    username,
    password,
    role,
  });
  try {
    let savedUser = await newUser.save();
    return res.send({
      msg: "用戶創建成功",
      savedUser,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("無法創建用戶");
  }
});

router.post("/login", async (req, res) => {
  let { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const foundUser = await User.findOne({ email: req.body.email });
  if (!foundUser) {
    return res.status(400).send("無法找到使用者，請確認信箱是否正確");
  }

  foundUser.comparePassword(req.body.password, (err, isMatch) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (isMatch) {
      //回傳json web token
      const tokenObject = { _id: foundUser._id, email: foundUser.email };
      const token = jwt.sign(tokenObject, process.env.PASSPORT_SECRET);
      return res.send({
        msg: "登入成功",
        token: "JWT " + token,
        user: foundUser,
      });
    } else {
      return res.status(401).send("密碼錯誤");
    }
  });
});

module.exports = router;
