import axios from "axios";

const API_URL = "https://reqres.in/api/";


const login = (username:string, password:string) => {
  return axios
    .post(API_URL + "login", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("token", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("token");
};

const authService = {
  login,
  logout,
};

export default authService;