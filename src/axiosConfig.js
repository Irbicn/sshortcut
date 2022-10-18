import axios from "axios";
import { appActions } from "./estado/appSlice";
import store from "./estado/store";

const appToken = process.env.REACT_APP_APPTOKEN;
const baseURL = process.env.REACT_APP_APIURL;
console.log(baseURL);

const getToken = () => {
  return localStorage.getItem("ELTOKEN");
};

const config = () => {
  axios.defaults.baseURL = baseURL;
  axios.interceptors.request.use(
    (config) => {
      config.headers["HEY"] = appToken;
      config.headers["ELTOKEN"] = getToken();
      config.headers["Content-Type"] = "application/json";
      return config;
    },
    (e) => Promise.reject(e)
  );
  axios.interceptors.response.use(
    (res) => res.data,
    (err) => {
      if (!err.response) return Promise.reject(err.message);
      if (err.response.status === 403) store.dispatch(appActions.logout);
      return Promise.reject(err.response.data);
    }
  );
};
export default config;
