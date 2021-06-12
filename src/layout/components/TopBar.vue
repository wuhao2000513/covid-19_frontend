<template>
  <div class="top-bar-box relative flex">
    <div class="main-menu-box full-height flex flex-middle flex-center">
      <!-- <div class="logo-box full-height flow-hidden">
        <img src="../../assets/img/logo.png" />
      </div> -->
      <!-- <ul class="menu-list flex flex-middle">
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
      </ul> -->
      <div class="case-item ">
        <span>
          确诊人数
        </span>
        <span>
          123
        </span>
      </div>
      <div class="case-item">
        1
      </div>
      <div class="case-item">
        1
      </div>
    </div>
    <!-- 第二菜单 -->
    <div class="secondary-menu-box full-height flex flex-middle">
      <el-divider direction="vertical"></el-divider>
      <!-- <div class="right-menu-item">
        <el-badge is-dot :value="200" class="item">
          <i class="el-icon-message" @click="showDrawer"></i>
        </el-badge>
      </div> -->
      <!-- <div class="right-menu-item">
        <i class="el-icon-unlock" title="锁屏" @click="lock"></i>
      </div> -->
      <div class="right-menu-item">
        <el-dropdown class="avatar-container" trigger="click">
          <div class="avatar-wrapper flex flex-middle">
            <el-avatar
              shape="square"
              :size="30"
              :src="avatar"
              class="user-avatar"
            ></el-avatar>
            <p class="username">
              你好，<br />
              <span>
                {{ $store.getters.name }}
              </span>
            </p>
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
      <Lock
        :password="lockPassword"
        v-if="showLock"
        :show.sync="showLock"
      ></Lock>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  components: {
    Lock: () => import("@/components/Lock/Lock.vue"),
  },
  data() {
    return {
      drawer: false,
      showLock: false,
    };
  },
  computed: {
    ...mapGetters(["avatar"]),
    userMenu() {
      return this.$store.state.user.userMenu;
    },
  },
  methods: {
    // 锁屏
    lock() {
      this.$prompt("请输入锁定密码", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /\w{5,10}/,
        inputErrorMessage: "请输入5-10位锁屏密码",
      }).then(({ value }) => {
        this.lockPassword = value;
        window.sessionStorage.setItem("lockStatus", JSON.stringify(value));
        this.showLock = true;
      });
    },
    showDrawer() {
      this.drawer = !this.drawer;
    },
    // 退出登录
    logout() {
      this.$store.dispatch("user/logout").finally(() => {
        this.$router.push(`/login?redirect=${this.$route.fullPath}`);
      });
    },
  },
};
</script>

<style lang="less" scoped>
.top-bar-box {
  height: 60px;
  // background-color: #202023;
  .main-menu-box {
    width: 80%;
    padding-right: 20px;
    .case-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 200px;
    }
    .logo-box {
      background-color: #fff;
      width: @sideBarWidth;
      line-height: 60px;
    }
    .menu-list {
      height: 60px;
      .menu-item {
        width: 100px;
        height: 100%;
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
  }
  .secondary-menu-box {
    width: 20%;
    .username {
      margin-left: 10px;
      color: #fff;
    }
    .right-menu-item {
      margin: 0 10px;
      font-size: 16px;
      color: #5a5e66;
      cursor: pointer;
      i {
        font-size: 25px;
        color: #fff;
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
