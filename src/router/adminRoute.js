import Layout from "@/layout/CovidLayout";
import HotspotMan from "./config/hotspotManage";
import Person from "./config/person-info";
import Qrcode from "./config/qrcode";
const baseRoute = {
  path: "/",
  name: "Home",
  component: Layout,
  redirect: { name: "Hotspot" },
  meta: {
    title: "home"
  },
  children: [HotspotMan, Qrcode, Person]
};

export default [baseRoute];
