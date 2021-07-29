import React, { useState, useEffect } from "react";
import AuthService from "../services/auth.service";
import { useHistory } from "react-router-dom";
const Profile = (props) => {
  let { currentUser, setCurrentUser } = props;
  const history = useHistory();
  const handleTakeToLogin = () => {
    history.push("/login");
  };
  return (
    <div className="row justify-content-center text-center">
      {!currentUser && (
        <div className="mx-auto text-center">
          <h1>需先登入帳號才可進入此頁面</h1>
          <button
            className="btn btn-primary btn-lg"
            onClick={handleTakeToLogin}
          >
            點此登入
          </button>
        </div>
      )}
      {currentUser && (
        <div>
          <h1>會員中心</h1>
          <header className="jumbotron">
            <h3>
              <strong>{currentUser.user.username}</strong>
            </h3>
          </header>
          <p>
            <strong>Email:{currentUser.user.email}</strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default Profile;
