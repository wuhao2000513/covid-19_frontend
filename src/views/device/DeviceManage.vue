<template>
  <div class="full-size">
    <Table :tableData="tableData" :columns="columns" :config="tableConfig">
      <template v-slot:head>
        <el-col :span="20">
          <Form :config="{ inline: true }" :items="formItemAttr" ref="form">
            <!-- 设备名称 -->
            <template v-slot:group="{ formData, prop }">
              <el-select v-model="formData[prop]">
                <el-option
                  v-for="item in roles"
                  :key="item.role"
                  :label="item.role"
                  :value="item.id"
                  :disabled="item.disabled"
                ></el-option>
              </el-select>
            </template>
            <!-- 在线状态 -->
            <template v-slot:online="{ formData, prop }">
              <el-select v-model="formData[prop]">
                <el-option label="在线" :value="true"></el-option>
                <el-option label="离线" :value="false"></el-option>
              </el-select>
            </template>
            <template v-slot:button="{ formData }">
              <el-button type="danger" @click="searchSubmit(formData)">
                搜索
              </el-button>
              <el-button @click="resetForm">
                重置
              </el-button>
            </template>
            <template v-slot:createdAt="{ formData, prop }">
              <el-date-picker
                v-model="formData[prop]"
                type="date"
                placeholder="选择日期时间"
                :picker-options="pickerOptions"
                >>
              </el-date-picker>
            </template>
          </Form>
        </el-col>
        <el-col :span="4" class="text-right">
          <el-button
            icon="el-icon-plus"
            type="danger"
            @click="showAddAccountDialog('add')"
          >
            添加设备
          </el-button>
        </el-col>
      </template>
      <template v-slot:action="{ row }">
        <el-button
          class="action-btn"
          type="text"
          size="mini"
          @click="showAddAccountDialog('edit', row)"
          >修改设备</el-button
        >
        <el-popconfirm
          title="你确定要删除该设备吗?"
          @confirm="delDevice(row.id)"
        >
          <template v-slot:reference>
            <el-button
              class="action-btn"
              type="text"
              size="mini"
              style="margin-left:8px"
              >删除设备</el-button
            >
          </template>
        </el-popconfirm>
      </template>
      <template v-slot:footer>
        <Pagination
          :currentPage.sync="currentPage"
          :pageSize.sync="pageSize"
          :total="total"
          @refresh="paginationChange"
        ></Pagination>
      </template>
      <!-- 在线状态 -->
      <template v-slot:online="{ row }">
        <div v-if="row.online" class="online">
          <span>
            在线
          </span>
        </div>
        <span v-else>离线</span>
      </template>
    </Table>
    <!-- 添加编辑用户dialog -->
    <el-dialog
      :title="`${dialogType == 'add' ? '添加' : '编辑'}用户`"
      :visible.sync="dialogVisible"
      width="500px"
      append-to-body
    >
    </el-dialog>
  </div>
</template>

<script>
import tableAttr from "./data/listTableConfig";
import { getDevice, deleteDevice } from "@/api/device";
let search = {};
export default {
  data() {
    return {
      tableData: [],
      roles: [],
      accountStateList: [],
      total: 0,
      currentPage: 1,
      pageSize: 20,
      dialogVisible: false,
      dialogType: "",
      currentUserInfo: {}
    };
  },
  computed: {
    tableConfig() {
      return {
        "row-class-name": this.tableRowClassName
      };
    },
    pickerOptions() {
      return {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      };
    }
  },
  mixins: [tableAttr],
  methods: {
    // 按条件搜索
    searchSubmit(formData = {}) {
      console.log(formData, "formData");
      search = { offset: 1, limit: this.pageSize, ...formData };
      this.getData(search);
    },
    //获取表格数据方法
    getData(condition) {
      getDevice(condition).then(res => {
        this.tableData = res.rows;
        this.total = res.count;
      });
    },
    tableRowClassName({ row }) {
      if (row.state === 1) {
        return "warning-row";
      } else if (row.state === 2) {
        return "error-row";
      }
      return "";
    },
    // 分页改变
    paginationChange() {
      this.$nextTick(() => {
        this.getData(
          Object.assign(search, {
            offset: this.currentPage,
            limit: this.pageSize
          })
        );
      });
    },
    // 重置搜索表单
    resetForm() {
      this.$refs.form.reset();
    },
    //刷新表格数据
    refreshTableData() {
      this.currentPage = 1;
      this.pageSize = 20;
      search = { offset: this.currentPage, limit: this.pageSize };
      this.getData(search);
    },
    //显示添加或编辑设备dialog
    showAddAccountDialog(type, row) {
      this.dialogType = type;
      this.currentUserInfo = row;
      this.dialogVisible = true;
    },
    //删除设备
    delDevice(id) {
      deleteDevice(id).then(() => {
        this.getData(search);
      });
    }
  },
  created() {
    //获取用户表格数据
    this.refreshTableData();
  }
};
</script>

<style lang="less" scoped>
.action-btn {
  padding: 0;
}
.online {
  color: @menuActiveText;
}
</style>
