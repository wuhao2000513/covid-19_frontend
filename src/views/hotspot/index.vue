<template>
  <div ref="googleMap" class="map-container full-height"></div>
</template>

<script>
import { mapGetters } from "vuex";
import ecard from "./module/card-charts";
export default {
  name: "Dashboard",
  components: { ecard },
  data() {
    return {
      map: null,
    };
  },
  computed: {
    ...mapGetters(["name"]),
  },
  mounted() {
    this.map = new window.google.maps.Map(this.$refs.googleMap, {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8,
    });
  },
};
</script>

<style lang="less" scoped></style>
