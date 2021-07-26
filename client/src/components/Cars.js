import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import CarsService from "../services/cars.service";

const Cars = (props) => {
  let { currentUser, setOldData, oldData } = props;
  const history = useHistory();
  const handleTakeToLogin = () => {
    history.push("/login");
  };
  let [carUnSold, setCarUnSold] = useState(null);
  let [carSold, setCarSold] = useState(null);
  let [deleteID, setDeleteID] = useState("");
  useEffect(() => {
    console.log("Using Effect");
    CarsService.get()
      .then((data) => {
        let carData = data.data;
        let carUnSold = carData.filter((item) => {
          return item.sale == false;
        });
        let carSold = carData.filter((item) => {
          return item.sale == true;
        });
        setCarUnSold(carUnSold);
        setCarSold(carSold);
        // setCarData(data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
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
  const handleOnSell = (e) => {
    CarsService.onSell(e.target.id)
      .then((d) => {
        console.log(d);
        history.go(0);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const handleDelete = (e) => {
    CarsService.delete(e.target.id)
      .then((d) => {
        console.log(d);
        history.go(0);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const handlID = (e) => {
    setDeleteID(e.target.id);
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
  useEffect((d) => {
    setOldData({});
  }, []);
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

      {currentUser && carUnSold && carUnSold.length != 0 && (
        <div>
          <h1>在售車輛表</h1>
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
              {carUnSold.map((cars) => (
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

      {currentUser && carSold && carSold.length != 0 && (
        <div>
          <h1>已售車輛表</h1>
          <table className="table table-striped table-hover tb table-bordered border-secondary table-warning">
            <thead>
              <tr>
                <th>車款</th>
                <th>年份</th>
                <th>里程</th>
                <th>售價</th>
                <th>底價</th>
                <th>備註</th>
                <th>移除或上架</th>
              </tr>
            </thead>
            <tbody>
              {carSold.map((cars) => (
                <tr className="text-muted">
                  <td>{cars.carname}</td>
                  <td>{cars.year}</td>
                  <td>{cars.mileage} km</td>
                  <td>{cars.price} 萬</td>
                  <td>{cars.lowestPrice} 萬</td>
                  <td>{cars.description}</td>
                  <td className="opt">
                    <a
                      onClick={handleOnSell}
                      className="btn btn-success"
                      id={cars._id}
                    >
                      重新上架
                    </a>
                    <a
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                      onClick={handlID}
                      className="btn btn-danger"
                      id={cars._id}
                    >
                      移除資料
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* 刪除互動視窗 */}
          <div
            className="modal fade"
            id="staticBackdrop"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex={-1}
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title t" id="staticBackdropLabel">
                    刪除資料
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  />
                </div>
                <div className="modal-body text-danger">
                  確定要刪除這筆資料？
                </div>
                <div className="modal-footer">
                  <button
                    onClick={handleDelete}
                    type="button"
                    className="btn btn-danger"
                    id={deleteID}
                  >
                    確定
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    取消
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cars;
