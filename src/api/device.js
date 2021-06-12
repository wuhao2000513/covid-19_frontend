import { request } from "@/utils/http.js";
// 设备接口
/**
 * 获取设备列表
 * @param {object}} condition 查询条件
 */
export function getDevice(condition) {
  return request.get("/device", {
    params: condition
  });
}
/**
 * 添加设备
 * @param {object} data 设备信息
 */
export function addDevice(data) {
  return request.post("/device", data);
}
/**
 * 修改设备信息
 * @param {object} data 要修改的设备信息
 */
export function updateDevice(id, data) {
  return request.put(`/device/${id}`, data);
}
/**
 * 删除设备
 * @param {number} id 设备id
 * @return {Promise}
 */
export function deleteDevice(id) {
  return request.delete("/device/" + id);
}

// 组接口
/**
 * 获取所有组列表
 */
export function getGroup() {
  return request.get("/device-group");
}
