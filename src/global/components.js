import Vue from "vue";
// 导入自定义全局组件
import customTable from "@/components/Table/Table.vue";
import customForm from "@/components/Form/Form.vue";
import customPagination from "@/components/Pagination/Pagination.vue";
Vue.component("Table", customTable);
Vue.component("Form", customForm);
Vue.component("Pagination", customPagination);
