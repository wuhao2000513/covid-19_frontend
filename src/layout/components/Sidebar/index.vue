<template>
  <el-scrollbar class="full-height" wrap-class="scrollbar-wrapper">
    <el-menu
      :default-active="activeMenu"
      :text-color="variables.menuText"
      :unique-opened="false"
      :active-text-color="variables.menuActiveText"
      mode="vertical"
    >
      <SidebarItem
        v-for="route in routes"
        :key="route.path"
        :item="route"
        :base-path="route.path"
      />
    </el-menu>
  </el-scrollbar>
</template>

<script>
// import { mapGetters } from 'vuex';
import SidebarItem from "./SidebarItem";
import variables from "@/styles/variables.scss";

export default {
  props: ["routes"],
  components: { SidebarItem },
  computed: {
    // ...mapGetters(['sidebar']),
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    variables() {
      return variables;
    }
    // isCollapse() {
    //   return !this.sidebar.opened;
    // },
  }
};
</script>
