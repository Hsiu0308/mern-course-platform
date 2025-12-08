import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseService from "../services/course.service";

const EnrollComponent = (props) => {
  let { currentUser, setCurrentUser } = props;
  const navigate = useNavigate();
  let [searchInput, setSearchInput] = useState("");
  let [searchResult, setSearchResult] = useState(null);

  const handleTakeToLogin = () => {
    navigate("/login");
  };

  const handleChangeInput = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearch = () => {
    CourseService.getCourseByName(searchInput)
      .then((data) => {
        console.log(data);
        setSearchResult(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEnroll = (e, courseId) => {
    e.preventDefault();
    CourseService.enroll(courseId)
      .then((response) => {
        window.alert("課程註冊成功！費用已從您的帳戶扣除。");

        if (response.data.updatedUser) {
          let storageData = JSON.parse(localStorage.getItem("user"));
          storageData.user = response.data.updatedUser;
          localStorage.setItem("user", JSON.stringify(storageData));
          setCurrentUser(storageData);
        }

        navigate("/course");
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.status === 400) {
          window.alert(err.response.data);
        }
      });
  };

  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && (
        <div>
          <p>You must login first before searching for courses.</p>
          <button
            className="btn btn-primary btn-lg"
            onClick={handleTakeToLogin}
          >
            Take me to login page.
          </button>
        </div>
      )}
      {currentUser && currentUser.user.role == "instructor" && (
        <div>
          <h1>Only students can enroll in courses.</h1>
        </div>
      )}

      {/* ✅ 修改：搜尋欄美化 (置中、放大、陰影) */}
      {currentUser && currentUser.user.role == "student" && (
        <div className="search-wrapper d-flex justify-content-center mb-5">
          <div className="input-group input-group-lg w-75 shadow-sm">
            <input
              onChange={handleChangeInput}
              type="text"
              className="form-control border-0"
              placeholder="搜尋您感興趣的課程..."
            />
            <button onClick={handleSearch} className="btn btn-primary px-4">
              搜尋
            </button>
          </div>
        </div>
      )}

      {currentUser && searchResult && searchResult.length != 0 && (
        <div>
          <p>搜尋到的課程：</p>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {searchResult.map((course) => (
              <div
                key={course._id}
                className="card shadow-sm h-100"
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
                  <h5 className="card-title fw-bold">{course.title}</h5>

                  <p
                    style={{ margin: "0.5rem 0rem" }}
                    className="card-text text-muted"
                  >
                    {course.description}
                  </p>

                  <div className="mb-2">
                    <span className="badge bg-secondary me-2">
                      學生: {course.student?.length || 0}
                    </span>
                    <span className="badge bg-success">$ {course.price}</span>
                  </div>

                  <p className="card-text text-muted small">
                    講師: {course.instructor.username}
                  </p>

                  <div className="mt-auto">
                    {" "}
                    <a
                      href="#"
                      onClick={(e) => handleEnroll(e, course._id)}
                      className="card-text btn btn-primary w-100"
                      id={course._id}
                    >
                      購買課程
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {currentUser && searchResult && searchResult.length === 0 && (
        <div className="alert alert-info mt-3 text-center">
          找不到相關課程，請嘗試其他關鍵字。
        </div>
      )}
    </div>
  );
};

export default EnrollComponent;
