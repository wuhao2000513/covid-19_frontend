import { request } from "@/utils/http.js";
/**
 * 获取用户列表
 * @param {object}} condition 查询条件
 */
export function getUsers(condition) {
  return request.get("/user", {
    params: condition
  });
}
/**
 * 新建账号
 * @param {object} data 账号信息
 */
export function crateAccount(data) {
  return request.post("/user", data);
}
/**
 * 修改账号
 * @param {object} data 要修改的账号信息
 */
export function updateAccount(id, data) {
  return request.put(`/user/${id}`, data);
}
/**
 * 获取账号角色定义列表
 */
export function getRole() {
  return request.get("/role");
}
/**
 * 获取账号状态定义列表
 */
export function getAccountState() {
  return request.get("/account-state");
}
