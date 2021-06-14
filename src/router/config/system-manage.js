// 系统管理路由
import Layout from "@/layout/ContentWithSidebarTemplate";

export default {
  path: "/system",
  name: "SystemManage",
  component: Layout,
  redirect: { name: "Account" },
  meta: {
    title: "系统管理",
    icon: "iconfont if-icon--"
  },
  children: [
    {
      path: "/system/account",
      name: "Account",
      component: () => import("@/views/system/UserManage"),
      meta: {
        title: "账号管理",
        icon: "el-icon-s-custom"
      }
    }
  ]
};
