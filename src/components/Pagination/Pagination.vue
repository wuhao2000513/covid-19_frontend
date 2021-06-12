<template>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-sizes="pageSizes"
    :page-size="pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total"
    style="margin-top:20px"
  >
  </el-pagination>
</template>

<script>
export default {
  props: {
    total: {
      default: 0
    },
    pageSize: {},
    pageSizes: {
      default: () => [10, 20, 50, 100]
    },
    currentPage: {}
  },
  methods: {
    handleSizeChange(index) {
      this.$emit("update:pageSize", index);
      this.$emit("getData");
    },
    // 页码改变
    handleCurrentChange(index) {
      this.$emit("update:currentPage", index);
      this.$emit("getData");
    }
  }
};
</script>
