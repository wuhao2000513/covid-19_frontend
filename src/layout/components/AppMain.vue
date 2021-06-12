<template>
  <el-scrollbar class="full-size">
    <div class="app-mian">
      <transition name="fade-transform" mode="out-in">
        <router-view :key="key" />
      </transition>
    </div>
  </el-scrollbar>
</template>

<script>
  export default {
    name: "AppMain",
    computed: {
      key() {
        return this.$route.path;
      },
    },
  };
</script>
<style lang="scss">
  .app-mian {
    padding: 26px;
  }
  // fix css style bug in open el-dialog
  .el-popup-parent--hidden {
    .fixed-header {
      padding-right: 15px;
    }
  }
</style>
