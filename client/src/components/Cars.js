import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import CarsService from "../services/cars.service";

const Cars = (props) => {
  let { currentUser, setOldData, oldData } = props;
  const history = useHistory();
  const location = useLocation();
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
        window.location.reload();
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const handleOnSell = (e) => {
    CarsService.onSell(e.target.id)
      .then((d) => {
        console.log(d);
        window.location.reload();
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const handleDelete = (e) => {
    CarsService.delete(e.target.id)
      .then((d) => {
        console.log(d);
        window.location.reload();
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
  return (
    <div className="row justify-content-center text-center">
      {!currentUser && (
        <div className="mx-auto text-center">
          <h1>???????????????????????????????????????</h1>
          <button
            className="btn btn-primary btn-lg"
            onClick={handleTakeToLogin}
          >
            ????????????
          </button>
        </div>
      )}

      {currentUser && carUnSold && carUnSold.length != 0 && (
        <div>
          <h1>???????????????</h1>
          <table className="table table-striped table-hover tb table-bordered border-secondary">
            <thead>
              <tr>
                <th>??????</th>
                <th>??????</th>
                <th>??????</th>
                <th>??????</th>
                <th>??????</th>
                <th>??????</th>
                <th>???????????????</th>
              </tr>
            </thead>
            <tbody>
              {carUnSold.map((cars) => (
                <tr>
                  <td>{cars.carname}</td>
                  <td>{cars.year}</td>
                  <td>{cars.mileage} km</td>
                  <td>{cars.price} ???</td>
                  <td>{cars.lowestPrice} ???</td>
                  <td>{cars.description}</td>
                  <td className="opt">
                    <a
                      id={cars._id}
                      onClick={handleEdit}
                      className="btn btn-secondary"
                    >
                      ??????
                    </a>
                    <a
                      onClick={handleSell}
                      className="btn btn-success"
                      id={cars._id}
                    >
                      ??????
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
          <h1>???????????????</h1>
          <table className="table table-striped table-hover tb table-bordered border-secondary table-warning">
            <thead>
              <tr>
                <th>??????</th>
                <th>??????</th>
                <th>??????</th>
                <th>??????</th>
                <th>??????</th>
                <th>??????</th>
                <th>???????????????</th>
              </tr>
            </thead>
            <tbody>
              {carSold.map((cars) => (
                <tr className="text-muted">
                  <td>{cars.carname}</td>
                  <td>{cars.year}</td>
                  <td>{cars.mileage} km</td>
                  <td>{cars.price} ???</td>
                  <td>{cars.lowestPrice} ???</td>
                  <td>{cars.description}</td>
                  <td className="opt">
                    <a
                      onClick={handleOnSell}
                      className="btn btn-success"
                      id={cars._id}
                    >
                      ????????????
                    </a>
                    <a
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                      onClick={handlID}
                      className="btn btn-danger"
                      id={cars._id}
                    >
                      ????????????
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* ?????????????????? */}
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
                    ????????????
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  />
                </div>
                <div className="modal-body text-danger">
                  ??????????????????????????????
                </div>
                <div className="modal-footer">
                  <button
                    onClick={handleDelete}
                    type="button"
                    className="btn btn-danger"
                    id={deleteID}
                  >
                    ??????
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    ??????
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
