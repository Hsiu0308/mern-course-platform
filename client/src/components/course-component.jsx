import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseService from "../services/course.service";

const CourseComponent = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  const HandleTakeToLogin = () => {
    navigate("/login");
  };

  const [courseData, setCourseData] = useState(null);
  useEffect(() => {
    let _id;
    if (currentUser) {
      _id = currentUser.user._id;
      if (currentUser.user.role == "instructor") {
        CourseService.get(_id)
          .then((data) => {
            setCourseData(data.data);
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (currentUser.user.role == "student") {
        CourseService.getEnrolledCourses(_id)
          .then((data) => {
            console.log(data);
            setCourseData(data.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, [currentUser]);

  const handleDeleteCourse = (courseId) => {
    CourseService.delete(courseId)
      .then(() => {
        window.alert("課程已被刪除");
        // 重新整理頁面，或者重新 fetch 資料
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        window.alert("刪除失敗，只有此課程的講師可以刪除。");
      });
  };

  // 處理退選
  const handleDropCourse = (courseId) => {
    if (window.confirm("確定要退選這堂課嗎？學費將會退還至您的帳戶。")) {
      CourseService.drop(courseId)
        .then((response) => {
          window.alert(response.data.msg);

          if (response.data.updatedUser) {
            let storageData = JSON.parse(localStorage.getItem("user"));
            storageData.user = response.data.updatedUser;
            localStorage.setItem("user", JSON.stringify(storageData));
            setCurrentUser(storageData);
          }
          window.location.reload();
        })
        .catch((e) => {
          console.log(e);
          window.alert("退選失敗，請稍後再試。");
        });
    }
  };

  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && (
        <div>
          <p>在獲取課程資訊之前，您必須先登錄。</p>
          <button
            className="btn btn-primary btn-lg"
            onClick={HandleTakeToLogin}
          >
            回到登入頁面
          </button>
        </div>
      )}
      {currentUser && currentUser.user.role == "instructor" && (
        <div>
          <h1>歡迎來到講師的課程頁面</h1>
        </div>
      )}
      {currentUser && currentUser.user.role == "student" && (
        <div>
          <h1>歡迎來到學生的課程頁面</h1>
        </div>
      )}
      {currentUser && courseData && courseData.length != 0 && (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {courseData.map((course) => {
            return (
              <div
                key={course._id}
                className="card shadow-sm h-100" // ✅ 加入 shadow-sm 和 h-100
                style={{ width: "18rem", margin: "1rem" }}
              >
                <img
                  src={
                    course.image ||
                    "https://m.media-amazon.com/images/G/28/AS/AGS/images/service/education/bannerimg.png"
                  }
                  className="card-img-top"
                  alt="Course Cover"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  {" "}
                  <h5 className="card-title fw-bold">{course.title}</h5>
                  <p
                    className="card-text text-muted"
                    style={{ minHeight: "3rem" }}
                  >
                    {" "}
                    {course.description.length > 50
                      ? course.description.substring(0, 50) + "..."
                      : course.description}
                  </p>
                  <div className="mb-2">
                    <span className="badge bg-secondary me-2">
                      學生: {course.student.length}
                    </span>
                    <span className="badge bg-success">$ {course.price}</span>
                  </div>
                  <p className="card-text text-muted small">
                    講師: {course.instructor.username}
                  </p>
                  <div className="mt-auto border-top pt-3 d-flex justify-content-between">
                    {currentUser.user.role == "instructor" && (
                      <>
                        <button
                          className="btn btn-warning"
                          onClick={() => navigate("/editCourse/" + course._id)}
                        >
                          修改
                        </button>
                        <button
                          onClick={() => handleDeleteCourse(course._id)}
                          className="btn btn-danger"
                        >
                          刪除
                        </button>
                      </>
                    )}

                    {currentUser.user.role == "student" && (
                      <button
                        onClick={() => handleDropCourse(course._id)}
                        className="btn btn-danger"
                      >
                        退選課程
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CourseComponent;
