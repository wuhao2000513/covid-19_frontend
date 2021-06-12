<template>
  <!-- 修改用户信息 -->
  <div>
    <Form :config="formConfig" :items="getItems()" ref="form">
      <!-- 账户角色 -->
      <template v-slot:role="{ formData, prop }">
        <el-select v-model="formData[prop]">
          <el-option v-for="item in roles" :key="item.id" :label="item.name" :value="item.role_code" :disabled="isDisabled(item)"></el-option>
        </el-select>
      </template>
      <!-- 账户状态 -->
      <template v-slot:status="{ formData, prop }">
        <el-select v-model="formData[prop]">
          <el-option v-for="state in stateList" :label="state.name" :key="state.id" :value="state.state_code"></el-option>
        </el-select>
      </template>
    </Form>
    <div class="text-right">
      <el-button @click="$emit('update:visible', false)">取 消</el-button>
      <el-button type="primary" @click="updateAccountSubmit">确 定</el-button>
    </div>
  </div>
</template>

<script>
import { updateAccount } from '@/api/user';

export default {
  props: ['roles', 'stateList', 'userInfo'],
  data() {
    return {
      formConfig: {
        'label-width': '100px',
        'status-icon': true,
        rules: {
          role: [
            {
              required: true,
              message: '请选择用户角色',
              trigger: 'change',
            },
          ],
          state: [
            {
              required: true,
              message: '请选择账号状态',
              trigger: 'change',
            },
          ],
          password: [
            { message: '请输入用户密码', trigger: 'change' },
            {
              min: 5,
              max: 15,
              message: '长度在 5 到 15 个字符',
            },
          ],
          checkPassword: [
            {
              trigger: 'change',
              validator: (rule, value, callback) => {
                const formData = this.$refs.form.getFormData();
                if (formData.password) {
                  if (formData.password !== value) {
                    callback(new Error('两次输入的密码不一致'));
                  } else {
                    callback();
                  }
                } else {
                  if (value) {
                    callback(new Error('两次输入的密码不一致'));
                  } else {
                    callback();
                  }
                }
              },
            },
          ],
        },
      },
    };
  },
  methods: {
    // 更新账号
    updateAccountSubmit() {
      this.$refs.form.validate().then((data) => {
        // 验证通过提交服务器
        const formData = Object.assign({}, data);
        delete formData.checkPassword;
        updateAccount(this.userInfo.id, formData).then(() => {
          this.$emit('success');
          this.$notify({ type: 'success', message: '更新成功' });
          this.$emit('update:visible', false);
        });
      });
    },
    getItems() {
      return [
        {
          attr: {
            label: '用户名',
            prop: 'username',
            defaultValue: this.userInfo.username,
          },
          elAttr: {
            disabled: true,
          },
          el: 'el-input',
        },
        {
          attr: {
            label: '角色',
            prop: 'role',
            defaultValue: this.userInfo.role,
          },
          slot: 'role',
        },
        {
          attr: {
            label: '账户状态',
            defaultValue: this.userInfo.state,
            prop: 'state',
          },
          slot: 'status',
        },
        {
          attr: {
            label: '修改密码',
            prop: 'password',
          },
          el: 'el-input',
          elAttr: { type: 'password' },
        },
        {
          attr: {
            label: '确认密码',
            prop: 'checkPassword',
          },
          el: 'el-input',
          elAttr: { type: 'password', 'show-password': false },
        },
      ];
    },
    // 判断角色下拉框选项是否需要禁用
    isDisabled(item) {
      //如果说系统管理员则可以修改账号角色
      if (this.$store.state.user.userInfo.role == 0) {
        return false;
      }
      //非系统管理员禁用 系统管理员选项
      if (item.role_code == 0) {
        return true;
      }
    },
  },
};
</script>
