import React from "react";
import car1 from "../img/1.jpg";
import car2 from "../img/2.jpg";
import car3 from "../img/4.jpg";
import { Link } from "react-router-dom";
const Homecomponent = (props) => {
  let { currentUser, setCurrentUser } = props;
  return (
    <main>
      <div id="myCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide-to={0}
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          />
          <button
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide-to={1}
            aria-label="Slide 2"
          />
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={car1} alt="" className="hmg" />
            <div className="container">
              <div className="carousel-caption text-start ">
                <h1>最棒的車商助手</h1>
                <p>
                  車輛好多難管理? <br />
                  規格配備總記錯?
                </p>
                {!currentUser && (
                  <p>
                    <Link className="btn btn-lg btn-primary" to="/register">
                      馬上註冊使用
                    </Link>
                  </p>
                )}
                {currentUser && (
                  <p>
                    <Link className="btn btn-lg btn-primary" to="/postCar">
                      登錄車輛
                    </Link>
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <img src={car2} alt="" className="img" />
            <div className="container">
              <div className="carousel-caption fix">
                <h1>全台最多中古車商選用的內部管理系統</h1>
                <p>想要打敗對手，就得贏在起點！</p>
              </div>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#myCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#myCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      {/* Marketing messaging and featurettes
    ================================================== */}
      {/* Wrap the rest of the page in another container to center all the content. */}
      <div className="container marketing">
        {/* /.row */}
        {/* START THE FEATURETTES */}
        <hr className="featurette-divider" />
        <div className="row featurette">
          <div className="col-md-7">
            <h2 className="featurette-heading">
              前員工真實的經驗設計打造！{" "}
              <span className="text-muted">MERN全棧開發實例！</span>
            </h2>
            <p className="lead">
              此專案使用MERN進行開發製作，全自製，靈感來自於過去工作血淋淋的案例！
            </p>
          </div>
          <div className="col-md-5">
            <img src={car3} alt="" className="img2" />
          </div>
        </div>
        <hr className="featurette-divider" />
        {/* /END THE FEATURETTES */}
      </div>

      <footer className="container">
        <p className="float-end">
          <a href="#">Back to top</a>
        </p>
        <p>© 2021 HsuWenChen</p>
      </footer>
    </main>
  );
};

export default Homecomponent;
