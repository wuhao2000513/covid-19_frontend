import { request } from "@/utils/http.js";
/**
 * 获取群组
 * @returns {Promise}
 */
export function getGroup() {
  return request.get("/device-group");
}
/**
 * 创建群组
 * @param {object} groupInfo 组信息
 * @returns {Promise}
 */
export function createGroup(groupInfo) {
  return request.post("/device-group", groupInfo);
}
/**
 * 删除群组
 * @param {number} id 该组的id
 * @returns {Promise}
 */
export function delGroup(id) {
  return request.delete("/device-group/" + id);
}
