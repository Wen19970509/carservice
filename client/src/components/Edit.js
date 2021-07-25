import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import CarsService from "../services/cars.service";
const Edit = (props) => {
  let { currentUser, setCurrentUser, editID, setEditID, oldData, setOldData } =
    props;
  let [carname, setCarname] = useState("");
  let [mileage, setMileage] = useState(0);
  let [price, setPrice] = useState(0);
  let [lowestPrice, setLowestPrice] = useState(0);
  let [description, setDescription] = useState("");
  let [year, setYear] = useState(0);
  let [message, setMessage] = useState("");
  const history = useHistory();
  const handleTakeToLogin = () => {
    history.push("/login");
  };
  const handleChangeCarname = (e) => {
    setCarname(e.target.value);
  };
  const handleChangeMileage = (e) => {
    setMileage(e.target.value);
  };
  const handleChangePrice = (e) => {
    setPrice(e.target.value);
  };
  const handleChangeLowestPrice = (e) => {
    setLowestPrice(e.target.value);
  };
  const handleChangeDesciption = (e) => {
    setDescription(e.target.value);
  };
  const handleChangeYear = (e) => {
    setYear(e.target.value);
  };
  const editCar = () => {
    CarsService.edit(
      editID,
      carname,
      mileage,
      price,
      lowestPrice,
      description,
      year
    )
      .then(() => {
        alert("編輯成功");
        history.push("/cars");
      })
      .catch((e) => {
        console.log(e.response);
        setMessage(e.response.data);
      });
  };
  return (
    <div className="row justify-content-center">
      <div className="col-md-7 pb-6 px-5 pt-2 ">
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
        {message && (
          <div className="alert alert-warning" role="alert">
            {message}
          </div>
        )}
        {currentUser && (
          <div className="form-group">
            <h1>車輛編輯</h1>

            <label for="exampleforTitle">車款</label>
            <input
              placeholder={oldData.carname}
              name="carname"
              type="text"
              className="form-control"
              id="exampleforTitle"
              onChange={handleChangeCarname}
            />
            <br />
            <label for="exampleforPrice">年份 </label>
            <input
              placeholder={oldData.year}
              name="year"
              type="text"
              className="form-control"
              id="exampleforPrice"
              onChange={handleChangeYear}
            />
            <br />
            <label for="exampleforTitle">里程(km)</label>
            <input
              placeholder={oldData.mileage}
              name="mileage"
              type="number"
              className="form-control"
              id="exampleforTitle"
              onChange={handleChangeMileage}
            />
            <br />
            <label for="exampleforPrice">售價 (萬)</label>
            <input
              placeholder={oldData.price}
              name="price"
              type="number"
              className="form-control"
              id="exampleforPrice"
              onChange={handleChangePrice}
            />
            <br />
            <label for="exampleforPrice">底價 (萬)</label>
            <input
              placeholder={oldData.lowestPrice}
              name="lowestPrice"
              type="number"
              className="form-control"
              id="exampleforPrice"
              onChange={handleChangeLowestPrice}
            />
            <br />
            <label for="exampleforContent">備註</label>
            <textarea
              placeholder={oldData.description}
              className="form-control"
              id="exampleforContent"
              aria-describedby="emailHelp"
              name="content"
              onChange={handleChangeDesciption}
            />
            <br />
            <div className="d-grid gap-2 col-15 mx-auto mt-3">
              <button onClick={editCar} className="btn btn-primary ">
                送出
              </button>
            </div>
            <br />
            <br />
          </div>
        )}
      </div>{" "}
    </div>
  );
};

export default Edit;
