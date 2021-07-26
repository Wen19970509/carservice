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
    CarsService.getCarsByName(searchInput)
      .then((data) => {
        let searchData = data.data;
        setSearchResult(
          searchData.filter((item) => {
            return item.sale == false;
          })
        );
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const handleSell = (e) => {
    console.log(e.target.id);
    CarsService.sell(e.target.id)
      .then((d) => {
        console.log(d);
        history.go(0);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const handleEdit = async (e) => {
    const data = await CarsService.getByID(e.target.id)
      .then((d) => {
        return d.data;
        // setOldData(d.data);
        // console.log(oldData);
      })
      .catch((e) => {
        console.log(e);
      });
    console.log(data);
    setOldData(data);
    history.push("/edit");
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
      <div className="col-md-7 pb-6 px-5 pt-4 ">
        {" "}
        {currentUser && (
          <div className="search input-group mb-3">
            <input
              placeholder="此功能只會顯示上架中車輛"
              onChange={handleChangeInput}
              type="text"
              class="form-control"
            />
            <button onClick={handleSearch} className="btn btn-primary">
              搜尋
            </button>
          </div>
        )}
      </div>
      {currentUser && searchResult && searchResult != 0 && (
        <div>
          <h1>搜尋結果</h1>
          <table className="table table-striped table-hover tb table-bordered border-secondary">
            <thead>
              <tr>
                <th>車款</th>
                <th>年份</th>
                <th>里程</th>
                <th>售價</th>
                <th>底價</th>
                <th>備註</th>
                <th>編輯、出售</th>
              </tr>
            </thead>
            <tbody>
              {searchResult.map((cars) => (
                <tr>
                  <td>{cars.carname}</td>
                  <td>{cars.year}</td>
                  <td>{cars.mileage} km</td>
                  <td>{cars.price} 萬</td>
                  <td>{cars.lowestPrice} 萬</td>
                  <td>{cars.description}</td>
                  <td className="opt">
                    <a
                      id={cars._id}
                      onClick={handleEdit}
                      className="btn btn-secondary"
                    >
                      編輯
                    </a>
                    <a
                      onClick={handleSell}
                      className="btn btn-success"
                      id={cars._id}
                    >
                      售出
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Search;
