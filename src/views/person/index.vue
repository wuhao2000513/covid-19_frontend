<template>
  <div class="flex">
    <div style="padding:26px;width:50%">
      <el-card>
        <el-form key="userinfo" label-position="top" :model="userInfo">
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
              <el-col style="padding-top:20px">
                <el-button class="full-width" type="primary" @click="update">
                  update
                </el-button>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import * as Api from "@/api/user";
export default {
  data() {
    return {
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

  methods: {
    edit(key) {
      this.changeFlag[key] = !this.changeFlag[key];
    },
    getData() {
      const userInfo = this.$store.state.user.userInfo;
      this.userInfo.name = userInfo.name;
      this.userInfo.phone = userInfo.phone;
      this.userInfo.address = userInfo.address;
    },
    update() {
      const userId = this.$store.state.user.userInfo.id;
      Api.updateAccount(userId, this.userInfo).then((res) => {
        this.$store.dispatch("user/getInfo").then(() => {
          this.$message.success("updated");
          for (const key in this.changeFlag) {
            this.changeFlag[key] = false;
          }
        });
      });
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style></style>
