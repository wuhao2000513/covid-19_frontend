import Layout from "@/layout/CovidLayout";
import Person from "./config/person-info";
import Record from "./config/checkinRecord";
const baseRoute = {
  path: "/",
  name: "Home",
  component: Layout,
  redirect: { name: "Hotspot" },
  meta: {
    title: "home"
  },
  children: [Record, Person]
};

export default [baseRoute];
