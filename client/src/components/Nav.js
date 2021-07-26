import React from "react";
import { Link, useHistory } from "react-router-dom";
import AuthService from "../services/auth.service";
const NavComponent = (props) => {
  let { currentUser, setCurrentUser } = props;
  const history = useHistory();
  const handleLogout = () => {
    AuthService.logout();
    alert("您已登出，將重新回到首頁");
    setCurrentUser(null);
    history.push("/");
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark ">
      <div className="container-fluid  ">
        <Link className="navbar-brand" to="/">
          CarsGO | 好事多車管家
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav me-auto mb-2 mb-md-0 ">
            <li className="nav-item">
              <Link className="nav-link  active" aria-current="page" to="/">
                首頁
              </Link>
            </li>

            {currentUser && (
              <li className="nav-item">
                <Link className="nav-link" to="/cars">
                  車輛總表
                </Link>
              </li>
            )}
            {currentUser && (
              <li className="nav-item">
                <Link className="nav-link" to="/postCar">
                  登錄車輛
                </Link>
              </li>
            )}
            {currentUser && (
              <li className="nav-item">
                <Link className="nav-link" to="/search">
                  搜尋
                </Link>
              </li>
            )}
          </ul>
          <div className="d-flex">
            <ul className="navbar-nav me-auto mb-2 mb-md-0 ">
              {!currentUser && (
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    登入
                  </Link>
                </li>
              )}
              {!currentUser && (
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    註冊帳號
                  </Link>
                </li>
              )}
              {currentUser && (
                <li className="nav-item">
                  <Link onClick={handleLogout} className="nav-link" to="#">
                    登出
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavComponent;
