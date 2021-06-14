// user components

import Layout from "@/layout/CovidLayout";

import Hotspot from "./config/hotspot";
import Person from "./config/person-info";

const baseRoute = {
  path: "/",
  name: "Home",
  component: Layout,
  redirect: { name: "Hotspot" },
  meta: {
    title: "home"
  },
  children: [Hotspot, Person]
};
export default [baseRoute];
