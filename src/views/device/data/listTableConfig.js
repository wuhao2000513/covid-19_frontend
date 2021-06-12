export default {
  computed: {
    columns() {
      const self = this;
      return [
        {
          attr: {
            prop: "id",
            label: "id",
            type: "index",
            width: "60px",
            index(i) {
              return (self.currentPage - 1) * self.pageSize + (i + 1);
            }
          }
        },
        {
          attr: { prop: "name", label: "设备名称" }
        },
        {
          attr: {
            prop: "model",
            label: "设备型号"
          }
        },
        {
          attr: {
            prop: "brand",
            label: "品牌"
          }
        },
        {
          attr: {
            prop: "group_id",
            label: "所在组"
          }
        },
        {
          attr: {
            prop: "online",
            label: "在线状态"
          },
          slot: "online"
        },
        {
          attr: {
            prop: "createdAt",
            label: "添加日期",
            formatter(row, column, cellValue, index) {
              return self.$dayjs(cellValue).format("YYYY-MM-DD HH:mm");
            }
          }
        },
        {
          attr: {
            label: "操作",
            align: "center"
          },
          slot: "action"
        }
      ];
    },
    formItemAttr() {
      return [
        {
          attr: { label: "设备名称", prop: "name" },
          el: "el-input"
        },
        {
          attr: { label: "型号", prop: "model" },
          el: "el-input"
        },
        {
          attr: {
            label: "在线状态",
            prop: "online"
          },
          slot: "online"
        },
        {
          attr: {
            label: "所在组",
            prop: "group_id"
          },
          slot: "group"
        },

        {
          slot: "button"
        }
      ];
    }
  }
};
