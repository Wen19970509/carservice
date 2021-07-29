import axios from "axios";
const API_URL = "https://carscocarservice.herokuapp.com/api/cars";

class CarService {
  delete(_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.delete(API_URL + "/" + _id, {
      headers: {
        Authorization: token,
      },
    });
  }
  onSell(_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.patch(
      API_URL + "/" + _id,
      { sale: false },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }
  sell(_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.patch(
      API_URL + "/" + _id,
      { sale: true },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }
  edit(_id, carname, mileage, price, lowestPrice, description, year) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.patch(
      API_URL + "/" + _id,
      {
        carname,
        mileage,
        price,
        lowestPrice,
        description,
        year,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }
  getByID(_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.get(API_URL + "/" + _id, {
      headers: {
        Authorization: token,
      },
    });
  }
  get() {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.get(API_URL, {
      headers: {
        Authorization: token,
      },
    });
  }

  //search
  getCarsByName(name) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.get(API_URL + "/search/" + name, {
      headers: {
        Authorization: token,
      },
    });
  }
  post(carname, mileage, price, lowestPrice, description, year) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.post(
      API_URL,
      { carname, mileage, price, lowestPrice, description, year },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }
}

export default new CarService();
