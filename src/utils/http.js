import axios from "axios";
import { Message } from "element-ui";
import { getToken, setToken, removeToken } from "@/utils/auth";
import router from "@/router/index.js";
import Store from "@/store";
// create an axios instance
const service = axios.create({
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
});
// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    return config;
  },
  error => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  response => {
    console.log("响应结果", response);
    const status = response.status;
    if (status == 200) {
      // 如果有authorization头保存token
      // if (response.headers.authorization) {
      //   const Token = response.headers.authorization;
      //   setToken(Token);
      //   Store.commit("user/SET_TOKEN", Token);
      // }
      const res = response.data;
      if (res.code == 200) {
        return res.data;
      } else {
        Message.warning(res.message);
        return;
      }
    } else {
      return response;
    }
  },
  error => {
    const response = error.response;
    Message({
      message: error.response.data.message,
      type: "error",
      duration: 5 * 1000
    });
    if (response.status === 401) {
      removeToken();
      return router.push({ name: "Login" });
    }
    return Promise.reject(error);
  }
);

// 实例化axios
const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  withCredentials: true
});
// 请求拦截
instance.interceptors.request.use(config => {
  console.log(config, "config");
  return config;
});
// 响应拦截
instance.interceptors.response.use(
  response => {
    if (response.status === 200) {
      if (response.config.method === "options") {
        return "";
      }
      return response.data;
    }
    Message({
      message: response.data.message,
      type: "warning",
      duration: 5 * 1000
    });
    return response;
  },
  error => {
    Message({
      message: error,
      type: "error",
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);
export const request = service;
export const ajax = instance;
