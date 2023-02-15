import axios from "axios";

export const setHeader = (value) => {
  axios.defaults.headers.common["authorization"] = value;
};

export const clearStorage = () => {
  localStorage.clear();
};
