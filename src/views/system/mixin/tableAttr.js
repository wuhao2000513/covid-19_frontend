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
            index(i) {
              return (self.currentPage - 1) * self.pageSize + (i + 1);
            }
          }
        },
        {
          attr: { prop: "username", label: "用户名" }
        },
        {
          attr: {
            prop: "role",
            label: "用户角色",
            formatter(row, column, cellValue, index) {
              let text;
              switch (cellValue) {
                case 0:
                text = "系统管理员";
                break;
              case 1:
                text = "平台管理员";
                break;
              default:
                text = "其他用户";
                break;
              }
              return text;
            }
          }
        },
        {
          attr: {
            prop: "state",
            label: "账号状态",
            formatter(row, column, cellValue, index) {
              let text;
              switch (cellValue) {
              case 0:
                text = "正常";
                break;
              case 1:
                text = "警告";
                break;
              default:
                text = "禁用";
                break;
              }
              return text;
            }
          }
        },
        {
          attr: {
            prop: "createdAt",
            label: "注册日期",
            formatter(row, column, cellValue, index) {
              return self.$dayjs(cellValue).format("YYYY-MM-DD A HH:mm");
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
          attr: {
            label: "角色",
            prop: "role"
          },
          slot: "role"
        },
        {
          attr: {
            label: "账户状态",
            prop: "state"
          },
          slot: "status"
        },
        {
          attr: { label: "用户名", prop: "username" },
          el: "el-input"
        },
        {
          attr: { label: "注册开始日期", prop: "createdAt" },
          slot: "createdAt"
        },
        {
          slot: "button"
        }
      ];
    }
  }
};
