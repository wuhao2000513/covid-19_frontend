export default {
  columns: [
    {
      attr: {
        prop: "id",
        label: "id",
        type: "index"
      }
    },
    {
      attr: {
        prop: "name",
        label: "组名"
      }
    },
    {
      attr: {
        prop: "enable",
        label: "是否可用",
        formatter(row, column, cellValue, index) {
          return cellValue ? "启用" : "停用";
        }
      }
    },
    {
      attr: {
        prop: "total",
        label: "设备数"
      }
    },
    {
      attr: {
        label: "操作"
      },
      slot: "action"
    }
  ],
  items: [
    {
      attr: {
        prop: "pid",
        label: "父级分组"
      },
      slot: "group"
    },
    {
      attr: {
        prop: "name",
        label: "分组名称"
      },
      el: "el-input"
    },
    {
      attr: {
        label: "是否启用",
        prop: "enable",
        defaultValue: true
      },
      slot: "enable"
    },
    {
      slot: "button"
    }
  ],
  formConfig: {
    "label-position": "top",
    rules: {
      name: [
        {
          required: true,
          message: "请输入组名"
        },
        { min: 3, max: 15, message: "长度在 5 到 15 个字符" }
      ]
    }
  }
};
