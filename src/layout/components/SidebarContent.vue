<template>
  <div class="full-height">
    <div class="page-title">
      <el-page-header class="flex flex-middle full-height" @back="$router.back()" :content="title">
        <template v-slot:title>
          <span>返回</span>
        </template>
      </el-page-header>
    </div>
    <div class="content-container">
      <div class="full-height content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    title() {
      return this.$route.meta.title;
    },
  },
};
</script>

<style lang="less" scoped>
.page-title {
  height: 50px;
  padding: 0 20px;
  background-color: #f5f7fa;
  //   box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12);
  border-bottom: 1px solid #dcdfe6;
  span {
    &:hover {
      color: #409eff;
    }
  }
}
.content-container {
  height: calc(100% - 50px);
  padding: 10px;
  .content {
    padding: 12px;
    // box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12);
    background-color: #fff;
  }
}
</style>
