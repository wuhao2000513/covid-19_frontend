// 首页仪表路由
export default {
  path: "/person",
  name: "Person",
  component: () => import("@/views/person/index"),
  meta: { title: "Person Infomation", icon: "el-icon-user" }
};
