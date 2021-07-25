import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthService from "../services/auth.service";
const RegisterComponent = () => {
  const history = useHistory();
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [message, setMessage] = useState("");
  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleRegister = () => {
    AuthService.register(username, email, password)
      .then(() => {
        alert("註冊成功，將跳轉至登入頁面");
        history.push("/login");
      })
      .catch((err) => {
        console.log(err.response);
        setMessage(err.response.data);
      });
  };
  return (
    <div className="row justify-content-center">
      {" "}
      <div
        style={{ padding: "2rem" }}
        className="col-md-4 border border-2 rounded pb-6 px-5"
      >
        <div>
          {message && <div className="alert alert-danger ">{message}</div>}
          <div>
            <h1 className="text-center">快速註冊</h1>
            <p class="fs-6 text-end">
              有帳號了嗎? <Link to="/login">點此登入 </Link>
            </p>
            <label className="fs-5" htmlFor="username">
              用戶名稱
            </label>
            <input
              onChange={handleChangeUsername}
              type="text"
              className="form-control"
              name="username"
            />
          </div>
          <br />
          <div className="form-group">
            <label className="fs-5" htmlFor="email">
              電子信箱
            </label>
            <input
              onChange={handleChangeEmail}
              type="text"
              className="form-control"
              name="email"
            />
          </div>
          <br />
          <div className="form-group">
            <label className="fs-5" htmlFor="password">
              密碼
            </label>
            <input
              onChange={handleChangePassword}
              type="password"
              className="form-control"
              name="password"
            />
          </div>
          <br />
          <div className="d-grid gap-2 col-15 mx-auto mt-3">
            <button
              onClick={handleRegister}
              className="btn btn-primary btn-lg "
            >
              <span>註冊</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterComponent;
