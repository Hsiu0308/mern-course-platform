const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const authRoutes = require("./routes").auth;
const courseRoute = require("./routes/course-route");
const passport = require("passport");
require("./config/passport")(passport);
const cors = require("cors");

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/googleDB")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err);
  });

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/user", authRoutes);
//JWT保護
app.use(
  "/api/courses",
  passport.authenticate("jwt", { session: false }),
  courseRoute
);

//JWT

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
