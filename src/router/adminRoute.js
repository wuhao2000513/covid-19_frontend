import Layout from "@/layout/CovidLayout";
import HotspotMan from "./hotspotManage";
const baseRoute = {
  path: "/",
  name: "Home",
  component: Layout,
  redirect: { name: "Hotspot" },
  meta: {
    title: "home"
  },
  children: [HotspotMan]
};

export default [baseRoute];
