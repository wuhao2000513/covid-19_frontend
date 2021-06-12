<template>
  <div class="full-height flex">
    <div class="left-box full-height">
      <Table
        :columns="columns"
        :tableData="tableData"
        :config="{ 'row-key': 'id' }"
      >
        <template v-slot:action="{ row }">
          <el-popconfirm
            title="你确定要删除该分组吗,删除后该分组下的所有设备将自动归入未分组当中,确认删除?"
            @confirm="deleteGroup(row.id)"
          >
            <template v-slot:reference>
              <el-button
                class="action-btn"
                type="text"
                size="mini"
                style="margin-left:8px"
                >删除</el-button
              >
            </template>
          </el-popconfirm>
        </template>
      </Table>
    </div>
    <div class="right-box full-height">
      <Form ref="form" :items="items" :config="formConfig">
        <template v-slot:group="{ formData, prop }">
          <div class="flex flex-between">
            <div>
              <el-cascader
                v-model="formData[prop]"
                :props="selectProp"
                :options="tableData"
                clearable
              ></el-cascader>
            </div>
            <div>
              <el-alert
                style="padding: 0 10px; margin-left: 20px"
                title="选择父级分组,不选为创建一级分组"
                type="info"
                show-icon
              >
              </el-alert>
            </div>
          </div>
        </template>
        <template v-slot:enable="{ formData, prop }">
          <el-switch
            v-model="formData[prop]"
            active-text="启用"
            inactive-text="停用"
          >
          </el-switch>
        </template>
        <template v-slot:button="{ formData }">
          <div class="text-right">
            <el-button type="danger" @click="addGroup(formData)">
              添加分组
            </el-button>
          </div>
        </template>
      </Form>
    </div>
  </div>
</template>

<script>
import tableConfig from "./data/goupConfig";
import { getGroup } from "@/api/group";
import opertion from "./mixin/groupOperation";
import formatTreeData from "@/assets/js/formatGroupTreeData";
export default {
  mixins: [opertion],
  data() {
    return {
      groupData: [
        {
          value: 1,
          label: "分组1",
          children: [
            {
              value: 3,
              label: "分组1子分组"
            }
          ]
        },
        {
          value: 2,
          label: "分组2"
        }
      ],
      tableData: []
    };
  },
  computed: {
    columns() {
      return tableConfig.columns;
    },
    items() {
      return tableConfig.items;
    },
    formConfig() {
      return tableConfig.formConfig;
    },
    selectProp() {
      return {
        value: "id",
        label: "name",
        checkStrictly: true
      };
    }
  },
  methods: {
    //获取群组列表
    getData() {
      getGroup().then(data => {
        this.tableData = formatTreeData(data);
      });
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style lang="less" scoped>
.left-box {
  width: 60%;
}
.right-box {
  padding-left: 22px;
}
</style>
