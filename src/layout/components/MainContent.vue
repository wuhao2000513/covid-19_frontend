<template>
  <div class="main-content">
    <div class="content-box full-height flow-hidden">
      <!-- <transition name="el-fade-in">
        <router-view></router-view>
      </transition> -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    hasChildren() {
      return this.$route.children;
    }
  }
};
</script>

<style lang="less" scoped>
.main-content {
  height: calc(100% - 60px);
  .content-box {
    background-color: #f0f0f0;
  }
}
</style>
