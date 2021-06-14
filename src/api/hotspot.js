import { request } from "@/utils/http.js";
/**
 * 获取hotSpot列表
 * @param {object}} condition 查询条件
 */
export function get(condition) {
  return request.get("/hotspot", {
    params: condition
  });
}
/**
 * 新建hotSpot
 * @param {object} data hotSpot信息
 */
export function create(data) {
  return request.post("/hotspot", data);
}
/**
 * 修改hotSpot
 * @param {object} data 要修改的hotSpot信息
 */
export function update(id, data) {
  return request.put(`/hotspot/${id}`, data);
}

/**
 * 删除hotSpot
 * @param {string} id 要修改的hotSpot信息
 */
export function destroy(id) {
  return request.delete(`/hotspot/${id}`);
}
