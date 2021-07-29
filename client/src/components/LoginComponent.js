import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthService from "../services/auth.service";
const LoginComponent = (props) => {
  let { currentUser, setCurrentUser } = props;
  const history = useHistory();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [message, setMessage] = useState("");
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleLogin = () => {
    AuthService.login(email, password)
      .then((response) => {
        console.log(response.data);
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        alert("登入成功");
        setCurrentUser(AuthService.getCurrentUser());
        history.push("/");
      })
      .catch((err) => {
        console.log(err.response);
        setMessage(err.response.data);
      });
  };
  return (
    <div className="row justify-content-center">
      <div
        style={{ padding: "2rem 3rem" }}
        className="col-md-4 border border-2 rounded pb-6 px-5"
      >
        <div>
          {message && (
            <div className="alert alert-danger" role="alert">
              {message}
            </div>
          )}
          <h1 className="text-center">會員登入</h1>
          <p class="fs-6 text-end">
            還沒有帳號嗎? <Link to="/register">點此註冊 </Link>
          </p>
          <div className="form-group">
            <label htmlFor="username">Email</label>
            <input
              onChange={handleChangeEmail}
              type="text"
              className="form-control"
              name="email"
            />
          </div>
          <br />
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              onChange={handleChangePassword}
              type="password"
              className="form-control"
              name="password"
            />
          </div>
          <br />
          <div className="form-group">
            <div className="d-grid gap-2 col-15 mx-auto mt-3">
              {" "}
              <button
                onClick={handleLogin}
                className="btn btn-primary btn-block"
              >
                <span>登入</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
