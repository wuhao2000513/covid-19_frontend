<template>
  <div class="full-height">
    <div class="clearfix flow-hidden" ref="head">
      <slot name="head"></slot>
    </div>
    <el-table v-bind="options" :data="tableData">
      <template v-for="(item, index) in columns">
        <!-- 如果有自定义表头 -->
        <el-table-column v-if="item.headSlot" :key="index">
          <template v-slot:header="scope">
            <slot :name="item.headSlot" v-bind="scope"></slot>
          </template>
          <!-- 如果有自定义列 -->
          <template v-if="item.slot" v-slot="scope">
            <slot :name="item.slot" v-bind="scope"></slot>
          </template>
        </el-table-column>
        <!-- 正常表头 -->
        <el-table-column
          v-else
          :key="index"
          v-bind="attrHandle(item.attr, item)"
        >
          <template v-if="item.slot" v-slot="scope">
            <slot :name="item.slot" v-bind="scope"></slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="clearfix flow-hidden" ref="footer">
      <slot name="footer">
        <Pagination
          :total="total"
          :currentPage.sync="currentPage"
          :pageSize.sync="pageSize"
          @getData="pageChange"
        ></Pagination>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    tableData: {
      type: Array
    },
    config: {
      type: Object,
      default: () => {}
    },
    total: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      defaultConfig: {
        height: "0px",
        border: true
      },
      defaultColumn: [],
      currentPage: 1,
      pageSize: 20
    };
  },
  computed: {
    options() {
      Object.assign(this.defaultConfig, this.config);
      return this.defaultConfig;
    }
  },
  methods: {
    // 处理传入column参数
    attrHandle(attr, item) {
      if (!attr) {
        return {};
      }
      const Type = attr.type;
      if (Type == "index" && !attr.index) {
        //如果是索引列 指定格式化处理函数
        attr.index = i => {
          return (this.currentPage - 1) * this.pageSize + (i + 1);
        };
        if (!attr.width) {
          // 给索引列赋值一个默认宽度
          attr.width = 80;
        }
        if (!attr.label) {
          // 给索引列赋值一个默认label
          attr.label = "序号";
        }
      } else if (Type == "date" && !attr.formatter) {
        //如果是时间列默认用dayjs格式化
        attr.formatter = (row, column, cellValue) =>
          this.$dayjs(cellValue).format(
            item.dateFormat || "YYYY-MM-DD A HH:mm"
          );
      }
      // 设置默认对齐
      if (!attr.align) {
        attr.align = "center";
      }
      return attr;
    },
    // 设置表格高度
    resetTableHeight() {
      const headHeight = this.$refs.head.offsetHeight;
      let footerHeight = this.$refs.footer.offsetHeight;
      this.defaultConfig.height = `calc(100% - ${headHeight + footerHeight}px)`;
    },
    // 返回分页信息
    paging() {
      return {
        currentPage: this.currentPage,
        pageSize: this.pageSize
      };
    },
    //分页改变触发
    pageChange() {
      this.$emit("getData");
    }
  },
  mounted() {
    this.$nextTick(this.resetTableHeight);
    window.addEventListener("resize", this.resetTableHeight);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resetTableHeight);
  }
};
</script>

<style lang="less">
.el-table {
  .warning-row {
    background: oldlace;
  }
  .error-row {
    color: #ffffff;
    background: #f6a5a5;
    &:hover {
      color: #606266;
    }
  }
}
</style>
