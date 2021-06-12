<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />
    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu flex flex-middle">
      <div class="right-menu-item">
        <el-badge is-dot :value="200" class="item">
          <i class="el-icon-message" @click="showDrawer"></i>
        </el-badge>
      </div>
      <el-divider direction="vertical"></el-divider>
      <div class="right-menu-item">
        <i class="el-icon-unlock" title="锁屏" @click="lock"></i>
      </div>
      <el-divider direction="vertical"></el-divider>
      <div class="right-menu-item">
        <el-dropdown class="avatar-container" trigger="hover">
          <div class="avatar-wrapper flex flex-middle">
            <el-avatar
              shape="square"
              :size="30"
              :src="avatar"
              class="user-avatar"
            ></el-avatar>
            <b class="username">你好，{{ $store.getters.name }}</b>
          </div>
          <el-dropdown-menu slot="dropdown" class="user-dropdown">
            <router-link to="/">
              <el-dropdown-item>用户信息</el-dropdown-item>
            </router-link>
            <el-dropdown-item divided @click.native="logout"
              >退出登录</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <el-drawer
      title="我是标题"
      :visible.sync="drawer"
      :with-header="false"
      :append-to-body="true"
    >
      <span>我来啦!</span>
    </el-drawer>
    <transition name="el-fade-in-linear">
      <lock
        :password="lockPassword"
        v-if="showLock"
        :show.sync="showLock"
      ></lock>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import Lock from "@/components/Lock/Lock.vue";
export default {
  components: {
    Breadcrumb,
    Hamburger,
    Lock
  },
  data() {
    return {
      drawer: false,
      showLock: false,
      lockPassword: ""
    };
  },
  created() {
    this.showLock = JSON.parse(window.sessionStorage.getItem("lockStatus"));
  },
  computed: {
    ...mapGetters(["sidebar", "avatar"])
  },
  methods: {
    lock() {
      this.$prompt("请输入锁定密码", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /\w{5,10}/,
        inputErrorMessage: "请输入5-10位锁屏密码"
      }).then(({ value }) => {
        this.lockPassword = value;
        window.sessionStorage.setItem("lockStatus", JSON.stringify(value));
        this.showLock = true;
      });
    },
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    showDrawer() {
      this.drawer = !this.drawer;
    },
    async logout() {
      await this.$store.dispatch("user/logout");
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    padding-right: 30px;
    &:focus {
      outline: none;
    }
    .username {
      margin-left: 10px;
    }
    .right-menu-item {
      margin: 0 8px;
      font-size: 18px;
      color: #5a5e66;
      cursor: pointer;
      i {
        font-size: 25px;
      }
      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }
  }
}
</style>
