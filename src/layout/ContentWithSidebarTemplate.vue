<template>
  <div class="full-height flex">
    <div class="left-box full-height">
      <Sidebar :routes="routes"></Sidebar>
    </div>
    <div class="right-box full-height">
      <PageContent></PageContent>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/layout/components/Sidebar";
import PageContent from "./components/SidebarContent";
export default {
  components: {
    Sidebar,
    PageContent
  },
  computed: {
    routes() {
      const Menu = this.$store.state.user.userMenu;
      let r;
      Menu.some(route => {
        if (route.path == this.$route.matched[1].path) {
          r = route.children || [];
        }
      });
      return r;
    }
  }
};
</script>

<style lang="less" scoped>
.left-box {
  width: @sideBarWidth;
  border-right: 1px solid #dcdfe6;
  background-color: #202023;
}
.right-box {
  width: calc(100% - @sideBarWidth);
}
</style>
