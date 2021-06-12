<template>
  <div>
    <Form :config="formConfig" :items="items" ref="form">
      <!-- 账户角色 -->
      <template v-slot:role="{ formData, prop }">
        <el-select v-model="formData[prop]">
          <el-option
            v-for="item in roles"
            :key="item.id"
            :label="item.name"
            :value="item.role_code"
            :disabled="item.role_code == 0"
          ></el-option>
        </el-select>
      </template>
      <!-- 账户状态 -->
      <template v-slot:status="{ formData, prop }">
        <el-select v-model="formData[prop]">
          <el-option
            v-for="state in stateList"
            :label="state.name"
            :key="state.id"
            :value="state.state_code"
          ></el-option>
        </el-select>
      </template>
    </Form>
    <div class="text-right">
      <el-button @click="$emit('update:visible', false)">取 消</el-button>
      <el-button type="primary" @click="createAccountSubmit">确 定</el-button>
    </div>
  </div>
</template>

<script>
import { crateAccount } from "@/api/user";

export default {
  props: ["roles", "stateList"],
  data() {
    return {
      items: [
        {
          attr: {
            label: "角色",
            prop: "role",
            defaultValue: 1
          },
          slot: "role"
        },
        {
          attr: {
            label: "账户状态",
            defaultValue: 0,
            prop: "state"
          },
          slot: "status"
        },
        {
          attr: {
            label: "用户名",
            prop: "username"
          },
          el: "el-input"
        },
        {
          attr: {
            label: "用户密码",
            prop: "password"
          },
          el: "el-input",
          elAttr: { type: "password" }
        },
        {
          attr: {
            label: "确认密码",
            prop: "checkPassword"
          },
          el: "el-input",
          elAttr: { type: "password", "show-password": false }
        }
      ],
      formConfig: {
        "label-width": "100px",
        "status-icon": true,
        rules: {
          role: [
            {
              required: true,
              message: "请选择用户角色",
              trigger: "change"
            }
          ],
          state: [
            {
              required: true,
              message: "请选择账号状态",
              trigger: "change"
            }
          ],
          username: [
            { required: true, message: "请输入用户名称", trigger: "blur" },
            {
              min: 5,
              max: 15,
              message: "长度在 5 到 15 个字符"
            }
          ],
          password: [
            { required: true, message: "请输入用户密码", trigger: "blur" },
            {
              min: 5,
              max: 15,
              message: "长度在 5 到 15 个字符"
            }
          ],
          checkPassword: [
            {
              required: true,
              trigger: "blur",
              validator: (rule, value, callback) => {
                const formData = this.$refs.form.getFormData();
                if (!value) {
                  callback(new Error("请输入确认密码"));
                } else {
                  if (formData.password !== value) {
                    callback(new Error("两次输入的密码不一致"));
                  } else {
                    callback();
                  }
                }
              }
            }
          ]
        }
      }
    };
  },
  methods: {
    // 新建账号
    createAccountSubmit() {
      this.$refs.form.validate().then(data => {
        // 验证通过提交服务器
        const formData = Object.assign({}, data);
        delete formData.checkPassword;
        crateAccount(formData).then(() => {
          this.$emit("success");
          this.$emit("update:visible", false);
          this.$refs.form.reset();
        });
      });
    }
  }
};
</script>
