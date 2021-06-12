<template>
  <div class="full-size lock-box">
    <div class="absolute-center">
      <p>
        此电脑被锁定
        <span class="error-text">{{ errorText }}</span>
      </p>
      <div class="flex">
        <el-form>
          <el-form-item label></el-form-item>
        </el-form>
        <el-input
          placeholder="请输入密码解锁"
          v-model="unlockPassword"
          label="111"
          clearable
          show-password
        >
          <el-button
            slot="append"
            type="primary"
            :round="false"
            icon="el-icon-lock"
            @click="unlock"
            >解锁</el-button
          >
        </el-input>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["password", "show"],
  data() {
    return {
      input: "",
      unlockPassword: "",
      errorText: ""
    };
  },
  created() {
    document.oncontextmenu = function() {
      return false;
    };
    document.onkeydown = function(event) {
      if (event.keyCode > 111 && event.keyCode < 124) {
        return false;
      }
    };
  },
  beforeDestroy() {
    document.oncontextmenu = null;
  },
  methods: {
    unlock() {
      if (this.unlockPassword != this.password) {
        this.errorText = "密码错误";
        let timer = setTimeout(() => {
          this.errorText = "";
          window.clearTimeout(timer);
        }, 2000);
        return;
      } else {
        this.$emit("update:show", false);
        document.onkeydown = document.oncontextmenu = null;
        window.sessionStorage.setItem("lockStatus", JSON.stringify(false));
      }
    }
  }
};
</script>

<style lang="less" scoped>
.lock-box {
  position: fixed;
  z-index: 999999;
  top: 0;
  left: 0;
  // filter: blur(2px);
  background: url("../../assets/img/lock-bg.png") no-repeat center;
  background-size: 100% 100%;
  p {
    color: #ffffff;
    .error-text {
      color: red;
      font-size: 13px;
    }
  }
}
</style>