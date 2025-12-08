import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CourseService from "../services/course.service";

const EditCourseComponent = (props) => {
  let { currentUser } = props;
  let { _id } = useParams();
  const navigate = useNavigate();

  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [price, setPrice] = useState(0);
  let [image, setImage] = useState("");
  let [message, setMessage] = useState("");

  // 進入頁面時，先抓取舊資料填入
  useEffect(() => {
    CourseService.getCourseById(_id)
      .then((response) => {
        let course = response.data;
        setTitle(course.title);
        setDescription(course.description);
        setPrice(course.price);
        setImage(course.image);
      })
      .catch((e) => {
        console.log(e);
        window.alert("無法獲取課程資料");
      });
  }, []);

  const handleUpdate = () => {
    CourseService.update(_id, title, description, price, image)
      .then(() => {
        window.alert("課程更新成功！");
        navigate("/course");
      })
      .catch((error) => {
        console.log(error);
        setMessage(error.response.data);
      });
  };

  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && <div>請先登入。</div>}
      {currentUser && currentUser.user.role == "instructor" && (
        <div className="form-group">
          <h3>修改課程</h3>
          <br />
          <label htmlFor="exampleforTitle">課程標題：</label>
          <input
            name="title"
            type="text"
            className="form-control"
            value={title} // 綁定 state
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <label htmlFor="exampleforImage">圖片網址：</label>
          <input
            name="image"
            type="text"
            className="form-control"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <br />
          <label htmlFor="exampleforContent">內容：</label>
          <textarea
            className="form-control"
            name="content"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <br />
          <label htmlFor="exampleforPrice">價格：</label>
          <input
            name="price"
            type="number"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <br />
          <button className="btn btn-primary" onClick={handleUpdate}>
            更新課程
          </button>
          <br />
          <br />
          {message && <div className="alert alert-danger">{message}</div>}
        </div>
      )}
    </div>
  );
};

export default EditCourseComponent;
