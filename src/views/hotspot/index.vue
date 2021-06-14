<template>
  <div class="full-height flex">
    <div class="left-box full-height">
      <div ref="googleMap" class="map-container full-height"></div>
    </div>
    <div class="right-box flex-grow-1 full-height">
      <Table
        ref="table"
        :columns="columns"
        :total="count"
        :tableData="tableData"
        @getData="getData"
      >
        <template v-slot:action="{ row }">
          <el-button type="text" @click="view(row)">
            view
          </el-button>
        </template>
      </Table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import DrawingManager from "../hotspotManage/js/map";
import * as Api from "@/api/hotspot";
export default {
  name: "Dashboard",
  data() {
    return {
      map: null,
      drawingManager: null,
      tableData: [],
      count: 0,
      columns: [
        {
          attr: {
            type: "index",
            label: "No",
          },
        },
        {
          attr: { prop: "name", label: "name" },
        },
        {
          attr: { prop: "crateAt", label: "crate at", type: "date" },
        },
        {
          attr: { label: "action" },
          slot: "action",
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["name"]),
  },
  methods: {
    getData() {
      const paging = this.$refs.table.paging();
      Api.get(paging).then((res) => {
        this.drawingManager.clearAll();
        this.$nextTick(() => {
          this.count = res.count;
          this.tableData = res.rows.map((item) => {
            item.data = JSON.parse(item.data);
            //在地图上画图形
            this.drawingManager.draw(item);
            return item;
          });
          console.log(this.drawingManager);
          this.drawingManager.setFitBound(this.tableData);
        });
      });
    },
    //绘图完成 回调
    overlayComplete(type, bounds) {
      this.$prompt("Please enter a name", "", {
        inputPattern: /\w+/,
        inputErrorMessage: "Please enter a name",
      })
        .then(({ value }) => {
          Api.create({
            type,
            name: value,
            data: JSON.stringify(bounds),
          }).then(() => {
            this.$message.success("created");
            this.getData();
          });
        })
        .catch(() => {
          //取消提交
          this.getData();
        });
    },
    //查看
    view(row) {
      console.log(row);
      this.drawingManager.clearAll();
      this.drawingManager.draw(row);
      this.drawingManager.setFitBound([row], row.type == "circle");
    },
    //删除热点
    del(row) {
      Api.destroy(row.id).then(() => {
        this.getData();
      });
    },
  },
  mounted() {
    const google = window.google;
    this.map = new google.maps.Map(this.$refs.googleMap, {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 15,
    });
    this.drawingManager = new DrawingManager(this.map, {
      overlayComplete: this.overlayComplete,
      drawingControl: false,
    });
    this.getData();
  },
};
</script>

<style lang="less" scoped>
.left-box {
  width: 60%;
}
.right-box {
  padding: 0 20px;
}
</style>
