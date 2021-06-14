<template>
  <div class="full-height flex">
    <div class="left-box full-height flex flex-col">
      <div class="logo-box" style="color:#fff">
        LOGO
      </div>
      <ul class="flex-grow-1">
        <template v-for="menu in userMenu">
          <router-link
            v-if="!menu.hidden"
            :to="menu.path"
            :key="menu.path"
            v-slot="{ navigate, isActive }"
            custom
          >
            <li
              :class="['menu-item', isActive ? 'route-active' : '']"
              @click="navigate"
            >
              <i :class="menu.meta.icon ? menu.meta.icon : ''"></i>
              <span v-text="menu.meta.title"></span>
            </li>
          </router-link>
        </template>
      </ul>
    </div>
    <div class="right-box flex flex-col full-height">
      <TopBar></TopBar>
      <div class="flex-grow-1 flex flex-col full-width flow-hidden">
        <div class="flex-grow-1">
          <router-view></router-view>
        </div>
        <div class="footer-box">
          footer
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/layout/components/Sidebar";
import PageContent from "./components/SidebarContent";
import TopBar from "@/layout/components/TopBar";

export default {
  components: {
    Sidebar,
    PageContent,
    TopBar,
  },
  computed: {
    routes() {
      const Menu = this.$store.state.user.userMenu;
      let r;
      Menu.some((route) => {
        if (route.path == this.$route.matched[1].path) {
          r = route.children || [];
        }
      });
      return r;
    },
    userMenu() {
      console.log(
        " this.$store.state.user.userMenu",
        this.$store.state.user.userMenu
      );
      return this.$store.state.user.userMenu;
    },
  },
};
</script>

<style lang="less" scoped>
.left-box {
  width: @sideBarWidth;
  border-right: 1px solid #dcdfe6;
  background-color: #202023;
  .logo-box {
    height: 100px;
    // background-color: #fff;
  }
  .menu-item {
    height: 100px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: #fff;
    cursor: pointer;
    &.route-active {
      background-color: #409eff;
      color: #fff;
    }
    i {
      font-size: 25px;
    }
    span {
      font-size: 12px;
      margin-top: 8px;
      user-select: none;
    }
  }
}
.right-box {
  width: calc(100% - @sideBarWidth);
  .footer-box {
    height: 40px;
    line-height: 40px;
  }
}
</style>
