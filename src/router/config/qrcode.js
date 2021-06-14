//二维码
export default {
  path: "/qrcode",
  name: "QRcode",
  component: () => import("@/views/qrcode/qrcode"),
  meta: { title: "QR code", icon: "el-icon-full-screen" }
};
