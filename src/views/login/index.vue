<template>
  <div class="login-container flex full-size flow-hidden relative">
    <div class="left-box"></div>
    <div class="right-box">
      <div class="">
        <div class="right-logo-box">
          LOGO
        </div>
      </div>
      <div class="form-box">
        <el-form
          class="form"
          size="medium"
          :model="loginForm"
          :rules="loginRules"
          label-position="top"
          ref="loginForm"
          :loading="loading"
        >
          <el-form-item label="username" prop="username">
            <el-input
              placeholder="username"
              v-model="loginForm.username"
              maxlength="20"
              @keyup.enter.native="next"
              auto-complete="off"
            ></el-input>
          </el-form-item>

          <el-form-item label="password" prop="password">
            <el-input
              type="password"
              placeholder="password"
              v-model="loginForm.password"
              show-password
              maxlength="20"
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            v-if="mode == 'register'"
            label="check password"
            prop="checkPassword"
          >
            <el-input
              type="password"
              placeholder="password"
              v-model="loginForm.checkPassword"
              show-password
              maxlength="20"
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <el-form-item v-if="mode == 'register'" label="role" prop="role">
            <el-select v-model="loginForm.role" placeholder="plese select role">
              <el-option label="user" value="user"></el-option>
              <el-option label="admin" value="admin"></el-option>
              <el-option label="owner" value="owner"></el-option>
            </el-select>
          </el-form-item>
          <div>
            <el-button class="submit-btn" @click="handleLogin">{{
              mode
            }}</el-button>
            <el-button type="text" @click="toggleMode" class="submit-btn">{{
              mode == "login" ? "register" : "login"
            }}</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { getCaptcha } from "@/api/common.js";
export default {
  name: "Login",
  data() {
    return {
      svg: "",
      mode: "login",
      loginForm: {
        username: "admin",
        password: "123456",
        role: "user",
        checkPassword: "",
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur" },
          {
            min: 5,
            max: 20,
            message: "用户名长度在 5 到 20 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, trigger: "blur" },
          {
            min: 5,
            max: 20,
            message: "密码长度在 5 到 20 个字符",
            trigger: "blur",
          },
        ],
      },
      loading: false,
      redirect: undefined,
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  mounted() {
    // this.getCaptcha();
    // this.canvasInit();
  },
  beforeDestroy() {
    window.onresize = null;
  },
  methods: {
    toggleMode() {
      if (this.mode == "login") {
        this.mode = "register";
      } else {
        this.mode = "login";
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          // if(this.loginForm.verifyCode.toLowerCase()!=this.loginForm.captchaId.toLowerCase()){
          //   return this.$message.warning('验证码错误')
          // }
          this.loading = true;
          if (this.mode == "login") {
            // login
            this.$store
              .dispatch("user/login", this.loginForm)
              .then(() => {
                this.$router.push({ path: "/" });
                this.loading = false;
              })
              .catch(() => {
                this.loading = false;
              });
          } else {
            if (this.loginForm.password != this.loginForm.checkPassword) {
              return this.$message.error("密码不一致");
            }
            //register
            this.$store
              .dispatch("user/register", {
                username: this.loginForm.username,
                password: this.loginForm.password,
                role: this.loginForm.role,
              })
              .then(() => {
                this.loading = false;
                this.mode = "login";
                for (const key in this.loginForm) {
                  this.loginForm[key] = undefined;
                }
                this.$message.success("registration success");
              });
          }
        } else {
          return false;
        }
      });
    },
    getCaptcha() {
      getCaptcha({ width: 96, height: 36 }).then((result) => {
        this.svg = result;
      });
    },
    canvasInit() {
      // Canvas Init
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext("2d");
      let width = window.innerWidth;
      let height = window.innerHeight;
      const particles = 5;
      const minRadius = 50;
      const maxRadius = 180;
      const speed = 0.00001;
      const x = width / particles;

      // Bubbles
      const Bubbles = [];
      let i;
      for (i = 0; i < particles; i++) {
        Bubbles.push({
          x: i * x,
          y: height * Math.random(),
          r: minRadius + Math.random() * (maxRadius - minRadius),
          speed: 10 * Math.random(),
        });
      }

      function bubble() {
        ctx.clearRect(0, 0, width, height);
        for (i = 0; i < Bubbles.length; i++) {
          const b = Bubbles[i];
          ctx.beginPath();
          ctx.arc(b.x, b.y + b.r, b.r, 0, 2 * Math.PI);

          b.alpha = 0.5 * (b.y / height);
          b.speed += speed;

          ctx.strokeStyle = "rgba(255, 255, 255, .5)";
          ctx.stroke();
          ctx.fillStyle = "hsla(203, 75%, 69%," + b.alpha + ")";
          ctx.fill();
          b.y -= b.speed;
          if (b.y < 0) {
            b.y = height;
            b.speed = Math.random() * 2;
          }
        }
      }

      // Draw
      function draw() {
        bubble();
        window.requestAnimationFrame(draw);
      }

      // Resize Canvas
      function resizeCanvas() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        draw();
      }
      resizeCanvas();
      window.onresize = resizeCanvas;
    },
  },
};
</script>

<style scoped lang="less">
canvas {
  top: 0;
  left: 0;
}
.login-container {
  // background: linear-gradient(to bottom right, #008ad3, #25aff3);
}
.left-box,
.right-box {
  width: 50%;
  position: relative;
  height: 100%;
}
.left-box {
  background: url("../../assets/img/covid.png") no-repeat center;
  background-size: contain;
  border-right: 1px solid #eee;
}
.right-box {
  .el-form-item {
    margin-bottom: 13px;
    .el-input {
      .el-input__inner {
        // border: 0;
        box-shadow: 0 0 0px 1000px #fefcfe inset;
        // border-radius: 0;
      }
    }
    .el-form-item__label {
      padding: 0 !important;
      line-height: 30px;
    }
    .el-form-item__error {
      // margin-bottom: 5px;
    }
  }
  .form-box {
    width: 50%;
    padding-top: 30%;
    margin: 0 auto;
  }
  .submit-btn {
    & + .submit-btn {
      margin-left: 0;
    }
    width: 100%;
    // background: linear-gradient(to top left, #008ad3, #25aff3);
    // color: #fff;
    // font-size: 15px;
    letter-spacing: 2px;
    cursor: pointer;
    margin-top: 20px;
  }
}
</style>
