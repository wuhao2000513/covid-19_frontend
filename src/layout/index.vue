<template>
  <div class="full-size">
    <TopBar></TopBar>
    <Content></Content>
  </div>
</template>

<script>
import TopBar from "@/layout/components/TopBar";
import Content from "@/layout/components/MainContent";
export default {
  components: {
    TopBar,
    Content
  }
};
</script>

<style lang="less" scoped></style>
