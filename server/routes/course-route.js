const router = require("express").Router();
// const Course = require("../models").Course;
const { Course, user: User } = require("../models");
const courseValidation = require("../validation").courseValidation;

router.use((req, res, next) => {
  console.log("Course route accessed");
  next();
});

//所有課程
router.get("/", async (req, res) => {
  try {
    let courseFound = await Course.find({})
      .populate("instructor", ["username", "email", "password"])
      .exec();
    return res.send(courseFound);
  } catch (err) {
    console.log(err);
    res.status(500).send("無法獲取課程列表");
  }
});

//講師ID獲取課程
router.get("/instructor/:_instructor_id", async (req, res) => {
  let { _instructor_id } = req.params;
  try {
    let courseFound = await Course.find({ instructor: _instructor_id })
      .populate("instructor", ["username", "email"])
      .exec();
    return res.send(courseFound);
  } catch (err) {
    console.log(err);
    res.status(500).send("無法獲取課程信息");
  }
});

//用學生id獲取已註冊課程
router.get("/student/:_student_id", async (req, res) => {
  let { _student_id } = req.params;
  try {
    let courseFound = await Course.find({ student: _student_id })
      .populate("instructor", ["username", "email"])
      .exec();
    return res.send(courseFound);
  } catch (err) {
    console.log(err);
    res.status(500).send("無法獲取課程信息");
  }
});

//搜索課程（名稱）
router.get("/findByName/:name", async (req, res) => {
  let { name } = req.params;
  try {
    let courseFound = await Course.find({
      title: { $regex: name, $options: "i" },
    })
      .populate("instructor", ["username", "email"])
      .exec();

    return res.send(courseFound);
  } catch (err) {
    console.log(err);
    res.status(500).send("無法獲取課程信息");
  }
});

//ID獲取課程
router.get("/:_id", async (req, res) => {
  let { _id } = req.params;
  try {
    let courseFound = await Course.findOne({ _id })
      .populate("instructor", ["username", "email"])
      .exec();
    if (!courseFound) {
      return res.status(404).send("找不到該課程");
    }
    return res.send(courseFound);
  } catch (err) {
    console.log(err);
    res.status(500).send("無法獲取課程信息");
  }
});

// 讓學生透過課程id來註冊新課程 (含扣款功能)
router.post("/enroll/:_id", async (req, res) => {
  let { _id } = req.params;
  try {
    let course = await Course.findOne({ _id }).exec();

    let isEnrolled = course.student.includes(req.user._id.toString());
    if (isEnrolled) {
      return res.status(400).send("您已經註冊過此課程，無需重複註冊。");
    }

    let user = await User.findOne({ _id: req.user._id }).exec();

    if (user.balance < course.price) {
      return res.status(400).send("餘額不足，無法購買此課程。");
    }

    user.balance -= course.price;
    course.student.push(req.user._id);

    await user.save();
    await course.save();

    return res.send({
      msg: "註冊成功",
      updatedUser: user,
    });
  } catch (e) {
    return res.status(500).send(e);
  }
});

//新增課程
router.post("/", async (req, res) => {
  // 驗證數據符合規範
  let { error } = courseValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  if (req.user.isStudent()) {
    return res
      .status(400)
      .send("只有講師才能發佈新課程。若你已經是講師，請透過講師帳號登入。");
  }

  let { title, description, price, image } = req.body;
  try {
    let newCourse = new Course({
      title,
      description,
      price,
      image,
      instructor: req.user._id,
    });
    let savedCourse = await newCourse.save();
    return res.send("新課程已經保存");
  } catch (e) {
    console.log(e);
    return res.status(500).send("無法創建課程。。。");
  }
});

//更改課程
router.patch("/:_id", async (req, res) => {
  //驗證數據
  let { error } = courseValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let { _id } = req.params;
  //確認課程是否存在
  try {
    let courseFound = await Course.findOne({ _id });
    if (!courseFound) {
      return res.status(400).send("找不到該課程");
    }
    //使用者為此課程的講師，才可更改
    if (courseFound.instructor.equals(req.user._id)) {
      let updatedCourse = await Course.findOneAndUpdate({ _id }, req.body, {
        new: true,
        runValidators: true,
      });
      return res.send({
        msg: "課程更新成功",
        updatedCourse,
      });
    } else {
      return res.status(403).send("只有此課程的講師有權限編輯此課程");
    }
  } catch (err) {
    return res.status(500).send("無法獲取課程信息");
  }
});

router.delete("/:_id", async (req, res) => {
  let { _id } = req.params;
  try {
    let courseFound = await Course.findOne({ _id }).exec();
    if (!courseFound) {
      return res.status(400).send("找不到該課程，無法刪除課程");
    }
    //使用者為此課程的講師，才可更改
    if (courseFound.instructor.equals(req.user._id)) {
      await Course.deleteOne({ _id }).exec();
      return res.send({
        msg: "課程已被刪除",
      });
    } else {
      return res.status(403).send("只有此課程的講師有權限刪除此課程");
    }
  } catch (err) {
    return res.status(500).send("無法獲取課程信息");
  }
});

// 學生退選課程 (並退還學費)
router.patch("/drop/:_id", async (req, res) => {
  let { _id } = req.params;
  try {
    let course = await Course.findOne({ _id }).exec();
    let user = await User.findOne({ _id: req.user._id }).exec();

    if (!course || !user) {
      return res.status(400).send("找不到課程或使用者");
    }

    if (!course.student.includes(req.user._id.toString())) {
      return res.status(400).send("您並未註冊此課程，無法退選");
    }

    course.student = course.student.filter(
      (id) => id !== req.user._id.toString()
    );

    user.balance += course.price;

    await course.save();
    await user.save();

    return res.send({
      msg: "已成功退選，款項已退還至您的帳戶",
      updatedUser: user, // 回傳最新的使用者資料 (含新餘額)
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send("無法處理退選請求");
  }
});

module.exports = router;
