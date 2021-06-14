import { request } from "@/utils/http.js";
//获取验证码
export function getCaptcha(data) {
  return request.get("/getCaptcha?t=" + Date.now(), {
    params: data
  });
}
//登录
export function signin(loginForm) {
  return request.post("/signin", loginForm);
}
//登录
export function signup(loginForm) {
  return request.post("/signup", loginForm);
}
//登出
export function signout() {
  return request.post("/signout");
}
//获取用户
export function getUser(id) {
  return request.get(`/getUser?id=${id}`);
}
