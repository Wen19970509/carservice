import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import CarsService from "../services/cars.service";
const PostCar = (props) => {
  let { currentUser, setCurrentUser } = props;
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
  const postCar = () => {
    CarsService.post(carname, mileage, price, lowestPrice, description, year)
      .then(() => {
        alert("發布成功");
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

        {currentUser && (
          <div className="form-group">
            <h1>車輛登陸</h1>
            {message && (
              <div className="alert alert-warning" role="alert">
                {message}
              </div>
            )}
            <label for="exampleforTitle">車款</label>
            <input
              name="carname"
              type="text"
              className="form-control"
              id="exampleforTitle"
              onChange={handleChangeCarname}
              required
            />
            <br />
            <label for="exampleforPrice">年份 </label>
            <input
              placeholder="YY.MM"
              name="year"
              type="text"
              className="form-control"
              id="exampleforPrice"
              onChange={handleChangeYear}
              required
            />
            <br />
            <label for="exampleforTitle">里程(km)</label>
            <input
              name="mileage"
              type="number"
              className="form-control"
              id="exampleforTitle"
              onChange={handleChangeMileage}
              required
            />
            <br />
            <label for="exampleforPrice">售價 (萬)</label>
            <input
              name="price"
              type="number"
              className="form-control"
              id="exampleforPrice"
              onChange={handleChangePrice}
              required
            />
            <br />
            <label for="exampleforPrice">底價 (萬)</label>
            <input
              name="lowestPrice"
              type="number"
              className="form-control"
              id="exampleforPrice"
              onChange={handleChangeLowestPrice}
              required
            />
            <br />
            <label for="exampleforContent">備註</label>
            <textarea
              className="form-control"
              id="exampleforContent"
              aria-describedby="emailHelp"
              name="content"
              onChange={handleChangeDesciption}
            />
            <br />
            <div className="d-grid gap-2 col-15 mx-auto mt-3">
              <button className="btn btn-primary " onClick={postCar}>
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

export default PostCar;
