<template>
  <div class="full-size" style="padding:20px">
    <div class="form-box full-height">
      <transition name="el-fade-in" mode="out-in">
        <el-form
          key="login"
          v-if="mode === 'login'"
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
          <div>
            <el-button
              type="danger"
              class="submit-btn full-width"
              @click="handleLogin"
              >Login</el-button
            >
          </div>
        </el-form>
        <el-form
          v-else-if="mode === 'checkin'"
          key="userinfo"
          label-position="top"
          :model="userInfo"
        >
          <el-form-item label="Name">
            <el-row type="flex" justify="space-between">
              <el-col :span="17">
                <el-input
                  placeholder="enter name"
                  v-model="userInfo.name"
                  maxlength="20"
                  :disabled="!changeFlag.name"
                  auto-complete="off"
                ></el-input>
              </el-col>
              <el-col :span="6">
                <el-button type="primary" @click="edit('name')">
                  {{ changeFlag.name ? "submit" : "change" }}
                </el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="phone">
            <el-row type="flex" justify="space-between">
              <el-col :span="17">
                <el-input
                  placeholder="enter phone"
                  v-model="userInfo.phone"
                  maxlength="20"
                  :disabled="!changeFlag.phone"
                  auto-complete="off"
                ></el-input>
              </el-col>
              <el-col :span="6">
                <el-button type="primary" @click="edit('phone')">
                  {{ changeFlag.phone ? "submit" : "change" }}
                </el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="address">
            <el-row type="flex" justify="space-between">
              <el-col :span="17">
                <el-input
                  placeholder="enter address"
                  v-model="userInfo.address"
                  maxlength="20"
                  :disabled="!changeFlag.address"
                  auto-complete="off"
                ></el-input>
              </el-col>
              <el-col :span="6">
                <el-button type="primary" @click="edit('address')">
                  {{ changeFlag.address ? "submit" : "change" }}
                </el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row>
              <el-col style="">
                <el-card class="box-card">
                  文字声明之类的文案
                </el-card>
              </el-col>
              <el-col style="padding-top:20px">
                <el-button class="full-width" type="primary" @click="checkin">
                  Checkin
                </el-button>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
        <el-row v-else-if="mode === 'success'">
          <el-col class="text-center">
            <i class="el-icon-success" style="font-size:10rem;color:green"></i>
            <p style="font-weight:600;font-size:2rem">
              Checkin
            </p>
            <el-card>
              <p>Address: {{ userInfo.address }}</p>
              <p>Name: {{ userInfo.name }}</p>
              <el-alert
                title="checin text tip"
                :closable="false"
                type="success"
                effect="dark"
              >
              </el-alert>
            </el-card>
          </el-col>
        </el-row>
      </transition>
    </div>
  </div>
</template>

<script>
import * as Api from "@/api/user";
export default {
  name: "Login",
  data() {
    return {
      mode: "login",
      loading: false,
      loginForm: {
        username: "admin",
        password: "123456",
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
      changeFlag: {
        name: false,
        address: false,
        phone: false,
      },
      userInfo: {
        name: "",
        address: "",
        phone: "",
      },
    };
  },
  mounted() {
    // this.getCaptcha();
    // this.canvasInit();
  },
  beforeDestroy() {
    window.onresize = null;
  },
  methods: {
    edit(key) {
      this.changeFlag[key] = !this.changeFlag[key];
    },
    // checkin handle
    checkin() {
      const userId = this.$store.state.user.userInfo.id;
      Api.updateAccount(userId, this.userInfo).then((res) => {
        this.mode = "success";
        Api.addRecord(this.userInfo);
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          // if(this.loginForm.verifyCode.toLowerCase()!=this.loginForm.captchaId.toLowerCase()){
          //   return this.$message.warning('')
          // }
          this.loading = true;
          this.$store
            .dispatch("user/login", this.loginForm)
            .then((userInfo) => {
              this.loading = false;
              this.mode = "checkin";
              this.userInfo.name = userInfo.name;
              this.userInfo.phone = userInfo.phone;
              this.userInfo.address = userInfo.address;
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          return false;
        }
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
