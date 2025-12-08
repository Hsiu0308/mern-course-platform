import React from "react";

const ProfileComponent = ({ currentUser }) => {
  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && (
        <div className="alert alert-warning">
          在獲取您的個人資料之前，您必須先登錄。
        </div>
      )}

      {currentUser && (
        <div className="container">
          <h2 className="mb-4">個人儀表板</h2>

          <div className="row align-items-md-stretch">
            <div className="col-md-6 mb-3">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-3">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                      alt="avatar"
                      className="rounded-circle me-3"
                      style={{ width: "60px" }}
                    />
                    <div>
                      <h4 className="card-title mb-0">
                        {currentUser.user.username}
                      </h4>
                      <span className="badge bg-primary">
                        {currentUser.user.role}
                      </span>
                    </div>
                  </div>
                  <hr />
                  <p className="card-text">
                    <strong>用戶 ID:</strong> {currentUser.user._id}
                  </p>
                  <p className="card-text">
                    <strong>電子信箱:</strong> {currentUser.user.email}
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-3">
              <div className="card h-100 border-0 shadow-sm bg-dark text-white">
                <div className="card-body p-4 d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title text-white-50">目前帳戶餘額</h5>
                    <h1 className="display-4 fw-bold text-warning">
                      $ {currentUser.user.balance.toLocaleString()}
                    </h1>
                  </div>
                  <div className="mt-3">
                    <small className="text-white-50">
                      * 此為模擬金，僅供測試使用
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileComponent;
