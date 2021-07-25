import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import CarsService from "../services/cars.service";
const Search = (props) => {
  let { currentUser, setEditID, setOldData } = props;
  const history = useHistory();
  let [searchInput, setSearchInput] = useState("");
  let [searchResult, setSearchResult] = useState(null);
  const handleTakeToLogin = () => {
    history.push("/login");
  };
  const handleChangeInput = (e) => {
    setSearchInput(e.target.value);
  };
  const handleSearch = () => {
    // CarsService.getCourseByName(searchInput)
    //   .then((data) => {
    //     console.log(data);
    //     setSearchResult(data.data);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
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
        <div className="search input-group mb-3">
          <input
            onChange={handleChangeInput}
            type="text"
            class="form-control"
          />
          <button onClick={handleSearch} className="btn btn-primary">
            Search
          </button>
        </div>
      )}
    </div>
  );
};

export default Search;
