// 首页仪表路由

export default {
  path: "/hotspot",
  name: "Hotspot",
  component: () => import("@/views/hotspotManage/index"),
  meta: { title: "hotspot", icon: "el-icon-map-location" }
};
