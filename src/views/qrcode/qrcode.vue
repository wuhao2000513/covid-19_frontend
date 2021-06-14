<template>
  <div class="full-size relative">
    <div ref="qrcodeBox" class="absolute-center"></div>
  </div>
</template>

<script>
import AraleQRCode from "arale-qrcode";
export default {
  mounted() {
    const codeFigure = new AraleQRCode({
      render: "svg", // 生成的类型 'svg' or 'table'
      text: window.location.origin + "/#/" + "checkin", // 需要生成二维码的链接
      size: 420, // 生成二维码大小
    });
    this.$refs.qrcodeBox.appendChild(codeFigure);
  },
};
</script>

<style></style>
