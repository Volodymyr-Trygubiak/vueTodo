import Vue from "vue";
import axios from "axios";

const $axios = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
  headers: { "Content-Type": "application/json" }
});

$axios.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    // console.error(error);
    return Promise.reject(error.response);
  }
);

Vue.prototype.$axios = $axios;

export default $axios;
