import axios from "axios";
import tokenService from "./token.service";

const API_URL = "https://reqres.in/api/";


const login = (username:string, password:string) => {
  return axios
    .post(API_URL + "login", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.token) {
       tokenService.setUser(JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  tokenService.removeUser()
};

const authService = {
  login,
  logout,
};

export default authService;