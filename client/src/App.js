import React, { useState } from "react";
import "./styles/style.css";
import { Switch, Route } from "react-router-dom";
import NavComponent from "./components/Nav";
import Homecomponent from "./components/Homepage";
import RegisterComponent from "./components/RegisterComponent";
import LoginComponent from "./components/LoginComponent";
import Cars from "./components/Cars";
import PostCar from "./components/PostCar";
import Edit from "./components/Edit";
import Search from "./components/Search";
import AuthService from "./services/auth.service";
const App = () => {
  let [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser);
  let [editID, setEditID] = useState("");
  let [oldData, setOldData] = useState({});
  return (
    <div>
      <NavComponent currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Switch>
        <div className="body">
          <Route path="/" exact>
            <div className="home">
              <Homecomponent
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            </div>
          </Route>
          <Route path="/register" exact>
            <div className="form">
              <RegisterComponent />
            </div>
          </Route>
          <Route path="/login" exact>
            <div className="form">
              <LoginComponent
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            </div>
          </Route>
          <Route path="/cars" exact>
            <div className="tot">
              {" "}
              <Cars
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                setEditID={setEditID}
                editID={editID}
                setOldData={setOldData}
              />
            </div>
          </Route>
          <Route path="/search" exact>
            <div className="tot">
              {" "}
              <Search
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            </div>
          </Route>
          <Route path="/edit" exact>
            <div className="form">
              {" "}
              <Edit
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                editID={editID}
                setEditID={setEditID}
                oldData={oldData}
                setOldData={setOldData}
              />
            </div>
          </Route>
          <Route path="/postCar" exact>
            <div className="form">
              {" "}
              <PostCar
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            </div>
          </Route>
        </div>
      </Switch>
    </div>
  );
};

export default App;
