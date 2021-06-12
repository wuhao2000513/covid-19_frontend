<template>
  <!-- 
  组件使用说明:
  参数格式:
  props中的items是一个包含一个或多个el-from-item数据对象的数组
  格式 例:[{
    attr{
      包含的是el-form-item的配置
    },
    slot:'slotName', 一个具名插槽名称,可选
    el:'componentName', 一个组件名称,可选
  }]
 -->
  <el-form v-bind="config" v-on="$listeners" :model="formData" ref="form">
    <el-form-item
      v-for="(item, index) in items"
      :key="index"
      v-bind="item.attr"
    >
      <!-- 如果有slot名称 -->
      <template v-if="item.slot">
        <slot
          :name="item.slot"
          :formData="formData"
          :prop="(item.attr && item.attr.prop) || undefined"
        ></slot>
      </template>
      <!-- 如果传入是一个组件名称 -->
      <template v-else-if="item.el">
        <component
          v-if="item.trim !== false"
          :is="item.el"
          v-model.trim="formData[item.attr.prop]"
          v-bind="item.elAttr || {}"
        >
          <template v-if="item.children">
            <component
              v-for="(child, idx) in item.children"
              :is="child.el"
              :key="child.el + Math.random() + idx"
              v-bind="child.elAttr || {}"
            ></component>
          </template>
        </component>
        <component
          v-else
          :is="item.el"
          v-model="formData[item.attr.prop]"
          v-bind="item.elAttr || {}"
        >
          <template v-if="item.children">
            <component
              v-for="(child, idx) in item.children"
              :is="child.el"
              :key="child.el + Math.random() + idx"
              v-bind="child.elAttr || {}"
            ></component>
          </template>
        </component>
      </template>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => []
    },
    config: {
      default: () => {
        return {
          inline: true
        };
      }
    }
  },

  data() {
    return {
      formData: {}
    };
  },
  methods: {
    //重置表单数据
    reset() {
      this.$refs.form.resetFields();
    },
    // 返回form数据
    getFormData() {
      return this.formData;
    },
    //验证整个表单
    validate() {
      return new Promise((resolve, reject) => {
        this.$refs.form.validate().then(() => resolve(this.formData), reject);
      });
    },
    // 初始绑定数据
    bindData() {
      const formData = {};
      // 获取v - mode绑定的key和默认值;
      this.items.forEach(item => {
        const attr = item.attr;
        if (attr) {
          const key = attr.prop;
          if (key) {
            formData[key] = attr.defaultValue;
          }
        }
      });
      this.formData = formData;
    }
  },
  created() {
    this.bindData();
  },
  watch: {
    items() {
      this.bindData();
    }
  }
};
</script>
