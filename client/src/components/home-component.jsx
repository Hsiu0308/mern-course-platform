import React from "react";
import { useNavigate } from "react-router-dom";

const HomeComponent = () => {
  const navigate = useNavigate();

  return (
    <main>
      <div
        className="text-white p-5 text-center d-flex flex-column justify-content-center align-items-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "60vh",
        }}
      >
        <h1 className="display-4 fw-bold">開啟您的程式學習之旅</h1>
        <p className="lead mb-4" style={{ maxWidth: "600px" }}>
          無論您是想轉職成為工程師，還是提升現有技能。我們提供最優質的 MERN
          課程，助您掌握現代網頁開發技術。
        </p>
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <button
            onClick={() => navigate("/register")}
            className="btn btn-primary btn-lg px-4 gap-3"
          >
            立即註冊
          </button>
          <button
            onClick={() => navigate("/login")}
            className="btn btn-outline-light btn-lg px-4"
          >
            登入會員
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="container px-4 py-5" id="featured-3">
        <h2 className="pb-2 border-bottom">為什麼選擇我們？</h2>
        <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
          <div className="feature col">
            <div className="feature-icon bg-primary bg-gradient text-white rounded-3 mb-3 p-3 d-inline-block">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                fill="currentColor"
                className="bi bi-collection"
                viewBox="0 0 16 16"
              >
                <path d="M2.5 3.5a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-11zm2-2a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 0 6v7zm1.5.5A.5.5 0 0 1 1 13v-7a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-13z" />
              </svg>
            </div>
            <h3>豐富的課程內容</h3>
            <p>
              涵蓋 React, Node.js, MongoDB
              等全端技術，從入門到進階，滿足不同階段的學習需求。
            </p>
          </div>
          <div className="feature col">
            <div className="feature-icon bg-primary bg-gradient text-white rounded-3 mb-3 p-3 d-inline-block">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                fill="currentColor"
                className="bi bi-people"
                viewBox="0 0 16 16"
              >
                <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
              </svg>
            </div>
            <h3>專業講師陣容</h3>
            <p>
              我們的講師均來自業界頂尖企業，擁有豐富的實戰經驗，帶領您避開學習誤區。
            </p>
          </div>
          <div className="feature col">
            <div className="feature-icon bg-primary bg-gradient text-white rounded-3 mb-3 p-3 d-inline-block">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                fill="currentColor"
                className="bi bi-toggles2"
                viewBox="0 0 16 16"
              >
                <path d="M9.465 10H12a2 2 0 1 1 0 4H9.465c.34-.588.535-1.271.535-2 0-.729-.195-1.412-.535-2z" />
                <path d="M6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 1a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm.535-10a3.975 3.975 0 0 1-.409-1H4a1 1 0 0 1 0-2h2.126c.091-.355.23-.69.41-1H4a2 2 0 1 0 0 4h2.535z" />
                <path d="M14 4a4 4 0 1 1-8 0 4 4 0 0 1 8 0z" />
              </svg>
            </div>
            <h3>靈活的學習方式</h3>
            <p>
              隨時隨地登入學習，按照自己的節奏安排進度。支援電腦、平板與手機多裝置觀看。
            </p>
          </div>
        </div>
      </div>

      <footer className="py-3 my-4 bg-light">
        <p className="text-center text-muted">
          &copy; 2025 Hensel Learning System.
        </p>
      </footer>
    </main>
  );
};

export default HomeComponent;
