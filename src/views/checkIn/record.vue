<template>
  <div class="flex flex-col full-height">
    <div class="text-center">
      <h2>
        checkin record
      </h2>
    </div>
    <div class="flex-grow-1">
      <Table
        ref="table"
        :columns="columns"
        :tableData="tableData"
        :total="count"
        @getData="getData"
      >
      </Table>
    </div>
  </div>
</template>

<script>
import * as Api from "@/api/user";

export default {
  data() {
    return {
      tableData: [],
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
          attr: { prop: "phone", label: "phone" },
        },
        {
          attr: { prop: "address", label: "address" },
        },
        {
          attr: { prop: "crateAt", label: "crate at", type: "date" },
        },
      ],
    };
  },
  methods: {
    getData() {
      const paging = this.$refs.table.paging();
      Api.getRecord(paging).then((res) => {
        this.count = res.count;
        this.tableData = res.rows;
      });
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style></style>
